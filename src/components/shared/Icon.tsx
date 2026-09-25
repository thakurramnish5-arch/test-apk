import {
  Boxes,
  Briefcase,
  CalendarDays,
  Camera,
  HardHat,
  Heart,
  Mountain,
  Package,
  Plane,
  Route,
  Tractor,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon registry for data-driven sections (services, features).
 * Add an entry here when a data file references a new icon name.
 */
const iconMap: Record<string, LucideIcon> = {
  Boxes,
  Briefcase,
  CalendarDays,
  Camera,
  HardHat,
  Heart,
  Mountain,
  Package,
  Plane,
  Route,
  Tractor,
  Users,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Mountain;
}
