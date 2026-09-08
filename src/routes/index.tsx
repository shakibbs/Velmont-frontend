import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";

import hero from "@/assets/hero.png";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import lookbook from "@/assets/lookbook.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { useShop } from "@/lib/shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velmont — Technical Streetwear for Every Season" },
      {
        name: "description",
        content:
          "Velmont builds monochrome technical streetwear: oversized hoodies, shells and layers engineered for movement. Shop the new season drop.",
      },
      { property: "og:title", content: "Velmont — Technical Streetwear" },
      {
        property: "og:description",
        content: "Monochrome technical streetwear engineered for movement. Shop the new drop.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STRIPS = 9;

function Hero() {
  const { settings } = useShop();
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const span = window.innerHeight * 0.95;
        setP(Math.min(1, Math.max(0, window.scrollY / span)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const fade = { opacity: 1 - Math.min(1, p * 1.7) };

  return (
    <section id="top" className="relative h-[130vh]">
      <div className="sticky top-0 h-screen overflow-hidden px-4 sm:px-8">
        <div className="relative mx-auto flex h-full max-w-7xl flex-col pt-20 sm:pt-24">
          <h1
            className="animate-rise display-xl relative z-20 text-center text-[10.5vw] leading-[0.9] sm:text-[7.4vw] lg:text-[5.6vw]"
            style={{ ...fade, transform: `translateY(${-p * 80}px)` }}
          >
            {settings.heroLine1}
            <br />
            <span className="font-normal">{settings.heroLine2}</span>
          </h1>

          <div
            className="relative z-30 mt-6 flex justify-center gap-2"
            style={{ ...fade, transform: `translateY(${-p * 50}px)` }}
          >
            <Link
              to="/collection"
              className="rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:scale-[1.04]"
            >
              {settings.ctaPrimary}
            </Link>
            <a
              href="#lookbook"
              className="rounded-full border border-ink/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-primary-foreground"
            >
              {settings.ctaSecondary}
            </a>
          </div>

          {/* Model: 9-strip blind reveal effect using hero.png */}
          <div
            className="pointer-events-none relative z-10 mt-4 min-h-0 flex-1 origin-[50%_45%]"
            style={{ transform: `scale(${1 + p * 2.1}) translateY(${-p * 4}%)` }}
          >
            <div className="relative mx-auto h-full w-[min(62vw,320px)]">
              {Array.from({ length: STRIPS }).map((_, i) => (
                <img
                  key={i}
                  src={hero}
                  alt={i === 0 ? "Model wearing the Velmont technical shell jacket and cap" : ""}
                  aria-hidden={i !== 0}
                  width={1008}
                  height={1312}
                  className="animate-blind absolute inset-0 size-full object-contain object-bottom"
                  style={{
                    clipPath: `inset(${(i * 100) / STRIPS}% 0 ${100 - ((i + 1) * 100) / STRIPS}% 0)`,
                    animationDelay: `${0.12 + i * 0.07}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex items-end justify-between">
            <div
              className="animate-rise pointer-events-auto max-w-[15rem]"
              style={{ ...fade, transform: `translateY(${p * 60}px)` }}
            >
              <p className="text-xs leading-relaxed text-ink-soft">{settings.heroBlurb}</p>
            </div>

            <div
              className="animate-rise pointer-events-auto hidden sm:block"
              style={{ ...fade, transform: `translateY(${p * 60}px)` }}
            >
              <a
                href="#lookbook"
                className="group relative block w-[13rem] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
              >
                <img
                  src={catWomen}
                  alt="Velmont film still"
                  loading="lazy"
                  className="h-32 w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-11 place-items-center rounded-full bg-shell/85 backdrop-blur">
                    <Play className="size-4 fill-ink" />
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const { settings } = useShop();
  const items = settings.marquee;
  return (
    <div className="mt-6 overflow-hidden border-y border-ink/10 py-4">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="eyebrow flex items-center gap-10">
            {t} <span className="text-ink/25">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TopPicks() {
  const cards = [
    {
      img: catMen,
      title: "Men's layers built for peak performance!",
      meta: "FW / Winter 2026",
      category: "men" as const,
    },
    {
      img: catWomen,
      title: "Women's styles for daily movement.",
      meta: "SS / Summer 2026",
      category: "women" as const,
    },
  ];
  return (
    <section id="men" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Our top picks</p>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display-xl max-w-2xl text-4xl sm:text-5xl lg:text-6xl">
            Top layers for <span className="font-normal">peak</span> performance!
          </h2>
          <p className="max-w-xs text-xs leading-relaxed text-ink-soft">
            Discover the best of our collection, designed to carry you through the whole
            season without a single wasted stitch.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <Link
              key={c.title}
              to="/collection"
              search={{ category: c.category }}
              className="group relative block aspect-4/3 overflow-hidden rounded-3xl bg-ink shadow-[var(--shadow-card)]"
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 size-full object-cover opacity-80 grayscale transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-primary-foreground sm:p-8">
                <span className="self-end text-[10px] uppercase tracking-[0.2em] opacity-70">
                  {c.meta}
                </span>
                <h3 className="display-xl max-w-[12ch] text-3xl sm:text-4xl">{c.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rail({ title, category }: { title: string; category: "men" | "women" | "trending" }) {
  const { products } = useShop();
  const items = products.filter((p) => p.active && p.category === category).slice(0, 4);
  if (!items.length) return null;

  return (
    <section className="px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display-xl text-3xl sm:text-4xl">{title}</h2>
          <Link
            to="/collection"
            search={{ category }}
            className="eyebrow inline-flex items-center gap-1 hover:text-ink"
          >
            View all <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Lookbook() {
  return (
    <section id="lookbook" className="relative overflow-hidden px-4 py-24 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-16 select-none text-center">
        <p className="display-xl whitespace-nowrap text-[16vw] text-ink/10">For your next</p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-16 select-none text-center">
        <p className="display-xl whitespace-nowrap text-[16vw] text-ink/10">Full season</p>
      </div>
      <div className="relative mx-auto max-w-md">
        <img
          src={lookbook}
          alt="Velmont seasonal lookbook cover"
          width={912}
          height={1104}
          loading="lazy"
          className="w-full rounded-3xl object-cover shadow-[var(--shadow-card)] grayscale"
        />
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <div className="overflow-hidden rounded-[2rem] bg-shell shadow-[var(--shadow-shell)]">
        <SiteHeader />
        <main>
          <Hero />
          <Marquee />
          <TopPicks />
          <Rail title="Men" category="men" />
          <Rail title="Women" category="women" />
          <Rail title="Trending now" category="trending" />
          <div className="flex justify-center pb-6">
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:scale-[1.04]"
            >
              Full collection <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <Lookbook />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
