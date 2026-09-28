import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/data/categories";
import { categoryPagePath } from "@/data/categoryPages";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function CategoryGrid() {
  return (
    <section
      className="bg-white py-10 sm:py-12 lg:py-14"
      id="categories"
    >
      <div className="container-page">

        {/* Section heading */}
        <Reveal>
          <SectionHeading
            eyebrow="Vehicles We Provide"
            title="Choose Your Ride"
            description="From a small car for a Chamba trip to a JCB for a building site — every vehicle comes with an experienced driver or operator."
          />
        </Reveal>

        <div className="mobile-rail mt-6 sm:mt-8 sm:grid sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal
              key={category.id}
              delay={index * 100}
            >
              <article
                className="
                  group card-surface relative flex h-full flex-col
                  overflow-hidden
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:border-forest-300
                  hover:shadow-xl
                "
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-100">
                  <Image
                    src={category.image}
                    alt={`${category.pluralName} available for hire in Salooni, Chamba`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-110
                    "
                  />

                  {/* Image overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-charcoal-950/60
                      via-charcoal-950/10
                      to-transparent
                      transition-opacity
                      duration-500
                      group-hover:from-charcoal-950/70
                    "
                    aria-hidden="true"
                  />

                  {/* Category name */}
                  <h3
                    className="
                      absolute bottom-3 left-4
                      translate-y-1
                      font-display text-lg font-bold text-white
                      transition-transform duration-500
                      group-hover:translate-y-0
                    "
                  >
                    {category.pluralName}
                  </h3>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">

                  {/* Description */}
                  <p
                    className="
                      text-[13px]
                      leading-relaxed
                      text-charcoal-600
                      transition-colors
                      duration-300
                      group-hover:text-charcoal-700
                    "
                  >
                    {category.description}
                  </p>

                  {/* Details */}
                  <dl className="mt-3 space-y-1.5 text-[13px]">
                    <div className="flex gap-1.5">
                      <dt className="font-semibold text-charcoal-700">
                        Suitable for:
                      </dt>

                      <dd className="text-charcoal-500">
                        {category.suitableUse}
                      </dd>
                    </div>

                    {category.capacityNote && (
                      <div className="flex items-center gap-1.5 text-charcoal-500">
                        <Users
                          className="
                            h-3.5 w-3.5
                            text-charcoal-400
                            transition-transform
                            duration-300
                            group-hover:scale-110
                          "
                          aria-hidden="true"
                        />

                        <dt className="sr-only">Capacity</dt>

                        <dd>{category.capacityNote}</dd>
                      </div>
                    )}
                  </dl>

                  {/* Actions */}
                  <div className="mt-auto flex items-center gap-2 pt-4">

                    {/* Enquire */}
                    <a
                      href={generalWhatsAppUrl(
                        `booking a ${category.name.toLowerCase()}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex h-9 flex-1
                        items-center justify-center gap-1.5
                        rounded-lg
                        bg-forest-700
                        px-3
                        text-[13px]
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:bg-forest-800
                        hover:shadow-md
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-forest-700
                      "
                    >
                      Enquire Now

                      <ArrowRight
                        className="
                          h-3.5 w-3.5
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                        aria-hidden="true"
                      />
                    </a>

                    {/* View */}
                    <Link
                      href={categoryPagePath[category.id]}
                      className="
                        inline-flex h-9
                        items-center justify-center
                        rounded-lg
                        border border-charcoal-300
                        px-3
                        text-[13px]
                        font-semibold
                        text-charcoal-700
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-forest-400
                        hover:text-forest-700
                        hover:shadow-sm
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-forest-600
                      "
                    >
                      View

                      <span className="sr-only">
                        {" "}
                        {category.pluralName}
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {/* CTA Tile */}
          <Reveal delay={categories.length * 100}>
            <div
              className="
                group flex h-full flex-col justify-center
                rounded-card
                border border-dashed border-forest-300
                bg-forest-50
                p-6
                text-center
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-forest-400
                hover:bg-forest-100
                hover:shadow-lg
              "
            >
              <h3
                className="
                  font-display text-base font-bold
                  text-forest-900
                  transition-transform
                  duration-500
                  group-hover:-translate-y-1
                "
              >
                Not sure which vehicle fits?
              </h3>

              <p className="mt-2 text-[13px] leading-relaxed text-forest-800/80">
                Tell us where you are going, how many people, or what you are
                carrying. We will suggest a suitable vehicle.
              </p>

              <Link
                href="/contact#enquiry"
                className="
                  mt-4 inline-flex h-9
                  items-center justify-center gap-1.5
                  rounded-lg
                  bg-forest-700
                  px-4
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-forest-800
                  hover:shadow-md
                "
              >
                Ask Our Team

                <ArrowRight
                  className="
                    h-3.5 w-3.5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}