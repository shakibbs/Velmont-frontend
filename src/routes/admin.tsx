import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Receipt,
  Palette,
  CreditCard,
  Settings as SettingsIcon,
  Store,
  Lock,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

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

function AdminLoginScreen() {
  const { settings, loginAdmin } = useShop();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("admin@velmont.com");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Please enter password");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const success = loginAdmin(password);
      setLoading(false);
      if (success) {
        toast.success("Authenticated successfully");
      } else {
        toast.error("Invalid credentials");
      }
    }, 300);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-shell p-8 text-foreground border border-ink/10 shadow-[var(--shadow-shell)]">
        <div className="text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-ink text-primary-foreground">
            <Lock className="size-6" />
          </span>
          <h1 className="mt-4 font-display text-xl font-extrabold uppercase tracking-[0.3em] text-ink">
            {settings.brand} Admin
          </h1>
          <p className="mt-1 text-xs text-ink-soft">Enter credentials to access the control center</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Admin Email
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-background px-4 py-3 text-xs outline-none focus:border-ink"
              placeholder="admin@velmont.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Access Key / Password
            </label>
            <div className="relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. admin)"
                className="w-full rounded-xl border border-ink/15 bg-background px-4 py-3 text-xs outline-none focus:border-ink pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Authenticating…" : "Unlock Admin Panel"} <ArrowRight className="size-4" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4 text-[10px] text-ink-soft">
          <Link to="/" className="hover:text-ink transition-colors">
            ← Return to storefront
          </Link>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="size-3" /> Protected Area
          </span>
        </div>
      </div>
    </div>
  );
}

function AdminLayout() {
  const { settings, isAdminAuthenticated, logoutAdmin } = useShop();
  const pathname = useRouterState({ select: (s: any) => s.location.pathname }) as unknown as string;

  if (!isAdminAuthenticated) {
    return <AdminLoginScreen />;
  }

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

          <div className="mt-6 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-medium uppercase tracking-[0.12em] hover:bg-white/20"
            >
              <Store className="size-4" strokeWidth={1.75} /> View store
            </Link>
            <button
              onClick={() => {
                logoutAdmin();
                toast.info("Logged out from admin panel");
              }}
              className="flex w-full items-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white/70 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="size-4" strokeWidth={1.75} /> Log out
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3 md:hidden">
            <div className="flex items-center gap-2 overflow-x-auto">
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
            <button
              onClick={() => {
                logoutAdmin();
                toast.info("Logged out");
              }}
              aria-label="Log out"
              className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/20"
            >
              <LogOut className="size-3.5" />
            </button>
          </div>
          <div className="p-5 sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
