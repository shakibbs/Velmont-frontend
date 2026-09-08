import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { useShop } from "@/lib/shop";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const { settings, updateSettings, resetAll } = useShop();

  return (
    <div>
      <p className="eyebrow">Configuration</p>
      <h1 className="display-xl mt-2 text-4xl sm:text-5xl">Settings</h1>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-ink/10 p-5">
          <p className="eyebrow">Brand</p>
          <label className="mt-4 block">
            <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">
              Brand name
            </span>
            <input
              value={settings.brand}
              onChange={(e) => updateSettings({ brand: e.target.value })}
              className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <p className="mt-3 text-[11px] text-ink-soft">
            Used in the header, footer and admin sidebar.
          </p>
        </section>

        <section className="rounded-2xl border border-ink/10 p-5">
          <p className="eyebrow">Data</p>
          <p className="mt-4 text-xs text-ink-soft">
            Products, orders and settings are stored in this browser. Resetting restores the
            original demo catalog and clears all orders.
          </p>
          <button
            onClick={() => {
              resetAll();
              toast.success("Store reset to defaults");
            }}
            className="mt-5 rounded-full border border-ink/20 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-ink hover:text-primary-foreground"
          >
            Reset store data
          </button>
        </section>
      </div>
    </div>
  );
}
