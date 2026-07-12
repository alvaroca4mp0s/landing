import type { NextConfig } from "next";

// CSP pragmática para un sitio mayormente estático (SSG).
// - 'unsafe-inline' en script/style es necesario para el bootstrap de Next y el
//   JSON-LD propio sin recurrir a nonces (que forzarían render dinámico).
//   El riesgo XSS residual es bajo: no se renderiza HTML de usuario en ninguna parte.
// - Plausible es el único host externo permitido (script y beacon).
// - frame-ancestors/base-uri/form-action son ganancia pura.
// Endurecer a nonce estricto es deuda documentada (docs/SECURITY.md).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://plausible.io",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: false },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
