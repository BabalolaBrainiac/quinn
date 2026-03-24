"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Inbox,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays, exact: false },
  { href: "/admin/quotes", label: "Custom Quotes", icon: Inbox, exact: false },
  { href: "/admin/availability", label: "Availability", icon: Calendar, exact: false },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <ul className="space-y-1">
      {links.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-xs tracking-wide transition-colors",
                active
                  ? "text-gold bg-gold/8"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface"
              )}
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
