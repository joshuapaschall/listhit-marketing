import { MetadataRoute } from "next";

const baseUrl = "https://listhit.io";

const routes = [
  "",
  "/about",
  "/contact",
  "/pricing",
  "/privacy",
  "/terms",
  "/acceptable-use",
  "/anti-spam",
  "/security",
  "/login",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
