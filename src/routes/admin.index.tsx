import { createFileRoute, Link } from "@tanstack/react-router";

import { money, useShop } from "@/lib/shop";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { products, orders, settings } = useShop();
  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Products", value: String(products.length) },
    { label: "Active", value: String(products.filter((p) => p.active).length) },
    { label: "Orders", value: String(orders.length) },
    { label: "Revenue", value: money(revenue, settings.currency) },
  ];

  return (
    <div>
      <p className="eyebrow">Overview</p>
      <h1 className="display-xl mt-2 text-4xl sm:text-5xl">Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink/10 p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">{s.label}</p>
            <p className="display-xl mt-3 text-3xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-ink/10 p-5">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Latest orders</p>
            <Link to="/admin/orders" className="text-[10px] uppercase tracking-[0.16em] underline">
              All orders
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="mt-4 text-xs text-ink-soft">No orders yet.</p>
          ) : (
            <ul className="mt-4 space-y-2 text-xs">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex justify-between gap-3 border-b border-ink/5 pb-2">
                  <span className="font-semibold">{o.id}</span>
                  <span className="text-ink-soft">{o.customer.name || "Guest"}</span>
                  <span>{money(o.total, settings.currency)}</span>
                  <span className="uppercase tracking-[0.14em] text-ink-soft">{o.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-ink/10 p-5">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Low stock</p>
            <Link to="/admin/products" className="text-[10px] uppercase tracking-[0.16em] underline">
              Manage
            </Link>
          </div>
          <ul className="mt-4 space-y-2 text-xs">
            {[...products]
              .sort((a, b) => a.stock - b.stock)
              .slice(0, 5)
              .map((p) => (
                <li key={p.id} className="flex justify-between border-b border-ink/5 pb-2">
                  <span>{p.name}</span>
                  <span className="text-ink-soft">{p.stock} left</span>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
