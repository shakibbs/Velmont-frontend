import { createFileRoute } from "@tanstack/react-router";

import { PageShell, PageHeader } from "@/components/page-shell";
import { money, useShop } from "@/lib/shop";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Velmont" },
      {
        name: "description",
        content:
          "Velmont shipping rates and delivery times, plus our 14-day return and exchange policy for unworn pieces.",
      },
      { property: "og:title", content: "Shipping & Returns — Velmont" },
      {
        property: "og:description",
        content: "Delivery times, shipping rates and our 14-day return policy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  const { settings } = useShop();

  const rows = [
    { zone: "Inside Dhaka", time: "1–2 business days", cost: money(settings.shippingFlat, settings.currency) },
    { zone: "Outside Dhaka", time: "2–4 business days", cost: money(settings.shippingFlat, settings.currency) },
    {
      zone: `Orders over ${money(settings.freeShippingOver, settings.currency)}`,
      time: "1–4 business days",
      cost: "Free",
    },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Help"
        title={
          <>
            Shipping &amp; <span className="font-normal">returns</span>
          </>
        }
        blurb="Orders placed before 4pm ship the same working day. Everything is packed in recycled mailers with tracking."
      />

      <div className="mt-10 overflow-hidden rounded-2xl border border-ink/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink text-primary-foreground">
            <tr className="text-[10px] uppercase tracking-[0.16em]">
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Delivery time</th>
              <th className="px-4 py-3">Cost</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.zone} className="border-t border-ink/10">
                <td className="px-4 py-3 font-semibold">{r.zone}</td>
                <td className="px-4 py-3 text-ink-soft">{r.time}</td>
                <td className="px-4 py-3 text-ink-soft">{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="display-xl text-3xl">Returns</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            <li>Return any unworn piece within 14 days of delivery, tags attached.</li>
            <li>Exchanges for a different size are free once per order.</li>
            <li>Refunds land back on your original payment method within 5 business days.</li>
            <li>Accessories and final-sale pieces are exchange only.</li>
          </ul>
        </section>
        <section>
          <h2 className="display-xl text-3xl">How to start one</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            <li>1. Email studio@velmont.co with your order number.</li>
            <li>2. We send a prepaid pickup slip within one business day.</li>
            <li>3. Hand the parcel to the courier — no printing needed.</li>
            <li>4. We inspect and process within 48 hours of arrival.</li>
          </ol>
        </section>
      </div>
    </PageShell>
  );
}
