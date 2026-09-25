"use client";

import { useEffect, useState } from "react";
import { Download, EllipsisVertical, Share, SquarePlus } from "lucide-react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { siteConfig } from "@/config/site";
import {
  ANDROID_APK_URL,
  initPwa,
  promptInstall,
  useInstallState,
  type InstallPlatform,
} from "@/lib/pwa";
import { cn } from "@/lib/utils";

/** Mounted once in the root layout to register the service worker early. */
export function PwaInit() {
  useEffect(() => {
    initPwa();
  }, []);
  return null;
}

interface InstallAppButtonProps {
  /** "menu" = full-width button for the mobile menu, "footer" = link on dark footer. */
  variant?: "menu" | "footer";
  className?: string;
}

/**
 * "Download App".
 * - Android: one tap downloads the app (.apk) straight to the phone.
 * - iPhone: Apple does not allow app files from websites, so we show the
 *   short "Add to Home Screen" steps — the only way to install there.
 * - Desktop: the browser's install prompt where available, else steps.
 * Hidden when the site is already running as the installed app.
 */
export function InstallAppButton({ variant = "menu", className }: InstallAppButtonProps) {
  const { installed, platform } = useInstallState();
  const [helpOpen, setHelpOpen] = useState(false);

  if (installed) return null;

  const handleClick = async () => {
    const result = await promptInstall();
    if (result === "unavailable") setHelpOpen(true);
  };

  const label = (
    <>
      <Download
        className={cn("h-4 w-4", variant === "footer" && "text-forest-400")}
        aria-hidden="true"
      />
      Download App
    </>
  );

  const classes =
    variant === "menu"
      ? cn(buttonClasses({ variant: "secondary", fullWidth: true }), className)
      : cn(
          "inline-flex items-center gap-2 text-charcoal-400 transition-colors hover:text-white",
          className,
        );

  return (
    <>
      {platform === "android" ? (
        <a href={ANDROID_APK_URL} download="salooni-transport.apk" className={classes}>
          {label}
        </a>
      ) : (
        <button type="button" onClick={handleClick} className={classes}>
          {label}
        </button>
      )}

      <Modal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="Install the app"
        description={`Add ${siteConfig.brand.shortName} to your home screen — free, no app store needed.`}
        className="sm:max-w-md"
      >
        <InstallSteps platform={platform} />
        <div className="pb-4 pt-2">
          <Button variant="primary" fullWidth onClick={() => setHelpOpen(false)}>
            Got it
          </Button>
        </div>
      </Modal>
    </>
  );
}

function InstallSteps({ platform }: { platform: InstallPlatform }) {
  const steps =
    platform === "ios"
      ? [
          {
            icon: Share,
            text: (
              <>
                Open this site in <strong>Safari</strong> and tap the{" "}
                <strong>Share</strong> button at the bottom.
              </>
            ),
          },
          {
            icon: SquarePlus,
            text: (
              <>
                Scroll down and tap <strong>Add to Home Screen</strong>.
              </>
            ),
          },
          {
            icon: Download,
            text: (
              <>
                Tap <strong>Add</strong>. The app icon will appear on your home screen.
              </>
            ),
          },
        ]
      : [
          {
            icon: EllipsisVertical,
            text: (
              <>
                Tap the browser menu <strong>(⋮)</strong> at the top-right. For best
                results use <strong>Chrome</strong>.
              </>
            ),
          },
          {
            icon: Download,
            text: (
              <>
                Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.
              </>
            ),
          },
          {
            icon: SquarePlus,
            text: (
              <>
                Confirm with <strong>Install</strong>. The app icon will appear on
                your {platform === "desktop" ? "desktop" : "home screen"}.
              </>
            ),
          },
        ];

  return (
    <ol className="space-y-3 py-3">
      {steps.map((step, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
            <step.icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="pt-1.5 text-sm leading-relaxed text-charcoal-700">
            <span className="font-semibold text-charcoal-900">{index + 1}.</span>{" "}
            {step.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
