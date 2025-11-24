# LangAgent Blog

A minimal, RTL-friendly blog built with Next.js 14 app router and Tailwind CSS. The UI consumes a simple Django REST API for categories, tags, and posts, rendering everything server-side (SSR) with Markdown support for post content.

## Features

- ✅ **Next.js 14 App Router** with server components and TypeScript
- ✅ **RTL-ready** design using Tailwind CSS utility classes
- ✅ **Configurable API** via environment variables (`API_BASE_URL`, page size, revalidation)
- ✅ **Categories, tags, and paginated posts** with SEO metadata
- ✅ **Markdown rendering** for post bodies (headings, lists, code blocks, etc.)
- ✅ **Dockerfile + docker-compose** for quick containerized runs

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Copy env template and configure**
   ```bash
   cp .env.example .env.local
   # update API_BASE_URL etc. if needed
   ```
3. **Run the dev server**
   ```bash
   npm run dev
   ```
   The site will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `API_BASE_URL` | Base URL for the backend blog API | `http://127.0.0.1:8000/api/blog` |
| `NEXT_PUBLIC_API_BASE_URL` | Optional public URL for client-side access (if needed) | same as above |
| `API_PAGE_SIZE` | Number of posts per page | `6` |
| `API_REVALIDATE_SECONDS` | Revalidate window for cached fetches | `60` |

> When running via Docker Compose, `API_BASE_URL` defaults to `http://host.docker.internal:8000/api/blog` so it can reach a backend running on the host machine.

## Docker

Build and run the production image locally:

```bash
docker compose up --build
```

This exposes the app on port `3000`. Update compose env vars if your API lives elsewhere.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Lint via ESLint |

## Structure

```
src/
  app/
    (shared)/PageHero.tsx
    about/page.tsx
    categories/[slug]/page.tsx
    categories/page.tsx
    posts/[slug]/page.tsx
    tags/[slug]/page.tsx
    tags/page.tsx
    layout.tsx
    page.tsx
  components/
    BackToHomeButton.tsx
    Pagination.tsx
    PostCard.tsx
    PostList.tsx
  lib/
    blog.ts
    markdown.ts
```

## API Expectations

The frontend expects a REST API that exposes the following endpoints:

- `GET /categories/` → paginated list with `name`, `slug`, `description`
- `GET /categories/<slug>/` → single category
- `GET /tags/` → paginated list with `name`, `slug`
- `GET /tags/<slug>/` → single tag
- `GET /posts/` → paginated list with `title`, `slug`, `excerpt`, `category`, `tags`, `created_at`, etc.
- `GET /posts/<slug>/` → full post including `content` (Markdown)

## Markdown Support

Post bodies are rendered through a lightweight Markdown parser (no external dependencies) and styled via `.markdown-body` classes defined in `src/app/globals.css`.

## RTL Considerations

The root layout sets `<html dir="rtl">` and the design uses logical properties (padding-inline, etc.) to stay consistent in right-to-left contexts. Tailwind classes handle most spacing and typography.

## License

MIT — use it freely in your projects.
