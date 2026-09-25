import { getIcon } from "@/components/shared/Icon";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = getIcon(service.icon);

  return (
    <article className="card-surface h-full p-5 hover:-translate-y-1 hover:border-forest-300 hover:shadow-md">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-himalaya-50 text-himalaya-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-3.5 text-[15px] font-bold text-charcoal-900">
        {service.title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-600">
        {service.description}
      </p>
    </article>
  );
}
