/** @type {import('next').NextConfig} */
const repo = 'simulations-portfolio'; // ← NOMBRE EXACTO DEL REPO

export default {
  output: 'export',
  images: { unoptimized: true },
  // Fuerza el prefijo siempre (esto evita sorpresas con NODE_ENV)
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
};

