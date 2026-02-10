import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dispatch.computer",
      lastModified: new Date(),
    },
    {
      url: "https://dispatch.computer/privacy",
      lastModified: new Date(),
    },
    {
      url: "https://dispatch.computer/terms",
      lastModified: new Date(),
    },
  ];
}
