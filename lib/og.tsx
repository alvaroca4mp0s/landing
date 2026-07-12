import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Imagen Open Graph de marca "señal sobre papel". Sin fuentes externas: usa la
 * fuente por defecto de satori para no depender de la red en build.
 */
export function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf7",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 22, height: 22, borderRadius: 22, background: "#e21d2d" }} />
          <div style={{ fontSize: 34, fontWeight: 700, display: "flex" }}>
            <span style={{ color: "#e21d2d" }}>Red</span>
            <span style={{ color: "#1e4f9c" }}>Local</span>
          </div>
        </div>

        {/* Título */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8a8790",
              display: "flex",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#17161b",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Pie: la ruta de la señal */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#56535e" }}>
          <span style={{ display: "flex" }}>evento</span>
          <span style={{ color: "#cfc9ba", display: "flex" }}>→</span>
          <span style={{ display: "flex" }}>señal</span>
          <span style={{ color: "#cfc9ba", display: "flex" }}>→</span>
          <span style={{ color: "#e21d2d", fontWeight: 700, display: "flex" }}>acción</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
