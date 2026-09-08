import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  Receipt,
  Palette,
  CreditCard,
  Settings as SettingsIcon,
  Store,
} from "lucide-react";

import { useShop } from "@/lib/shop";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Velmont Control Center" },
      {
        name: "description",
        content:
          "Manage Velmont products, orders, homepage content, payment methods and store settings from one panel.",
      },
      { property: "og:title", content: "Velmont Admin Panel" },
      { property: "og:description", content: "Products, orders, content and settings in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const SECTIONS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package, exact: false },
  { to: "/admin/orders", label: "Orders", icon: Receipt, exact: false },
  { to: "/admin/content", label: "Content & hero", icon: Palette, exact: false },
  { to: "/admin/payments", label: "Payments", icon: CreditCard, exact: false },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon, exact: false },
] as const;

function AdminLayout() {
  const { settings } = useShop();
  const pathname = useRouterState({ select: (s: any) => s.location.pathname }) as unknown as string;

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <div className="mx-auto flex min-h-[calc(100vh-1rem)] max-w-[100rem] overflow-hidden rounded-[2rem] bg-shell shadow-[var(--shadow-shell)]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/10 bg-ink p-5 text-primary-foreground md:flex">
          <p className="font-display text-base font-extrabold uppercase tracking-[0.35em]">
            {settings.brand}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Admin panel</p>

          <nav className="mt-8 flex-1 space-y-1">
            {SECTIONS.map((s) => {
              const active = s.exact ? pathname === s.to : pathname.startsWith(s.to);
              return (
                <Link
                  key={s.to}
                  to={s.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                    active ? "bg-white/15" : "text-white/60 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <s.icon className="size-4" strokeWidth={1.75} />
                  {s.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/"
            className="mt-6 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-medium uppercase tracking-[0.12em] hover:bg-white/20"
          >
            <Store className="size-4" strokeWidth={1.75} /> View store
          </Link>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 overflow-x-auto border-b border-ink/10 px-4 py-3 md:hidden">
            {SECTIONS.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="whitespace-nowrap rounded-full border border-ink/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
              >
                {s.label}
              </Link>
            ))}
          </div>
          <div className="p-5 sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
