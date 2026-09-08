import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { useShop } from "@/lib/shop";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

function AdminContent() {
  const { settings, updateSettings } = useShop();

  return (
    <div>
      <p className="eyebrow">Storefront</p>
      <h1 className="display-xl mt-2 text-4xl sm:text-5xl">Content &amp; hero</h1>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-ink/10 p-5">
          <p className="eyebrow">Hero section</p>
          <div className="mt-4 space-y-3">
            <Text
              label="Headline line 1"
              value={settings.heroLine1}
              onChange={(v) => updateSettings({ heroLine1: v })}
            />
            <Text
              label="Headline line 2"
              value={settings.heroLine2}
              onChange={(v) => updateSettings({ heroLine2: v })}
            />
            <Area
              label="Hero blurb"
              value={settings.heroBlurb}
              onChange={(v) => updateSettings({ heroBlurb: v })}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Text
                label="Primary button"
                value={settings.ctaPrimary}
                onChange={(v) => updateSettings({ ctaPrimary: v })}
              />
              <Text
                label="Secondary button"
                value={settings.ctaSecondary}
                onChange={(v) => updateSettings({ ctaSecondary: v })}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-ink/10 p-5">
          <p className="eyebrow">Marquee &amp; footer</p>
          <div className="mt-4 space-y-3">
            <Area
              label="Marquee items (one per line)"
              value={settings.marquee.join("\n")}
              onChange={(v) =>
                updateSettings({ marquee: v.split("\n").filter((s) => s.trim().length) })
              }
            />
            <Text
              label="Announcement"
              value={settings.announcement}
              onChange={(v) => updateSettings({ announcement: v })}
            />
            <Area
              label="Footer note"
              value={settings.footerNote}
              onChange={(v) => updateSettings({ footerNote: v })}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-ink/10 p-5 lg:col-span-2">
          <p className="eyebrow">Navigation links</p>
          <div className="mt-4 space-y-3">
            {settings.nav.map((item, i) => (
              <div key={i} className="grid gap-3 sm:grid-cols-[1fr_2fr_auto]">
                <Text
                  label="Label"
                  value={item.label}
                  onChange={(v) => {
                    const nav = settings.nav.slice();
                    nav[i] = { ...nav[i]!, label: v };
                    updateSettings({ nav });
                  }}
                />
                <Text
                  label="Path"
                  value={item.to}
                  onChange={(v) => {
                    const nav = settings.nav.slice();
                    nav[i] = { ...nav[i]!, to: v };
                    updateSettings({ nav });
                  }}
                />
                <button
                  onClick={() =>
                    updateSettings({ nav: settings.nav.filter((_, idx) => idx !== i) })
                  }
                  className="self-end rounded-full border border-ink/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                updateSettings({ nav: [...settings.nav, { label: "New link", to: "/collection" }] })
              }
              className="rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
            >
              Add link
            </button>
          </div>
        </section>
      </div>

      <button
        onClick={() => toast.success("Content saved")}
        className="mt-8 rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
      >
        Save changes
      </button>
      <p className="mt-3 text-[11px] text-ink-soft">Changes apply live as you type.</p>
    </div>
  );
}

function Text({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-ink"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">{label}</span>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-ink"
      />
    </label>
  );
}
