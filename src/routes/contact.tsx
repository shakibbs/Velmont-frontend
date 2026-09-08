import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

import { PageShell, PageHeader } from "@/components/page-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Velmont — Support, Orders & Wholesale" },
      {
        name: "description",
        content:
          "Questions about an order, sizing or wholesale? Reach the Velmont studio team by email, phone or the contact form.",
      },
      { property: "og:title", content: "Contact Velmont" },
      {
        property: "og:description",
        content: "Reach the Velmont studio team about orders, sizing or wholesale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

const DETAILS = [
  { icon: Mail, label: "Email", value: "studio@velmont.co" },
  { icon: Phone, label: "Phone", value: "+880 1700 000 000" },
  { icon: MapPin, label: "Studio", value: "Level 4, Gulshan Ave, Dhaka" },
  { icon: Clock, label: "Hours", value: "Sun–Thu, 10:00–18:00" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Talk to the <span className="font-normal">studio</span>
          </>
        }
        blurb="Order questions, sizing advice, returns or wholesale — we answer every message within one business day."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Message sent — we'll reply within one business day");
          }}
          className="space-y-4 rounded-3xl border border-ink/10 p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                Name
              </span>
              <input
                required
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-ink"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                Email
              </span>
              <input
                type="email"
                required
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-ink"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Order number (optional)
            </span>
            <input className="mt-1.5 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-ink" />
          </label>
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Message
            </span>
            <textarea
              required
              rows={5}
              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-ink"
            />
          </label>
          <button className="rounded-full bg-ink px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:scale-[1.03]">
            {sent ? "Sent — send another" : "Send message"}
          </button>
        </form>

        <ul className="grid h-fit gap-4 sm:grid-cols-2">
          {DETAILS.map((d) => (
            <li key={d.label} className="rounded-2xl bg-ink/5 p-5">
              <d.icon className="size-4" />
              <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-ink-soft">{d.label}</p>
              <p className="mt-1 text-sm font-semibold">{d.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
