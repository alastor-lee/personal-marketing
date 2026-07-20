# Personal Marketing Site

Static site built with [Astro](https://astro.build) + Tailwind CSS v4. Builds to
plain HTML/CSS in `dist/`, served by nginx on the VPS.

## Development

```sh
npm install     # install deps
npm run dev      # dev server with hot reload → http://localhost:4321
npm run build    # production build → ./dist
npm run preview  # preview the built site locally
```

`predev`/`prebuild` automatically copy the resume PDF (`../resume/alastorcurns-ic.pdf`)
into `public/alastorcurns.pdf` via `npm run sync:resume`.

> Note: when you **add a new content collection**, restart the dev server — Astro's
> content layer doesn't always register brand-new collections while running.

## Content

| What | Where |
|------|-------|
| Blog posts | `src/content/blog/*.md` (frontmatter: `title`, `date`, `description`, `draft`, `tags`) |
| Projects | `src/data/projects.json` |
| Gallery | `src/data/gallery.json` + images in `src/images/gallery/` |
| Resume | authored in LaTeX at repo-root `resume/`; the `-ic` PDF is served |

Blog posts with `draft: true` show in `dev` but are excluded from production builds and RSS.

### Adding gallery photos

Export from Photos as **JPEG** (not HEIC), drop into `src/images/gallery/`, then add an
entry to `src/data/gallery.json` with `src`, `alt`, and an optional `caption`. Images are
optimized (resized + WebP) at build time.

## Deploy

Fill in the SSH target and web root in `deploy.sh`, then:

```sh
./deploy.sh      # builds and rsyncs dist/ to the VPS
```
