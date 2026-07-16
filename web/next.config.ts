import type { NextConfig } from "next";

// Static export config for GitHub Pages project-site deployment
// (served at https://<user>.github.io/mt15-dark-side-showcase/).
// Everything in this app is client-rendered (GSAP/Lenis/R3F all run in
// the browser), so a pure static export works fine — no server needed.
const repoName = "mt15-dark-side-showcase";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  images: {
    unoptimized: true, // next/image optimization needs a server; static export can't run one
  },
};

export default nextConfig;
