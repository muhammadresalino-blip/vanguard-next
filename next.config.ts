import type { NextConfig } from 'next'

const isPages = process.env.GITHUB_PAGES === 'true'
const repo = 'vanguard-next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  basePath: isPages ? `/${repo}` : '',
  assetPrefix: isPages ? `/${repo}/` : '',
  trailingSlash: true,
}

export default nextConfig
