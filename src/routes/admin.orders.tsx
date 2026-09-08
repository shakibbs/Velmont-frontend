import { createFileRoute } from "@tanstack/react-router";

import { money, useShop, type Order } from "@/lib/shop";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const STATUSES: Order["status"][] = ["pending", "paid", "shipped", "cancelled"];

function AdminOrders() {
  const { orders, settings, setOrderStatus } = useShop();

  return (
    <div>
      <p className="eyebrow">Sales</p>
      <h1 className="display-xl mt-2 text-4xl sm:text-5xl">Orders</h1>

      {orders.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-ink/10 p-8 text-xs text-ink-soft">
          No orders yet — place a test order from the storefront checkout.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => (
            <article key={o.id} className="rounded-2xl border border-ink/10 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="display-xl text-2xl">{o.id}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                    {new Date(o.createdAt).toLocaleString()} · {o.method} · {o.reference}
                  </p>
                  <p className="mt-2 text-xs">
                    {o.customer.name} · {o.customer.phone}
                    <br />
                    <span className="text-ink-soft">{o.customer.address}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="display-xl text-2xl">{money(o.total, settings.currency)}</p>
                  <select
                    value={o.status}
                    onChange={(e) => setOrderStatus(o.id, e.target.value as Order["status"])}
                    className="mt-2 rounded-full border border-ink/15 bg-transparent px-3 py-1.5 text-[10px] uppercase tracking-[0.14em]"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <ul className="mt-4 space-y-1 border-t border-ink/10 pt-3 text-xs text-ink-soft">
                {o.items.map((i, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>
                      {i.name} · {i.size} × {i.qty}
                    </span>
                    <span>{money(i.price * i.qty, settings.currency)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
