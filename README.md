# Velmont

A modern fashion e-commerce store built with React 19, TanStack Start, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **React 19** + TypeScript
- **TanStack Start** — file-based routing & SSR
- **Vite 7** — build tool
- **Tailwind CSS v4** — styling
- **shadcn/ui** — UI components
- **Bun** — package manager & runtime

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── assets/        # Static images
├── components/    # Reusable UI components
│   └── ui/        # shadcn/ui primitives
├── hooks/         # Custom React hooks
├── lib/           # Utilities & shop context
└── routes/        # File-based routes (TanStack Router)
```

## Features

- 🛍️ Product catalog with filtering
- 🛒 Shopping cart with localStorage persistence
- 👔 Admin panel (products, orders, payments, content, settings)
- 📱 Fully responsive
- 🌙 Dark mode support
