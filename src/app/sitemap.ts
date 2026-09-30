import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { categoryPages } from "@/data/categoryPages";
import { serviceAreaPath, serviceAreas } from "@/data/serviceAreas";
import { taxiRoutePath, taxiRoutes } from "@/data/routes";
import { vehicles } from "@/data/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/vehicles", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/destinations", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/areas", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/routes", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    // Vehicle-type landing pages (/taxi-car-booking, /jcb-booking…)
    ...categoryPages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // Local area pages (/areas/kihar, /areas/tissa…)
    ...serviceAreas.map((area) => ({
      url: `${siteConfig.url}${serviceAreaPath(area.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // Taxi route pages (/routes/salooni-to-chamba-taxi…)
    ...taxiRoutes.map((route) => ({
      url: `${siteConfig.url}${taxiRoutePath(route.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...vehicles.map((vehicle) => ({
      url: `${siteConfig.url}/vehicles/${vehicle.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
