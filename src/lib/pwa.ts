"use client";

import { useSyncExternalStore } from "react";

/** Chrome/Edge/Samsung Internet event that lets us show the install prompt. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** Signed Android app, built from twa/ (see twa/README.md). */
export const ANDROID_APK_URL = "/app/salooni-transport.apk";
const ANDROID_PACKAGE_ID = "in.saloonitransport.app";

export type InstallPlatform = "ios" | "android" | "desktop";

export interface InstallState {
  /** True once the browser has offered a one-tap install prompt. */
  canPrompt: boolean;
  /** Running as the installed app (home-screen icon). */
  installed: boolean;
  platform: InstallPlatform;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let state: InstallState = { canPrompt: false, installed: false, platform: "desktop" };
const serverState: InstallState = state;
const listeners = new Set<() => void>();
let initialised = false;

function setState(next: Partial<InstallState>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

function detectPlatform(): InstallPlatform {
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac, so also check for touch support.
  const isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";
  if (/android/i.test(ua)) return "android";
  return "desktop";
}

function isStandalone(): boolean {
  // The Android app sets this referrer on launch; remember it for later pages.
  try {
    if (document.referrer.startsWith(`android-app://${ANDROID_PACKAGE_ID}`)) {
      sessionStorage.setItem("in-android-app", "1");
    }
    if (sessionStorage.getItem("in-android-app") === "1") return true;
  } catch {
    // Storage blocked — fall through to the display-mode check.
  }
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/**
 * Registers the service worker and starts listening for the install prompt.
 * Called once from the root layout so the prompt is captured even if it
 * fires before the menu or footer button has mounted.
 */
export function initPwa() {
  if (initialised || typeof window === "undefined") return;
  initialised = true;

  setState({ platform: detectPlatform(), installed: isStandalone() });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event as BeforeInstallPromptEvent;
    setState({ canPrompt: true });
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    setState({ canPrompt: false, installed: true });
  });

  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Install will fall back to the browser's own menu; nothing to show.
    });
  }
}

/**
 * Opens the native install prompt. Resolves to "unavailable" when the
 * browser has not offered one (iOS Safari, Firefox, or already dismissed),
 * so the caller can show manual steps instead.
 */
export async function promptInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  if (!deferredPrompt) return "unavailable";
  const promptEvent = deferredPrompt;
  // A prompt event can only be used once.
  deferredPrompt = null;
  setState({ canPrompt: false });
  await promptEvent.prompt();
  const { outcome } = await promptEvent.userChoice;
  return outcome;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useInstallState(): InstallState {
  return useSyncExternalStore(subscribe, () => state, () => serverState);
}
