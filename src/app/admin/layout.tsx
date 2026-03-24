import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-[#1c1c1c] flex flex-col">
        <div className="p-5 border-b border-[#1c1c1c]">
          <Link href="/">
            <Logo size="sm" />
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <p className="text-[9px] tracking-[0.25em] uppercase text-[#444444] mb-3 px-2">
            Admin
          </p>
          <AdminNav />
        </nav>
        <div className="p-4 border-t border-[#1c1c1c]">
          <Link
            href="/"
            className="text-xs text-[#444444] hover:text-[#c4a35a] transition-colors"
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
