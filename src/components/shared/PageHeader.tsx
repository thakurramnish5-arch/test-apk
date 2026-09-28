import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { breadcrumbSchema } from "@/lib/seo";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Background image URL. Falls back to a solid forest panel. */
  image?: string;
  /** Alt text for the background image. Empty when purely decorative. */
  imageAlt?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}

/** Consistent page header used across every inner route. */
export function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-900">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            aria-hidden={imageAlt === "" ? true : undefined}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/80 to-forest-950/70"
            aria-hidden="true"
          />
        </>
      )}

      <div className="container-page relative py-4 sm:py-10 lg:py-12">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-[13px] text-white/60">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {index > 0 && (
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-white/90" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="eyebrow border-white/20 bg-white/10 text-white">
            {eyebrow}
          </span>
        )}

        <h1 className="mt-4 max-w-3xl font-display text-[1.75rem] font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-base">
            {description}
          </p>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>

      {/* Breadcrumb structured data, matching the visible trail */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbSchema(
                breadcrumbs.map((crumb) => ({
                  name: crumb.label,
                  path: crumb.href,
                })),
              ),
            ),
          }}
        />
      )}
    </section>
  );
}
