# Zobacz

A PWA webapp for displaying reminder pages with GIFs and deeplinks. Designed to be triggered by iPhone shortcuts.

## Features

- Glassy, elegant, airy aesthetic
- PWA support (installable on mobile)
- Admin panel for managing subpages
- Each subpage can have:
  - Title
  - Description (optional)
  - GIF from URL or random from keywords (via Tenor API)
  - Deeplink to open apps (mobile)

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Convex (real-time database)
- **PWA**: vite-plugin-pwa

## Getting Started

```bash
# Install dependencies
bun install

# Start Convex dev server (in one terminal)
bunx convex dev

# Start Vite dev server (in another terminal)
bun dev
```

## Deployment

Deploy Convex:
```bash
bunx convex deploy
```

Build for production:
```bash
bun run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static hosting.

## Pre-configured Pages

1. **CZAS NA PORANNE LEKI** - Morning medication reminder with love GIF
2. **czas na wieczorne leki** - Evening medication reminder with cute GIF  
3. **NO ODPISZ MI NOO :<<<** - Reminder to reply with Messenger deeplink

## Admin Panel

Access at `/admin` and click "Authenticate" (mock auth for now).
