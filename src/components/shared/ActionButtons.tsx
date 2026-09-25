import { MessageCircle, Phone } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";

type Size = "sm" | "md" | "lg";

interface ActionProps {
  size?: Size;
  className?: string;
  fullWidth?: boolean;
  label?: string;
}

/** Direct-dial button. Uses the number from the central config. */
export function CallButton({
  size = "md",
  className,
  fullWidth,
  label = "Call Now",
}: ActionProps) {
  return (
    <LinkButton
      href={telHref}
      variant="outline"
      size={size}
      className={className}
      fullWidth={fullWidth}
      ariaLabel={`Call our booking team on ${siteConfig.contact.phoneDisplay}`}
    >
      <Phone className="h-4 w-4" aria-hidden="true" />
      {label}
    </LinkButton>
  );
}

interface WhatsAppProps extends ActionProps {
  /** Adds context to the pre-filled message, e.g. a vehicle name. */
  context?: string;
  variant?: "whatsapp" | "outline" | "light";
}

export function WhatsAppButton({
  size = "md",
  className,
  fullWidth,
  context,
  label = "WhatsApp Us",
  variant = "whatsapp",
}: WhatsAppProps) {
  return (
    <LinkButton
      href={generalWhatsAppUrl(context)}
      variant={variant}
      size={size}
      className={className}
      fullWidth={fullWidth}
      external
      ariaLabel={`Message us on WhatsApp${context ? ` about ${context}` : ""}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </LinkButton>
  );
}
