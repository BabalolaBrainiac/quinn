"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/designs", label: "Designs" },
  { href: "/custom", label: "Custom" },
  { href: "/book", label: "Book" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Derived: menu is "open" by storing the path it was opened on.
  // When pathname changes (navigation), menuOpenAt !== pathname → closed automatically.
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null);
  const mobileOpen = menuOpenAt === pathname;

  const toggleMenu = () => setMenuOpenAt(mobileOpen ? null : pathname);
  const closeMenu = () => setMenuOpenAt(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#1c1c1c]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Quinn's Artistry Home" onClick={closeMenu}>
            <Logo size="sm" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs tracking-[0.15em] uppercase transition-colors duration-200",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-[#c4a35a]"
                    : "text-[#888888] hover:text-[#f0ece4]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild size="sm">
              <Link href="/book">Book Now</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#888888] hover:text-[#f0ece4] transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808] flex flex-col pt-16">
          <nav className="flex flex-col items-center justify-center flex-1 gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "font-display text-4xl font-light transition-colors duration-200",
                  pathname === link.href
                    ? "text-[#c4a35a]"
                    : "text-[#f0ece4] hover:text-[#c4a35a]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-4">
              <Link href="/book" onClick={closeMenu}>Book Now</Link>
            </Button>
          </nav>
          <div className="p-6 text-center text-xs text-[#444444] tracking-widest uppercase">
            Lagos, Nigeria
          </div>
        </div>
      )}
    </>
  );
}
