import { createFileRoute } from "@tanstack/react-router";

import { useShop } from "@/lib/shop";

export const Route = createFileRoute("/admin/payments")({
  component: AdminPayments,
});

const METHODS = [
  { key: "card", label: "Card", note: "Visa / Mastercard checkout form" },
  { key: "bkash", label: "bKash", note: "Manual merchant wallet + transaction ID" },
  { key: "nagad", label: "Nagad", note: "Manual merchant wallet + transaction ID" },
  { key: "cod", label: "Cash on delivery", note: "Courier collects payment" },
] as const;

function AdminPayments() {
  const { settings, updateSettings } = useShop();

  return (
    <div>
      <p className="eyebrow">Checkout</p>
      <h1 className="display-xl mt-2 text-4xl sm:text-5xl">Payments</h1>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-ink/10 p-5">
          <p className="eyebrow">Methods</p>
          <ul className="mt-4 space-y-3">
            {METHODS.map((m) => (
              <li
                key={m.key}
                className="flex items-center justify-between gap-4 rounded-xl border border-ink/10 p-3"
              >
                <div>
                  <p className="text-sm font-semibold">{m.label}</p>
                  <p className="text-[11px] text-ink-soft">{m.note}</p>
                </div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]">
                  <input
                    type="checkbox"
                    checked={settings.payments[m.key]}
                    onChange={(e) =>
                      updateSettings({
                        payments: { ...settings.payments, [m.key]: e.target.checked },
                      })
                    }
                  />
                  Enabled
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-ink/10 p-5">
          <p className="eyebrow">Shipping &amp; currency</p>
          <div className="mt-4 space-y-3">
            <Num
              label="Flat shipping fee"
              value={settings.shippingFlat}
              onChange={(v) => updateSettings({ shippingFlat: v })}
            />
            <Num
              label="Free shipping over"
              value={settings.freeShippingOver}
              onChange={(v) => updateSettings({ freeShippingOver: v })}
            />
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">Currency</span>
              <input
                value={settings.currency}
                onChange={(e) => updateSettings({ currency: e.target.value })}
                className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-sm"
              />
            </label>
          </div>
          <p className="mt-4 rounded-xl bg-ink/5 p-3 text-[11px] text-ink-soft">
            This is a demo checkout — no money moves. Connecting live card, bKash or Nagad
            processing needs a backend, which we can add next.
          </p>
        </section>
      </div>
    </div>
  );
}

function Num({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-sm"
      />
    </label>
  );
}
