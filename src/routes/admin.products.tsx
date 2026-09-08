import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

import { IMAGE_LIBRARY, money, useShop, type Category, type Product } from "@/lib/shop";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

const CATEGORIES: Category[] = ["men", "women", "trending", "accessories"];

const blank = (): Product => ({
  id: `vm-${Math.random().toString(36).slice(2, 6)}`,
  name: "",
  price: 0,
  category: "men",
  tag: "New",
  img: IMAGE_LIBRARY[0]!.src,
  stock: 10,
  active: true,
});

function AdminProducts() {
  const { products, settings, saveProduct, deleteProduct } = useShop();
  const [draft, setDraft] = useState<Product | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    saveProduct(draft);
    toast.success(`${draft.name} saved`);
    setDraft(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="display-xl mt-2 text-4xl sm:text-5xl">Products</h1>
        </div>
        <button
          onClick={() => setDraft(blank())}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
        >
          <Plus className="size-4" /> New product
        </button>
      </div>

      {draft && (
        <form onSubmit={save} className="mt-6 rounded-2xl border border-ink/10 p-5">
          <p className="eyebrow">Edit product</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Text label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
            <Text
              label="Price"
              type="number"
              value={String(draft.price)}
              onChange={(v) => setDraft({ ...draft, price: Number(v) })}
            />
            <Text
              label="Stock"
              type="number"
              value={String(draft.stock)}
              onChange={(v) => setDraft({ ...draft, stock: Number(v) })}
            />
            <Text label="Tag" value={draft.tag} onChange={(v) => setDraft({ ...draft, tag: v })} />
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">Category</span>
              <select
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value as Category })}
                className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">Image</span>
              <select
                value={draft.img}
                onChange={(e) => setDraft({ ...draft, img: e.target.value })}
                className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-sm"
              >
                {IMAGE_LIBRARY.map((i) => (
                  <option key={i.label} value={i.src}>
                    {i.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={draft.active}
                onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
              />
              Visible on storefront
            </label>
          </div>
          <div className="mt-5 flex gap-2">
            <button className="rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
              Save
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className="rounded-full border border-ink/15 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10">
        <table className="w-full min-w-[46rem] text-left text-xs">
          <thead className="bg-ink/5 text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-ink/10">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={p.img} alt="" className="size-10 rounded-lg object-cover grayscale" />
                    <span className="font-semibold">{p.name}</span>
                  </div>
                </td>
                <td className="p-3 uppercase tracking-[0.12em] text-ink-soft">{p.category}</td>
                <td className="p-3">{money(p.price, settings.currency)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">{p.active ? "Live" : "Hidden"}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button
                      aria-label={`Edit ${p.name}`}
                      onClick={() => setDraft(p)}
                      className="grid size-8 place-items-center rounded-full border border-ink/15"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      aria-label={`Delete ${p.name}`}
                      onClick={() => {
                        deleteProduct(p.id);
                        toast.success(`${p.name} deleted`);
                      }}
                      className="grid size-8 place-items-center rounded-full border border-ink/15 hover:bg-ink hover:text-primary-foreground"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Text({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-ink"
      />
    </label>
  );
}
