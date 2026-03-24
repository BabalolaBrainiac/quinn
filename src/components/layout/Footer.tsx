import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ExternalLink, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="md" className="mb-5" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium bespoke tattoo artistry in Lagos, Nigeria. Every piece is a
              conversation between artist and skin — crafted to last a lifetime.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@quinnsartistry.ng"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+2348000000000"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Phone"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-5 font-medium">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/designs", label: "Browse Designs" },
                { href: "/custom", label: "Custom Design" },
                { href: "/book", label: "Book a Session" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-5 font-medium">
              Studio
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">Lagos, Nigeria</li>
              <li className="text-sm text-muted-foreground">hello@quinnsartistry.ng</li>
              <li className="text-sm text-muted-foreground">+234 800 000 0000</li>
              <li className="text-sm text-muted-foreground">
                Tue–Sat, 10am – 7pm
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} Quinn&apos;s Artistry. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground tracking-wider">
            Lagos · Nigeria · Naira (₦)
          </p>
        </div>
      </div>
    </footer>
  );
}
