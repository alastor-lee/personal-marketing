---
title: "In praise of boring static sites"
date: 2026-06-20
description: "Why a pile of pre-built HTML files is still a great way to ship a personal site."
tags: ["web"]
---

There's a lot to be said for a website that is just **files**. No database, no server
process to babysit, no runtime to patch at 2am.

> A static site is a site you can serve with `nginx` and forget about.

Astro builds down to exactly that: HTML, CSS, and a sprinkle of JS only where a page
actually needs it. This page ships **zero** JavaScript.

### The tradeoffs

You give up server-side dynamism, but for a personal marketing site you rarely need it —
and what you gain is speed, security, and a deploy that's a single `rsync`.
