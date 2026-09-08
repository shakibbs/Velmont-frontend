import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import m1 from "@/assets/m1.jpg";
import m2 from "@/assets/m2.jpg";
import m3 from "@/assets/m3.jpg";
import w1 from "@/assets/w1.jpg";
import w2 from "@/assets/w2.jpg";
import w3 from "@/assets/w3.jpg";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import lookbook from "@/assets/lookbook.jpg";

export const IMAGE_LIBRARY = [
  { label: "Product 01", src: p1 },
  { label: "Product 02", src: p2 },
  { label: "Product 03", src: p3 },
  { label: "Product 04", src: p4 },
  { label: "Men overcoat", src: m1 },
  { label: "Men denim", src: m2 },
  { label: "Men cardigan", src: m3 },
  { label: "Women trench", src: w1 },
  { label: "Women knit dress", src: w2 },
  { label: "Women trousers", src: w3 },
  { label: "Men category", src: catMen },
  { label: "Women category", src: catWomen },
  { label: "Lookbook", src: lookbook },
];


export type Category = "men" | "women" | "trending" | "accessories";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  tag: string;
  img: string;
  stock: number;
  active: boolean;
};

export type NavItem = { label: string; to: string };

export type Settings = {
  brand: string;
  announcement: string;
  heroLine1: string;
  heroLine2: string;
  heroBlurb: string;
  ctaPrimary: string;
  ctaSecondary: string;
  marquee: string[];
  currency: string;
  payments: { card: boolean; bkash: boolean; nagad: boolean; cod: boolean };
  shippingFlat: number;
  freeShippingOver: number;
  nav: NavItem[];
  footerNote: string;
};

export type CartLine = { productId: string; size: string; qty: number };

export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string; address: string };
  method: string;
  reference: string;
  items: { name: string; size: string; qty: number; price: number }[];
  total: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
};

const SIZES = ["S", "M", "L", "XL"];
export { SIZES };

export const DEFAULT_PRODUCTS: Product[] = [
  { id: "vm-01", name: "Shadow Hoodie", price: 118, category: "men", tag: "Winter", img: p1, stock: 24, active: true },
  { id: "vm-02", name: "Storm Shell", price: 186, category: "men", tag: "Outerwear", img: p2, stock: 12, active: true },
  { id: "vm-03", name: "Core Crewneck", price: 94, category: "men", tag: "Season", img: p3, stock: 30, active: true },
  { id: "vm-04", name: "Boxy Tee 02", price: 62, category: "trending", tag: "New", img: p4, stock: 48, active: true },
  { id: "vm-05", name: "Field Cargo", price: 128, category: "men", tag: "Utility", img: p2, stock: 18, active: true },
  { id: "vm-06", name: "Heavy Fleece", price: 132, category: "women", tag: "New", img: p1, stock: 20, active: true },
  { id: "vm-07", name: "Utility Short", price: 78, category: "women", tag: "Season", img: p4, stock: 26, active: true },
  { id: "vm-08", name: "Dry Layer Long", price: 88, category: "women", tag: "Layer", img: p3, stock: 22, active: true },
  { id: "vm-09", name: "Tech Anorak", price: 164, category: "trending", tag: "Hot", img: catMen, stock: 9, active: true },
  { id: "vm-10", name: "Panel Track Pant", price: 108, category: "trending", tag: "Hot", img: catWomen, stock: 15, active: true },
  { id: "vm-11", name: "Ripstop Cap", price: 38, category: "accessories", tag: "Gear", img: p4, stock: 60, active: true },
  { id: "vm-12", name: "Sling Pack 03", price: 74, category: "accessories", tag: "Gear", img: p2, stock: 34, active: true },
  { id: "vm-13", name: "Wool Overcoat", price: 268, category: "men", tag: "Winter", img: m1, stock: 10, active: true },
  { id: "vm-14", name: "Relaxed Denim", price: 116, category: "men", tag: "Denim", img: m2, stock: 28, active: true },
  { id: "vm-15", name: "Knit Cardigan", price: 124, category: "men", tag: "Knitwear", img: m3, stock: 21, active: true },
  { id: "vm-16", name: "Panel Overshirt", price: 98, category: "men", tag: "Layer", img: p3, stock: 25, active: true },
  { id: "vm-17", name: "Stone Wash Jean", price: 122, category: "men", tag: "Denim", img: m2, stock: 19, active: true },
  { id: "vm-18", name: "Longline Trench", price: 246, category: "women", tag: "Outerwear", img: w1, stock: 8, active: true },
  { id: "vm-19", name: "Ribbed Midi Dress", price: 138, category: "women", tag: "New", img: w2, stock: 16, active: true },
  { id: "vm-20", name: "Wide Leg Trouser", price: 112, category: "women", tag: "Tailoring", img: w3, stock: 23, active: true },
  { id: "vm-21", name: "Cropped Knit Top", price: 82, category: "women", tag: "Knitwear", img: w2, stock: 30, active: true },
  { id: "vm-22", name: "Soft Shell Coat", price: 198, category: "women", tag: "Winter", img: w1, stock: 11, active: true },
  { id: "vm-23", name: "Oversized Wool Coat", price: 272, category: "trending", tag: "Hot", img: m1, stock: 7, active: true },
  { id: "vm-24", name: "Tailored Wide Pant", price: 118, category: "trending", tag: "Hot", img: w3, stock: 17, active: true },
];

export const DEFAULT_SETTINGS: Settings = {
  brand: "Velmont",
  announcement: "Free shipping on orders over USD 150",
  heroLine1: "Gear up every season",
  heroLine2: "every workout!",
  heroBlurb:
    "Stay sharp without compromising on movement. Our seasonal range is engineered for cold mornings, long sessions and everything in between.",
  ctaPrimary: "Shop now",
  ctaSecondary: "Explore all",
  marquee: ["Technical knits", "Winter shells", "Everyday fleece", "Made for movement", "Velmont 2026"],
  currency: "USD",
  payments: { card: true, bkash: true, nagad: true, cod: true },
  shippingFlat: 12,
  freeShippingOver: 150,
  nav: [
    { label: "Shop", to: "/collection" },
    { label: "Men", to: "/collection?category=men" },
    { label: "Women", to: "/collection?category=women" },
    { label: "Trending", to: "/collection?category=trending" },
  ],
  footerNote: "Monochrome technical streetwear, engineered for movement.",
};

type ShopState = {
  products: Product[];
  settings: Settings;
  cart: CartLine[];
  orders: Order[];
};

const DEFAULT_STATE: ShopState = {
  products: DEFAULT_PRODUCTS,
  settings: DEFAULT_SETTINGS,
  cart: [],
  orders: [],
};

const KEY = "velmont-shop-v2";

type Ctx = ShopState & {
  ready: boolean;
  addToCart: (productId: string, size: string, qty?: number) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  removeLine: (productId: string, size: string) => void;
  clearCart: () => void;
  saveProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  placeOrder: (o: Omit<Order, "id" | "createdAt">) => Order;
  setOrderStatus: (id: string, status: Order["status"]) => void;
  resetAll: () => void;
};

const ShopContext = createContext<Ctx | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ShopState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ShopState>;
        setState({
          products: parsed.products?.length ? parsed.products : DEFAULT_PRODUCTS,
          settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
          cart: parsed.cart ?? [],
          orders: parsed.orders ?? [],
        });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      ready,
      addToCart: (productId, size, qty = 1) =>
        setState((s) => {
          const i = s.cart.findIndex((l) => l.productId === productId && l.size === size);
          if (i === -1) return { ...s, cart: [...s.cart, { productId, size, qty }] };
          const cart = s.cart.slice();
          cart[i] = { ...cart[i]!, qty: cart[i]!.qty + qty };
          return { ...s, cart };
        }),
      setQty: (productId, size, qty) =>
        setState((s) => ({
          ...s,
          cart: s.cart
            .map((l) => (l.productId === productId && l.size === size ? { ...l, qty } : l))
            .filter((l) => l.qty > 0),
        })),
      removeLine: (productId, size) =>
        setState((s) => ({
          ...s,
          cart: s.cart.filter((l) => !(l.productId === productId && l.size === size)),
        })),
      clearCart: () => setState((s) => ({ ...s, cart: [] })),
      saveProduct: (p) =>
        setState((s) => {
          const exists = s.products.some((x) => x.id === p.id);
          return {
            ...s,
            products: exists ? s.products.map((x) => (x.id === p.id ? p : x)) : [...s.products, p],
          };
        }),
      deleteProduct: (id) =>
        setState((s) => ({ ...s, products: s.products.filter((p) => p.id !== id) })),
      updateSettings: (patch) => setState((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
      placeOrder: (o) => {
        const order: Order = {
          ...o,
          id: `VM-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
          createdAt: new Date().toISOString(),
        };
        setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }));
        return order;
      },
      setOrderStatus: (id, status) =>
        setState((s) => ({
          ...s,
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      resetAll: () => setState(DEFAULT_STATE),
    }),
    [state, ready],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export function useCartDetails() {
  const { cart, products, settings } = useShop();
  const lines = cart
    .map((l) => {
      const product = products.find((p) => p.id === l.productId);
      return product ? { ...l, product } : null;
    })
    .filter(Boolean) as { productId: string; size: string; qty: number; product: Product }[];

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const shipping =
    subtotal === 0 || subtotal >= settings.freeShippingOver ? 0 : settings.shippingFlat;
  const count = lines.reduce((n, l) => n + l.qty, 0);
  return { lines, subtotal, shipping, total: subtotal + shipping, count };
}

export function money(amount: number, currency = "USD") {
  return `${currency} ${amount.toFixed(2)}`;
}
