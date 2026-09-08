import { Link } from "@tanstack/react-router";

import { useShop } from "@/lib/shop";

export function SiteFooter() {
  const { settings } = useShop();

  return (
    <footer
      id="join"
      className="mt-8 rounded-t-[2.5rem] bg-ink px-4 py-16 text-primary-foreground sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="display-xl text-4xl sm:text-6xl">
              Join the <span className="font-normal">{settings.brand}</span> list
            </h2>
            <p className="mt-4 max-w-md text-xs text-white/60">{settings.footerNote}</p>
            <form
              className="mt-8 flex max-w-md items-center gap-2 rounded-full bg-white/10 p-1.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="your@email.com"
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-white/40"
              />
              <button className="rounded-full bg-primary-foreground px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform hover:scale-[1.04]">
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 text-xs">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-white/40">Shop</p>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link to="/collection" search={{}} className="hover:text-white">
                    New arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collection"
                    search={{ category: "men" }}
                    className="hover:text-white"
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collection"
                    search={{ category: "women" }}
                    className="hover:text-white"
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collection"
                    search={{ category: "accessories" }}
                    className="hover:text-white"
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-white/40">Support</p>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link to="/shipping" className="hover:text-white">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/size-guide" className="hover:text-white">
                    Size guide
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-16 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.2em] text-white/40">
          © {new Date().getFullYear()} {settings.brand} — All rights reserved
        </p>
      </div>
    </footer>
  );
}
