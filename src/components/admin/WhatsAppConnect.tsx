"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

/*
 * Launches Meta Embedded Signup (v4) in WhatsApp Business app coexistence
 * mode, then hands the result to /api/whatsapp/connect. The Facebook SDK only
 * returns a short-lived code here — the token exchange and every Graph call
 * happen on the server.
 */

const SDK_VERSION = "v23.0";

interface FacebookSdk {
  init(options: Record<string, unknown>): void;
  login(
    callback: (response: { authResponse?: { code?: string } | null; status?: string }) => void,
    options: Record<string, unknown>,
  ): void;
}

declare global {
  interface Window {
    FB?: FacebookSdk;
    fbAsyncInit?: () => void;
  }
}

interface SessionInfo {
  wabaId: string;
  phoneNumberId: string;
}

export function WhatsAppConnect({
  appId,
  configId,
  adminKey,
}: {
  appId: string;
  configId: string;
  adminKey: string;
}) {
  const [sdkReady, setSdkReady] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<unknown>(null);
  const code = useRef<string | null>(null);
  const session = useRef<SessionInfo | null>(null);
  const sent = useRef(false);

  const addLog = (line: string) => setLog((lines) => [...lines, line]);

  // The code (from FB.login) and the session info (from postMessage) arrive
  // separately and in either order; finish once both are here.
  const finishIfReady = async () => {
    if (sent.current || !code.current || !session.current) return;
    sent.current = true;
    addLog("Finishing setup on the server (no /register call)…");
    try {
      const response = await fetch("/api/whatsapp/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: adminKey, code: code.current, ...session.current }),
      });
      const data = await response.json();
      setResult(data);
      addLog(data.ok ? "Done. Check the results below." : "Finished with errors — see results below.");
    } catch (error) {
      addLog(`Server call failed: ${String(error)}`);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB?.init({ appId, autoLogAppEvents: true, xfbml: true, version: SDK_VERSION });
      setSdkReady(true);
    };
    if (window.FB) window.fbAsyncInit();

    const onMessage = (event: MessageEvent) => {
      if (!event.origin.endsWith("facebook.com")) return;
      let data: { type?: string; event?: string; data?: Record<string, string> };
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (data?.type !== "WA_EMBEDDED_SIGNUP") return;

      if (data.event?.startsWith("FINISH") && data.data?.waba_id && data.data?.phone_number_id) {
        session.current = { wabaId: data.data.waba_id, phoneNumberId: data.data.phone_number_id };
        addLog(`Meta finished: ${data.event} (WABA ${data.data.waba_id}, number ID ${data.data.phone_number_id})`);
        void finishIfReady();
      } else if (data.event === "CANCEL") {
        addLog(`Cancelled at step: ${data.data?.current_step ?? "unknown"}. Nothing was changed.`);
        setBusy(false);
      } else if (data.event === "ERROR") {
        addLog(`Meta error: ${data.data?.error_message ?? "unknown"}`);
        setBusy(false);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
    // finishIfReady only reads refs, so it does not need to re-subscribe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);

  const launch = () => {
    if (!window.FB) return;
    setBusy(true);
    setResult(null);
    code.current = null;
    session.current = null;
    sent.current = false;
    addLog("Opening Meta Embedded Signup…");
    window.FB.login(
      (response) => {
        const returned = response.authResponse?.code;
        if (!returned) {
          addLog("No code returned (popup closed or login cancelled).");
          setBusy(false);
          return;
        }
        code.current = returned;
        addLog("Received code from Meta.");
        void finishIfReady();
      },
      {
        config_id: configId,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "whatsapp_business_app_onboarding",
          sessionInfoVersion: "3",
        },
      },
    );
  };

  return (
    <div className="mt-6 space-y-5">
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <ul className="list-disc space-y-1 pl-5 text-sm text-charcoal-700">
        <li>Update the WhatsApp Business app to 2.24.17 or newer and keep the phone online.</li>
        <li>Linked devices (WhatsApp Desktop/Web) will be logged out; the phone app keeps working.</li>
        <li>Disappearing messages turn off, view-once and live location stop, broadcast lists become read-only.</li>
        <li>Undo any time in the app: Settings → Account → Business Platform → Disconnect Account.</li>
      </ul>

      <label className="flex items-start gap-2 text-sm text-charcoal-800">
        <input
          type="checkbox"
          className="mt-1"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
        />
        I understand the above and want to connect my WhatsApp Business app number now.
      </label>

      <button
        type="button"
        onClick={launch}
        disabled={!sdkReady || !confirmed || busy}
        className="w-full rounded-xl bg-forest-700 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {!sdkReady ? "Loading Facebook…" : busy ? "Working…" : "Connect WhatsApp"}
      </button>

      {log.length > 0 && (
        <ol className="space-y-1 rounded-lg bg-charcoal-50 p-4 font-mono text-xs text-charcoal-800">
          {log.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ol>
      )}

      {result !== null && (
        <pre className="max-h-96 overflow-auto rounded-lg bg-charcoal-900 p-4 text-xs text-charcoal-50">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
