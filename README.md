# Alvaro Lopez Guerra · Portfolio

Built with [Astro](https://astro.build). Every push to `main` republishes the site.

## Add a project

1. Copy a folder in `src/content/projects/` (for example `cargo-bike-cage`) and rename it. The folder name becomes the page address.
2. Put the photos and renders in its `images/` folder.
3. Edit the fields at the top of `index.md`:
   - `status: completed` lists it under Projects, `in-progress` under Current projects.
   - `order` sets its position (lower numbers first).
   - `cover` is the main image; `gallery` holds the rest. Add `caption` and `link` to credit someone else's work.
4. Write the story under `## Problem`, `## Solution` and `## Outcome`.
5. Preview with `npm run dev`, then commit and push.

If a field is missing or misspelled, the build stops and names the file.

## Other updates

- Resume: replace `public/resume.pdf` (keep the name).
- About and Contact text: `src/pages/about.astro`, `src/pages/contact.astro`.
- Colours, font and spacing: `src/styles/global.css`.

## Run locally

```
npm install
npm run dev
```
