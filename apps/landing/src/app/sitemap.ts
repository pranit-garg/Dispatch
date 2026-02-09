import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dispatch.computer",
      lastModified: new Date(),
    },
  ];
}
