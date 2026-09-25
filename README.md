# davi.dev — Portfolio

Personal portfolio for Davi, Mobile App & AI Developer (iOS · Android · Web).
Built with **Next.js 16 (App Router)**, **Tailwind CSS v4** and **Motion**.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` in production so Open Graph URLs are absolute.

## Structure

| Path | What |
| --- | --- |
| `src/app/` | Routes: `/`, `/about`, `/expertise`, `/work`; `icon.svg`, `apple-icon.png`, `opengraph-image.png` |
| `src/i18n/dictionaries.ts` | All copy in **PT-BR / EN / ES** — edit text here |
| `src/data/projects.ts` | Work items (image, tags, card shape, filters) |
| `src/data/stack.ts` | Tech-stack icons by category |
| `src/components/Glyph.tsx` | Custom animated icon set (non-brand icons) |
| `src/components/sections/` | Page sections |
| `src/app/globals.css` | Design tokens, paper / linen / canvas / leather textures, card silhouettes |
| `public/images`, `public/video` | Photos (Unsplash) and clips (Pexels) |
| `public/stack` | Tech logos (Devicon, Simple Icons) |

Language is detected from the browser and remembered in `localStorage`.

## Credits

Photos: [Unsplash](https://unsplash.com/license). Videos: [Pexels](https://www.pexels.com/license/).
Logos: [Devicon](https://devicon.dev) (MIT) and [Simple Icons](https://simpleicons.org) (CC0); brand logos remain trademarks of their owners.
