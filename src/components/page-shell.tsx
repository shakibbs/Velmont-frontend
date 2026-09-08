import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <div className="overflow-hidden rounded-[2rem] bg-shell shadow-[var(--shadow-shell)]">
        <SiteHeader />
        <main className="px-4 pb-20 pt-10 sm:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: ReactNode;
  blurb?: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display-xl mt-3 text-5xl sm:text-6xl">{title}</h1>
      {blurb ? <p className="mt-4 text-sm leading-relaxed text-ink-soft">{blurb}</p> : null}
    </header>
  );
}
