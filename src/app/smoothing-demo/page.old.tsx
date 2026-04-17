'use client';

import Link from 'next/link'
import React, { useMemo, useState } from 'react';

// app/smoothing-demo/page.tsx
// Interactive comparison of Moving Average vs Savitzky-Golay smoothing

type SignalType = 'gaussian' | 'two-peaks' | 'sine';

type Point = {
  x: number;
  trueY: number;
  noisyY: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function gaussian(x: number, mu: number, sigma: number, amp = 1) {
  return amp * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2));
}

function createRng(seed: number) {
  let s = seed >>> 0;
  return function random() {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function generateSignal(signalType: SignalType, noiseLevel: number, n = 220, seed = 42): Point[] {
  const random = createRng(seed);
  const points: Point[] = [];

  for (let i = 0; i < n; i++) {
    const x = i / (n - 1);
    let trueY = 0;

    if (signalType === 'gaussian') {
      trueY = gaussian(x, 0.5, 0.09, 1.1);
    } else if (signalType === 'two-peaks') {
      trueY = gaussian(x, 0.33, 0.06, 0.95) + gaussian(x, 0.68, 0.08, 0.75);
    } else {
      trueY = 0.55 + 0.22 * Math.sin(2 * Math.PI * 1.2 * x) + 0.08 * Math.sin(2 * Math.PI * 5.5 * x);
    }

    const noise = (random() - 0.5) * 2 * noiseLevel;
    points.push({ x, trueY, noisyY: trueY + noise });
  }

  return points;
}

function movingAverage(values: number[], windowSize: number) {
  const half = Math.floor(windowSize / 2);
  return values.map((_, i) => {
    let sum = 0;
    let count = 0;
    for (let j = i - half; j <= i + half; j++) {
      const idx = clamp(j, 0, values.length - 1);
      sum += values[idx];
      count += 1;
    }
    return sum / count;
  });
}

function transpose(matrix: number[][]) {
  return matrix[0].map((_, col) => matrix.map((row) => row[col]));
}

function multiply(A: number[][], B: number[][]) {
  const rows = A.length;
  const cols = B[0].length;
  const inner = B.length;
  const out = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let k = 0; k < inner; k++) {
      for (let j = 0; j < cols; j++) {
        out[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return out;
}

function invert(matrix: number[][]) {
  const n = matrix.length;
  const M = matrix.map((row, i) => [
    ...row,
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  ]);

  for (let i = 0; i < n; i++) {
    let pivot = i;
    for (let r = i + 1; r < n; r++) {
      if (Math.abs(M[r][i]) > Math.abs(M[pivot][i])) pivot = r;
    }

    if (Math.abs(M[pivot][i]) < 1e-12) {
      throw new Error('Matrix is singular and cannot be inverted.');
    }

    if (pivot !== i) {
      [M[i], M[pivot]] = [M[pivot], M[i]];
    }

    const pivotVal = M[i][i];
    for (let c = 0; c < 2 * n; c++) {
      M[i][c] /= pivotVal;
    }

    for (let r = 0; r < n; r++) {
      if (r === i) continue;
      const factor = M[r][i];
      for (let c = 0; c < 2 * n; c++) {
        M[r][c] -= factor * M[i][c];
      }
    }
  }

  return M.map((row) => row.slice(n));
}

function savitzkyGolay(values: number[], windowSize: number, polyOrder: number) {
  const half = Math.floor(windowSize / 2);
  const smoothed: number[] = [];

  for (let i = 0; i < values.length; i++) {
    const xs: number[] = [];
    const ys: number[] = [];

    for (let j = -half; j <= half; j++) {
      const idx = clamp(i + j, 0, values.length - 1);
      xs.push(j);
      ys.push(values[idx]);
    }

    const A = xs.map((x) =>
      Array.from({ length: polyOrder + 1 }, (_, p) => x ** p)
    );
    const yCol = ys.map((y) => [y]);
    const AT = transpose(A);
    const ATA = multiply(AT, A);
    const ATAInv = invert(ATA);
    const coeffs = multiply(multiply(ATAInv, AT), yCol);
    smoothed.push(coeffs[0][0]);
  }

  return smoothed;
}

function mse(a: number[], b: number[]) {
  let total = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    total += d * d;
  }
  return total / a.length;
}

function linePath(points: { x: number; y: number }[], width: number, height: number, yMin: number, yMax: number) {
  const scaleX = (x: number) => x * width;
  const scaleY = (y: number) => height - ((y - yMin) / (yMax - yMin || 1)) * height;

  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x).toFixed(2)} ${scaleY(p.y).toFixed(2)}`)
    .join(' ');
}

function DemoChart({
  data,
  moving,
  sg,
  showTrue,
  showNoisy,
}: {
  data: Point[];
  moving: number[];
  sg: number[];
  showTrue: boolean;
  showNoisy: boolean;
}) {
  const width = 920;
  const height = 380;

  const allY = [
    ...data.map((d) => d.trueY),
    ...data.map((d) => d.noisyY),
    ...moving,
    ...sg,
  ];
  const yMin = Math.min(...allY) - 0.08;
  const yMax = Math.max(...allY) + 0.08;

  const noisyPath = linePath(data.map((d) => ({ x: d.x, y: d.noisyY })), width, height, yMin, yMax);
  const truePath = linePath(data.map((d) => ({ x: d.x, y: d.trueY })), width, height, yMin, yMax);
  const movingPath = linePath(data.map((d, i) => ({ x: d.x, y: moving[i] })), width, height, yMin, yMax);
  const sgPath = linePath(data.map((d, i) => ({ x: d.x, y: sg[i] })), width, height, yMin, yMax);

  const gridLines = Array.from({ length: 6 }, (_, i) => (i / 5) * height);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible rounded-2xl bg-slate-950/70">
        {gridLines.map((y, i) => (
          <line key={i} x1="0" x2={width} y1={y} y2={y} stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        ))}

        {showNoisy && (
          <path d={noisyPath} fill="none" stroke="rgba(148,163,184,0.8)" strokeWidth="1.8" />
        )}
        {showTrue && (
          <path d={truePath} fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="2.3" />
        )}
        <path d={movingPath} fill="none" stroke="rgba(251,191,36,0.95)" strokeWidth="2.6" />
        <path d={sgPath} fill="none" stroke="rgba(34,197,94,0.95)" strokeWidth="2.6" />
      </svg>

      <div className="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        <Legend color="bg-slate-400" label="Noisy signal" />
        <Legend color="bg-white" label="Original signal" />
        <Legend color="bg-amber-400" label="Moving average" />
        <Legend color="bg-green-500" label="Savitzky–Golay" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-2xl bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between gap-4 text-sm text-slate-200">
        <span>{label}</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium">{value}</span>
      </div>
      <input
        type="range"
        className="w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`rounded-full px-4 py-2 text-sm transition ${checked ? 'bg-cyan-400 text-slate-950' : 'bg-white/10 text-slate-200'}`}
    >
      {label}
    </button>
  );
}

function methodComment(maErr: number, sgErr: number) {
  if (Math.abs(maErr - sgErr) < 0.0005) return 'Both methods perform similarly for this configuration.';
  if (sgErr < maErr) return 'Savitzky–Golay is preserving the shape better in this example.';
  return 'The moving average is producing the lower error in this example.';
}

export default function SmoothingDemoPage() {
  const [signalType, setSignalType] = useState<SignalType>('gaussian');
  const [noiseLevel, setNoiseLevel] = useState(0.16);
  const [maWindow, setMaWindow] = useState(15);
  const [sgWindow, setSgWindow] = useState(15);
  const [sgOrder, setSgOrder] = useState(3);
  const [seed, setSeed] = useState(42);
  const [showTrue, setShowTrue] = useState(true);
  const [showNoisy, setShowNoisy] = useState(true);

  const safeMaWindow = maWindow % 2 === 0 ? maWindow + 1 : maWindow;
  const safeSgWindow = sgWindow % 2 === 0 ? sgWindow + 1 : sgWindow;
  const safeSgOrder = Math.min(sgOrder, safeSgWindow - 2);

  const data = useMemo(() => generateSignal(signalType, noiseLevel, 220, seed), [signalType, noiseLevel, seed]);
  const noisyValues = useMemo(() => data.map((d) => d.noisyY), [data]);
  const trueValues = useMemo(() => data.map((d) => d.trueY), [data]);

  const moving = useMemo(() => movingAverage(noisyValues, safeMaWindow), [noisyValues, safeMaWindow]);
  const sg = useMemo(() => savitzkyGolay(noisyValues, safeSgWindow, safeSgOrder), [noisyValues, safeSgWindow, safeSgOrder]);

  const maErr = mse(moving, trueValues);
  const sgErr = mse(sg, trueValues);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/15"
          >
            ← Back to home
          </Link>

          <Link
            href="/de/smoothing-demo"
            className="rounded-full bg-cyan-400/15 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-400/25"
          >
            Deutsche Version
          </Link>
        </div>

        <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Probevorlesung demo
              </p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Interactive data smoothing: Moving Average vs Savitzky–Golay
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                Students can change the noise level, the smoothing window, and the polynomial order to see how each method behaves.
                This makes the trade-off between noise reduction and shape preservation directly visible.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950/50 p-5">
              <h2 className="text-lg font-semibold">What should students observe?</h2>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                <li>• A larger window gives stronger smoothing, but may flatten important features.</li>
                <li>• The moving average is simple and intuitive, but it can broaden peaks.</li>
                <li>• Savitzky–Golay often preserves peak shape better, especially with a suitable polynomial order.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
              <h2 className="text-lg font-semibold">Signal</h2>
              <div className="mt-4 grid gap-2">
                {[
                  ['gaussian', 'Single peak'],
                  ['two-peaks', 'Two peaks'],
                  ['sine', 'Oscillatory signal'],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSignalType(value as SignalType)}
                    className={`rounded-2xl px-4 py-3 text-left text-sm transition ${signalType === value ? 'bg-cyan-400 text-slate-950' : 'bg-white/10 text-slate-200 hover:bg-white/15'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
              <h2 className="text-lg font-semibold">Controls</h2>
              <div className="mt-4 space-y-4">
                <Slider label="Noise level" value={noiseLevel} min={0.02} max={0.35} step={0.01} onChange={setNoiseLevel} />
                <Slider label="Moving average window" value={maWindow} min={3} max={41} step={2} onChange={setMaWindow} />
                <Slider label="Savitzky–Golay window" value={sgWindow} min={5} max={41} step={2} onChange={setSgWindow} />
                <Slider label="Savitzky–Golay polynomial order" value={sgOrder} min={2} max={6} step={1} onChange={setSgOrder} />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
              <h2 className="text-lg font-semibold">Display</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Toggle label="Show original" checked={showTrue} onChange={setShowTrue} />
                <Toggle label="Show noisy" checked={showNoisy} onChange={setShowNoisy} />
                <button
                  type="button"
                  onClick={() => setSeed((s) => s + 1)}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/15"
                >
                  New noise
                </button>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <DemoChart data={data} moving={moving} sg={sg} showTrue={showTrue} showNoisy={showNoisy} />

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5">
                <p className="text-sm text-amber-200">Moving average error (MSE)</p>
                <p className="mt-2 text-3xl font-semibold text-amber-300">{maErr.toFixed(4)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">Simple and robust, but stronger smoothing can distort peaks and edges.</p>
              </div>

              <div className="rounded-3xl border border-green-400/20 bg-green-400/10 p-5">
                <p className="text-sm text-green-200">Savitzky–Golay error (MSE)</p>
                <p className="mt-2 text-3xl font-semibold text-green-300">{sgErr.toFixed(4)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">Fits a local polynomial, which often preserves shape better than simple averaging.</p>
              </div>

              <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                <p className="text-sm text-cyan-100">Interpretation</p>
                <p className="mt-2 text-base font-medium text-cyan-50">{methodComment(maErr, sgErr)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">Try increasing the window and compare what happens to peak height and width.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
              <h2 className="text-lg font-semibold">Suggested classroom prompt</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                “Move the sliders and look at the peak. Which method removes noise more aggressively? Which one keeps the original shape better? At what point does smoothing become too strong?”
              </p>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
