import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppConnect } from "@/components/admin/WhatsAppConnect";
import { secretsMatch } from "@/lib/metaGraph";

/*
 * Hidden admin page for connecting the WhatsApp Business app number to the
 * Cloud API (coexistence). Opened only as
 *   /admin/whatsapp-connect?key=<ADMIN_CONNECT_SECRET>
 * Anyone without the key gets a normal 404.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Connect WhatsApp",
  robots: { index: false, follow: false },
};

export default async function WhatsAppConnectPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  if (!secretsMatch(key, process.env.ADMIN_CONNECT_SECRET)) notFound();

  const appId = process.env.META_APP_ID;
  const configId = process.env.META_ES_CONFIG_ID;

  return (
    <section className="bg-charcoal-50 py-10 sm:py-14">
      <div className="container-page">
        <div className="mx-auto max-w-2xl rounded-2xl border border-charcoal-200 bg-white p-6 sm:p-8">
          <h1 className="font-display text-2xl font-bold text-forest-900">
            Connect WhatsApp Business app to Cloud API
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
            Coexistence: the number stays on the WhatsApp Business app on your
            phone. This flow never re-registers or disconnects it.
          </p>
          {appId && configId ? (
            <WhatsAppConnect appId={appId} configId={configId} adminKey={key!} />
          ) : (
            <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
              Set META_APP_ID and META_ES_CONFIG_ID first.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
