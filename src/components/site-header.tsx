import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";

import { useCartDetails, useShop } from "@/lib/shop";

function parseTo(to: string) {
  const [path, query] = to.split("?");
  const search = query ? Object.fromEntries(new URLSearchParams(query).entries()) : undefined;
  return { path: path!, search };
}

export function SiteHeader() {
  const { settings } = useShop();
  const { count } = useCartDetails();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const value = q.trim();
    if (!value) return;
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/collection", search: { q: value } });
  };

  return (
    <div className="sticky top-0 z-40">
      <p className="bg-ink px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground">
        {settings.announcement}
      </p>

      <header className="px-4 pt-4 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-shell/80 px-4 py-2.5 backdrop-blur-xl sm:px-6">
          <ul className="hidden items-center gap-6 text-[11px] font-medium uppercase tracking-[0.16em] lg:flex">
            {settings.nav.map((item) => {
              const { path, search } = parseTo(item.to);
              return (
                <li key={item.label}>
                  <Link
                    to={path}
                    search={search as never}
                    className="transition-opacity hover:opacity-50"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-ink/15 lg:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>

          <Link
            to="/"
            className="font-display text-lg font-extrabold uppercase tracking-[0.4em] lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            {settings.brand}
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative rounded-full bg-ink px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:scale-[1.04]"
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="size-3.5" strokeWidth={2} /> Cart ({count})
              </span>
            </Link>
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-full bg-ink text-primary-foreground transition-transform hover:scale-[1.06]"
            >
              {searchOpen ? <X className="size-4" /> : <Search className="size-4" strokeWidth={1.75} />}
            </button>
          </div>
        </nav>

        {searchOpen && (
          <form
            onSubmit={submitSearch}
            className="mx-auto mt-2 flex max-w-7xl items-center gap-2 rounded-full bg-shell/95 px-4 py-2 shadow-[var(--shadow-card)] backdrop-blur-xl"
          >
            <Search className="size-4 shrink-0 text-ink-soft" />
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search hoodies, shells, caps…"
              className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-ink-soft"
            />
            <button className="rounded-full bg-ink px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
              Search
            </button>
          </form>
        )}

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-7xl rounded-3xl bg-shell/95 p-4 shadow-[var(--shadow-card)] backdrop-blur-xl lg:hidden">
            <ul className="space-y-1 text-[12px] font-semibold uppercase tracking-[0.16em]">
              {[...settings.nav, { label: "Size guide", to: "/size-guide" }, { label: "About", to: "/about" }, { label: "Contact", to: "/contact" }].map(
                (item) => {
                  const { path, search } = parseTo(item.to);
                  return (
                    <li key={item.label}>
                      <Link
                        to={path}
                        search={search as never}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-ink/5"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}
