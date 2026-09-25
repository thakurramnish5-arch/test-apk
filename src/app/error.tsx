"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in server logs; users see the friendly message below.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center bg-charcoal-50 py-16">
      <div className="container-page">
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
            <AlertTriangle
              className="h-8 w-8 text-amber-600"
              aria-hidden="true"
            />
          </span>
          <h1 className="mt-6 font-display text-2xl font-bold text-charcoal-900 sm:text-3xl">
            Something went wrong
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-charcoal-600">
            This page did not load. Please try again. You can also call or
            WhatsApp our team in Salooni and we will help you.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Button onClick={reset} size="lg" variant="primary">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Try Again
            </Button>
            <LinkButton href={telHref} variant="outline" size="lg">
              Call Now
            </LinkButton>
            <LinkButton
              href={generalWhatsAppUrl()}
              variant="whatsapp"
              size="lg"
              external
            >
              WhatsApp Us
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
