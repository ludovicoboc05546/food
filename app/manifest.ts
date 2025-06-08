import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gerenciador de Estoque Doméstico",
    short_name: "EstoqueCasa",
    description:
      "Aplicativo PWA para gerenciar o estoque completo da sua casa - alimentos, produtos de limpeza, higiene pessoal e muito mais",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10b981",
    orientation: "portrait",
    scope: "/",
    lang: "pt-BR",
    categories: ["productivity", "lifestyle", "utilities"],
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
    screenshots: [
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  }
}
