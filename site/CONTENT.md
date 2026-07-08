# Content & Launch Guide

How to add content to the site, plus the outstanding tasks before it goes live.

## TODO — before launch

- [ ] **Set the SSH target in `deploy.sh`** (`SSH_TARGET`) once the VPS OS reinstall is done. Confirm `WEBROOT` (`/var/www/alastorcurns.com`) matches the nginx config on the server.
- [ ] **Replace the 6 placeholder gallery photos** in `src/images/gallery/` with real JPEG exports, and update their `alt`/`caption` in `src/data/gallery.json` (see below).
- [ ] **Sanity-check the project blurbs** in `src/data/projects.json` — they were inferred from the resume. Double-check the FIPS entry ("FIPS 140 / government-adjacent") in particular.
- [x] ~~Set the real domain in `astro.config.mjs`~~ → `https://alastorcurns.com`
- [x] ~~Optimize the headshot~~ → `src/images/headshot.jpg`

### Nice-to-have (later)

- [ ] Add real blog posts and delete the two samples (`hello-world.md`, `on-static-sites.md`).
- [ ] Consider a light-mode toggle (design tokens already make this cheap to add).
- [ ] Set up push-to-deploy via GitHub Actions if the manual `./deploy.sh` gets tedious.

---

## Adding a blog post

1. Create a new Markdown file in `src/content/blog/`. The **filename becomes the URL slug**
   (e.g. `my-first-post.md` → `/blog/my-first-post`).
2. Add frontmatter at the top, then write the post body in Markdown:

   ```markdown
   ---
   title: "My Post Title"
   date: 2026-07-10
   description: "One-line summary shown in the list and RSS feed."
   draft: false          # true = visible in `npm run dev` only, excluded from the live build
   tags: ["web", "astro"] # optional
   ---

   Write the post here. Standard Markdown: **bold**, [links](https://…),
   `code`, lists, > blockquotes, ## headings, etc.
   ```

3. `npm run dev` → view it at `http://localhost:4321/blog/<slug>`. Posts are sorted
   newest-first automatically, and the RSS feed (`/rss.xml`) updates on build.

**Notes**
- `draft: true` keeps a post unpublished — it shows locally with a "draft" badge but
  never ships to production or the RSS feed.
- No need to touch any index page or nav; the blog list is generated from these files.

---

## Adding gallery photos

1. **Convert to JPEG first.** iPhone shoots HEIC, which the build can't read. In the Photos
   app, export as JPEG (or use any HEIC→JPEG converter). Re-encoding also strips GPS/EXIF,
   so location data won't be published.
2. Drop the `.jpg` file(s) into `src/images/gallery/`.
3. Add an entry per photo to `src/data/gallery.json`:

   ```json
   {
     "id": "beach-sunset",
     "src": "../images/gallery/beach-sunset.jpg",
     "alt": "Sun setting over the water at Ocean Beach",
     "caption": "Ocean Beach, winter",
     "order": 7
   }
   ```

   - `id` — any unique string.
   - `src` — path **relative to `src/data/`** (so it starts with `../images/gallery/`).
   - `alt` — required, for accessibility (describe the photo).
   - `caption` — optional; shown as an overlay in the lightbox.
   - `order` — lower numbers appear first.

4. That's it. The build resizes each photo into an optimized thumbnail + a larger lightbox
   image (WebP), so you can commit full-resolution JPEGs — they never ship at full size.

**Removing the placeholders:** delete `photo-01.jpg … photo-06.jpg` from
`src/images/gallery/` and their entries from `gallery.json`.

> Reminder: if you ever add a **new content collection** (not just a new post/photo),
> restart the dev server — Astro doesn't register brand-new collections while running.

---

## Everyday commands

```sh
npm run dev      # dev server + hot reload → http://localhost:4321
npm run build    # production build → ./dist
npm run preview  # preview the built output locally
./deploy.sh      # build + rsync dist/ to the VPS
```
