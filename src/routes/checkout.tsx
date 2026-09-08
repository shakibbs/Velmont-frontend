import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageShell } from "@/components/page-shell";
import { money, useCartDetails, useShop, type Order } from "@/lib/shop";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Velmont" },
      {
        name: "description",
        content: "Complete your Velmont order with card, bKash, Nagad or cash on delivery.",
      },
      { property: "og:title", content: "Checkout — Velmont" },
      { property: "og:description", content: "Card, bKash, Nagad or cash on delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { settings, placeOrder } = useShop();
  const { lines, subtotal, shipping, total } = useCartDetails();

  const methods = [
    { key: "card", label: "Card", enabled: settings.payments.card },
    { key: "bkash", label: "bKash", enabled: settings.payments.bkash },
    { key: "nagad", label: "Nagad", enabled: settings.payments.nagad },
    { key: "cod", label: "Cash on delivery", enabled: settings.payments.cod },
  ].filter((m) => m.enabled);

  const [method, setMethod] = useState(methods[0]?.key ?? "cod");
  const [placed, setPlaced] = useState<Order | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    card: "",
    expiry: "",
    cvc: "",
    wallet: "",
    trx: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lines.length) return;
    const order = placeOrder({
      customer: { name: form.name, phone: form.phone, address: form.address },
      method,
      reference:
        method === "card"
          ? `card •••• ${form.card.slice(-4)}`
          : method === "cod"
            ? "cash on delivery"
            : `${method} ${form.wallet} / ${form.trx}`,
      items: lines.map((l) => ({
        name: l.product.name,
        size: l.size,
        qty: l.qty,
        price: l.product.price,
      })),
      total,
      status: method === "cod" ? "pending" : "paid",
    });
    setPlaced(order);
    toast.success(`Order ${order.id} placed`);
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl">
            <h1 className="display-xl text-5xl sm:text-6xl">Checkout</h1>

            {placed ? (
              <div className="mt-10 rounded-2xl border border-ink/10 p-10 text-center">
                <p className="eyebrow">Order confirmed</p>
                <p className="display-xl mt-3 text-4xl">{placed.id}</p>
                <p className="mt-4 text-sm text-ink-soft">
                  {money(placed.total, settings.currency)} · paid via {placed.method}. A confirmation
                  will be sent to {placed.customer.phone}.
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <Link
                    to="/collection"
                    className="rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground"
                  >
                    Keep shopping
                  </Link>
                  <button
                    onClick={() => navigate({ to: "/admin/orders" })}
                    className="rounded-full border border-ink/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
                  >
                    View in admin
                  </button>
                </div>
              </div>
            ) : lines.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-ink/10 p-10 text-center text-sm text-ink-soft">
                Nothing to check out yet.{" "}
                <Link to="/collection" className="underline">
                  Browse the collection
                </Link>
                .
              </div>
            ) : (
              <form onSubmit={submit} className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-8">
                  <section className="rounded-2xl border border-ink/10 p-6">
                    <p className="eyebrow">Delivery details</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <Field label="Full name" value={form.name} onChange={set("name")} required />
                      <Field label="Phone" value={form.phone} onChange={set("phone")} required />
                      <div className="sm:col-span-2">
                        <Field
                          label="Address"
                          value={form.address}
                          onChange={set("address")}
                          required
                        />
                      </div>
                    </div>
                  </section>

                  <section className="rounded-2xl border border-ink/10 p-6">
                    <p className="eyebrow">Payment method</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {methods.map((m) => (
                        <button
                          key={m.key}
                          type="button"
                          onClick={() => setMethod(m.key)}
                          className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                            method === m.key
                              ? "bg-ink text-primary-foreground"
                              : "border border-ink/15 hover:bg-ink/5"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    {method === "card" && (
                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="sm:col-span-3">
                          <Field
                            label="Card number"
                            value={form.card}
                            onChange={set("card")}
                            placeholder="4242 4242 4242 4242"
                            required
                          />
                        </div>
                        <Field label="Expiry" value={form.expiry} onChange={set("expiry")} placeholder="MM/YY" required />
                        <Field label="CVC" value={form.cvc} onChange={set("cvc")} placeholder="123" required />
                      </div>
                    )}

                    {(method === "bkash" || method === "nagad") && (
                      <div className="mt-5 space-y-3">
                        <p className="rounded-xl bg-ink/5 p-3 text-xs text-ink-soft">
                          Send {money(total, settings.currency)} to our {method === "bkash" ? "bKash" : "Nagad"}{" "}
                          merchant number <strong>017XX-XXXXXX</strong>, then enter your wallet
                          number and transaction ID below.
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Field
                            label="Wallet number"
                            value={form.wallet}
                            onChange={set("wallet")}
                            required
                          />
                          <Field
                            label="Transaction ID"
                            value={form.trx}
                            onChange={set("trx")}
                            required
                          />
                        </div>
                      </div>
                    )}

                    {method === "cod" && (
                      <p className="mt-5 rounded-xl bg-ink/5 p-3 text-xs text-ink-soft">
                        Pay in cash when your order arrives. Our courier will call before delivery.
                      </p>
                    )}
                  </section>
                </div>

                <aside className="h-fit rounded-2xl bg-ink p-6 text-primary-foreground">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Order</p>
                  <ul className="mt-5 space-y-2 text-xs text-white/70">
                    {lines.map((l) => (
                      <li key={`${l.productId}-${l.size}`} className="flex justify-between gap-3">
                        <span className="truncate">
                          {l.product.name} · {l.size} × {l.qty}
                        </span>
                        <span>{money(l.product.price * l.qty, settings.currency)}</span>
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-white/60">Subtotal</dt>
                      <dd>{money(subtotal, settings.currency)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/60">Shipping</dt>
                      <dd>{shipping === 0 ? "Free" : money(shipping, settings.currency)}</dd>
                    </div>
                    <div className="flex justify-between text-base font-semibold">
                      <dt>Total</dt>
                      <dd>{money(total, settings.currency)}</dd>
                    </div>
                  </dl>
                  <button className="mt-6 w-full rounded-full bg-primary-foreground py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    Place order
                  </button>
                </aside>
              </form>
            )}
      </div>
    </PageShell>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-ink"
      />
    </label>
  );
}
