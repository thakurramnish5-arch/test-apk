"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";
import {
  bookingFlows,
  findAnswer,
  helpMenu,
  isGreeting,
  mainMenu,
  matchBookingFlow,
} from "@/data/chatbot";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  /** Follow-up chips offered under a bot reply. */
  chips?: string[];
  /** Marks the "I could not answer that" reply, which offers WhatsApp. */
  handoff?: boolean;
  /** Shows the enquiry / WhatsApp call to action under a booking reply. */
  cta?: boolean;
}

const GREETING =
  "Hello! 👋 What would you like to book? Pick an option below, or just type your question.";

const MENU_AGAIN =
  "Hey! 👋 How are you? How can I help you today? Pick an option below, or type your question.";

const FALLBACK =
  "I do not have an answer for that one. Our booking team can help you directly — they also confirm prices and availability, which I cannot.";

/**
 * Decides what the assistant replies with. Order matters: a greeting or a
 * "something else" tap reopens a menu, a vehicle choice opens that booking
 * flow, and anything else goes through the FAQ search — which returns null
 * rather than guessing, so we can hand over to a human.
 */
function buildReply(question: string, id: number): Message {
  if (isGreeting(question)) {
    return { id, from: "bot", text: MENU_AGAIN, chips: mainMenu };
  }

  if (/something else|other|kuch aur/i.test(question)) {
    return {
      id,
      from: "bot",
      text: "No problem — here are the things I am asked most. You can also type your own question.",
      chips: helpMenu,
    };
  }

  // Only treat this as a booking choice when the visitor actually asked to
  // book, so "how do I get a price?" is not mistaken for a car booking.
  if (/book|chahiye|chaiye|want|need|hire|rent/i.test(question)) {
    const key = matchBookingFlow(question);
    if (key) {
      const flow = bookingFlows[key];
      return {
        id,
        from: "bot",
        text: flow.answer,
        chips: flow.related,
        cta: true,
      };
    }
  }

  const topic = findAnswer(question);
  if (topic) {
    return { id, from: "bot", text: topic.answer, chips: topic.related };
  }

  return { id, from: "bot", text: FALLBACK, handoff: true };
}

interface SheetLayout {
  top: number;
  height: number;
  keyboardOpen: boolean;
}

/**
 * On phones the panel is a bottom sheet sized from the *visual* viewport,
 * so it stays on screen when the keyboard opens (iOS Safari does not shrink
 * the layout viewport, and a bottom-anchored fixed element ends up behind
 * the keyboard). Returns null from `sm` up, where the floating card is used.
 */
function useMobileSheet(open: boolean): SheetLayout | null {
  const [layout, setLayout] = useState<SheetLayout | null>(null);

  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(max-width: 639.98px)");
    const vv = window.visualViewport;

    const update = () => {
      if (!mq.matches) {
        setLayout(null);
        return;
      }
      const viewH = vv?.height ?? window.innerHeight;
      const offset = vv?.offsetTop ?? 0;
      const keyboardOpen = window.innerHeight - viewH > 120;
      // Keyboard up: use all the room left. Otherwise leave a strip of the
      // page visible above so it reads as a sheet, not a new page.
      const height = keyboardOpen
        ? viewH
        : Math.min(Math.round(viewH * 0.85), 640);
      setLayout({ top: offset + viewH - height, height, keyboardOpen });
    };

    update();
    mq.addEventListener("change", update);
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  // Stop the page behind the sheet from scrolling while it is open.
  const isSheet = open && layout !== null;
  useEffect(() => {
    if (!isSheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isSheet]);

  return open ? layout : null;
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", text: GREETING, chips: mainMenu },
  ]);
  const [typing, setTyping] = useState(false);

  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const sheet = useMobileSheet(open);

  // Only desktop gets the cursor in the box straight away. On touch devices
  // focusing would pop the keyboard over the menu before the visitor has
  // even read it — they tap the field themselves when they want to type.
  useEffect(() => {
    if (open && window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (raw: string) => {
    const question = raw.trim();
    if (!question) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, from: "user", text: question },
    ]);
    setInput("");
    setTyping(true);

    // A short pause reads as a reply rather than an instant canned response.
    window.setTimeout(() => {
      setMessages((prev) => [...prev, buildReply(question, nextId.current++)]);
      setTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-assistant-panel"
        aria-label={open ? "Close help assistant" : "Open help assistant"}
        className={cn(
          "chat-launcher fixed bottom-[calc(80px+env(safe-area-inset-bottom))] right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600",
          "lg:bottom-6 sm:right-6",
          open && "max-sm:hidden",
          open
            ? "bg-charcoal-800 text-white hover:bg-charcoal-900"
            : "bg-forest-700 text-white hover:bg-forest-800 hover:shadow-xl",
        )}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Panel */}
      {/* Phone backdrop — tap outside the sheet to close it */}
      {sheet && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="chat-backdrop fixed inset-0 z-[59] bg-charcoal-900/40"
        />
      )}

      {open && (
        <div
          id="chat-assistant-panel"
          ref={panelRef}
          role="dialog"
          aria-modal={sheet ? true : undefined}
          aria-label="Help assistant"
          style={
            sheet
              ? { top: sheet.top, height: sheet.height, bottom: "auto" }
              : undefined
          }
          className={cn(
            "chat-panel fixed z-[60] flex flex-col overflow-hidden bg-white shadow-2xl",
            // Phones: full-width bottom sheet (top/height set inline).
            "inset-x-0 rounded-t-3xl",
            // Tablet / desktop: floating card by the launcher.
            "sm:inset-x-auto sm:right-6 sm:bottom-[calc(148px+env(safe-area-inset-bottom))] sm:max-h-[min(34rem,calc(100dvh-180px))] sm:w-[22rem] sm:rounded-2xl sm:border sm:border-charcoal-200 lg:bottom-24",
            sheet?.keyboardOpen && "rounded-t-none",
          )}
        >
          {/* Header */}
          <div className="relative shrink-0 bg-forest-700 px-4 pt-4 pb-3 sm:pt-3">
            {/* Grab handle, phones only */}
            <span
              aria-hidden="true"
              className="absolute top-1.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/35 sm:hidden"
            />
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-bold text-white sm:text-sm">
                  Quick Help
                </p>
                <p className="truncate text-xs text-white/75 sm:text-[11px]">
                  Answers common questions instantly
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close help assistant"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 active:bg-white/30 focus-visible:outline-2 focus-visible:outline-white sm:hidden"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="thin-scrollbar min-h-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-4"
            aria-live="polite"
          >
            {messages.map((m) => (
              <div key={m.id}>
                <div
                  className={cn(
                    "w-fit max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words sm:text-[13px]",
                    m.from === "bot"
                      ? "bg-charcoal-100 text-charcoal-800"
                      : "ml-auto bg-forest-700 text-white",
                  )}
                >
                  {m.text}
                </div>

                {m.cta && (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <a
                      href="/contact#enquiry"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-forest-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-800"
                    >
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      Send an enquiry
                    </a>
                    <a
                      href={generalWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-charcoal-300 px-3 py-2 text-xs font-semibold text-charcoal-700 transition-colors hover:border-forest-400 hover:bg-forest-50"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      WhatsApp
                    </a>
                  </div>
                )}

                {m.handoff && (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <a
                      href={generalWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-whatsapp-dark"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      Ask on WhatsApp
                    </a>
                    <a
                      href={telHref}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-charcoal-300 px-3 py-2 text-xs font-semibold text-charcoal-700 transition-colors hover:border-forest-400 hover:bg-forest-50"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      Call
                    </a>
                  </div>
                )}

                {m.chips && m.chips.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.chips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => send(chip)}
                        className="rounded-full border border-forest-200 bg-forest-50 px-3 py-2 text-xs font-medium text-forest-800 active:bg-forest-100 sm:py-1.5 sm:text-[11px] transition-colors hover:border-forest-400 hover:bg-forest-100"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex w-fit gap-1 rounded-2xl bg-charcoal-100 px-3.5 py-3">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-charcoal-400"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
                <span className="sr-only">Typing…</span>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex shrink-0 items-center gap-2 border-t border-charcoal-200 p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Ask a question"
              enterKeyHint="send"
              autoComplete="off"
              // Keeps field-input's 16px on phones — smaller text makes iOS
              // Safari zoom the whole page in on focus.
              className="field-input min-w-0 flex-1 py-2"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-forest-700 text-white transition-colors hover:bg-forest-800 disabled:opacity-40"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <p
            className={cn(
              "shrink-0 border-t border-charcoal-100 px-4 pt-2 text-center text-[11px] leading-relaxed text-charcoal-500 sm:pb-2 sm:text-[10px]",
              // Clear the iPhone home indicator, unless the keyboard covers it.
              sheet?.keyboardOpen
                ? "pb-2"
                : "pb-[calc(0.5rem+env(safe-area-inset-bottom))]",
            )}
          >
            Automated replies. For prices and availability, contact{" "}
            {siteConfig.brand.name} directly.
          </p>
        </div>
      )}
    </>
  );
}
