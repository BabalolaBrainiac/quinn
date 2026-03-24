import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border flex flex-col">
        <div className="p-5 border-b border-border">
          <Link href="/">
            <Logo size="sm" />
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <p className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-3 px-2">
            Admin
          </p>
          <AdminNav />
        </nav>
        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-gold transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
