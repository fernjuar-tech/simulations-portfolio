/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repo = 'simulations-portfolio' // <-- nombre EXACTO de tu repo

export default {
  output: 'export',
  images: { unoptimized: true },
  ...(isProd ? { basePath: `/${repo}`, assetPrefix: `/${repo}/` } : {}),
}

