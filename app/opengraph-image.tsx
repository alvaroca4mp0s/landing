import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "RedLocal — Cuando ocurra algo importante, lo sabrás a tiempo.";

export default function OgImage() {
  return renderOgImage({
    eyebrow: "Sistemas de detección y señales",
    title: "Cuando ocurra algo importante, lo sabrás a tiempo.",
  });
}
