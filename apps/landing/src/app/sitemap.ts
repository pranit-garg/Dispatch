import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://landing-pi-ashen-62.vercel.app",
      lastModified: new Date(),
    },
  ];
}
