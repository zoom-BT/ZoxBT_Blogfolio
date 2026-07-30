# Blog Gallery Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 8 stacked `<img>` tags in the Gardienne post's ceremony section with a reusable, horizontally-scrolling `<Gallery>` MDX component.

**Architecture:** A client-side React component (`Gallery.tsx`) renders a flex row with CSS scroll-snap for native swipe/wheel scrolling, plus two floating arrow buttons that call `scrollBy` on a ref. It's registered as a custom MDX tag via `MDXRemote`'s `components` prop, then used directly in the two Gardienne `.mdx` files.

**Tech Stack:** Next.js 16 (App Router, RSC), `next-mdx-remote/rsc`, React 19, inline styles + CSS custom properties (matches existing component conventions in this repo — no Tailwind config for one-off styles, see `ShareButtons.tsx`).

## Global Constraints

- Images must never be cropped (`object-fit: contain`), since the ceremony set mixes landscape (0.67 h/w) and one portrait (1.5 h/w) photo.
- No dot indicators, no autoplay, no lightbox — out of scope per spec.
- No automated test harness exists in this project; verification is manual (dev server + browser).
- Follow existing style conventions: inline `style={{...}}` objects, CSS vars like `var(--bg-secondary)` for theme-aware colors (see `ShareButtons.tsx`, or the `<img>` tags already in the Gardienne posts).

---

### Task 1: Create the `Gallery` component

**Files:**
- Create: `src/components/blog/Gallery.tsx`

**Interfaces:**
- Produces: `export default function Gallery({ images }: { images: { src: string; alt: string; caption?: string }[] })` — a React client component. Later tasks import it as `import Gallery from '@/components/blog/Gallery'` and use it in MDX as `<Gallery images={[...]} />`.

- [ ] **Step 1: Write the component**

```tsx
'use client';

import { useRef } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByOneSlide = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>('[data-slide]');
    const slideWidth = slide ? slide.offsetWidth + 16 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * slideWidth, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', margin: '1.5em 0' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          padding: '0 4px 8px',
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            data-slide
            style={{
              flex: '0 0 auto',
              width: 'min(85%, 420px)',
              scrollSnapAlign: 'start',
            }}
          >
            <div
              style={{
                height: '360px',
                background: 'var(--bg-secondary)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>
            {img.caption && (
              <p style={{ marginTop: '0.5em', fontWeight: 700, fontSize: '0.95em' }}>
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={() => scrollByOneSlide(-1)}
        style={{
          position: 'absolute',
          left: '4px',
          top: '160px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(0,0,0,0.55)',
          color: '#fff',
          fontSize: '18px',
          lineHeight: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scrollByOneSlide(1)}
        style={{
          position: 'absolute',
          right: '4px',
          top: '160px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(0,0,0,0.55)',
          color: '#fff',
          fontSize: '18px',
          lineHeight: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ›
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors referencing `Gallery.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/Gallery.tsx
git commit -m "feat: add reusable Gallery component for blog posts"
```

---

### Task 2: Wire `Gallery` into MDX rendering

**Files:**
- Modify: `src/app/[locale]/blog/[slug]/page.tsx:1-9` (imports), `:120-122` (the `MDXRemote` call)

**Interfaces:**
- Consumes: `Gallery` from `src/components/blog/Gallery.tsx` (Task 1) — `export default function Gallery({ images }: { images: { src: string; alt: string; caption?: string }[] })`.

- [ ] **Step 1: Import `Gallery` in the blog post page**

In `src/app/[locale]/blog/[slug]/page.tsx`, add to the existing import block (near the other component imports):

```tsx
import Gallery from '@/components/blog/Gallery';
```

- [ ] **Step 2: Pass it to `MDXRemote`**

Find the existing render call:

```tsx
<MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
```

Replace with:

```tsx
<MDXRemote
  source={post.content}
  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
  components={{ Gallery }}
/>
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/blog/[slug]/page.tsx"
git commit -m "feat: register Gallery as an MDX component for blog posts"
```

---

### Task 3: Use `<Gallery>` in the French Gardienne post

**Files:**
- Modify: `src/content/posts/fr/2026-07-14-gardienne-cyberdefense-hackathon.mdx:164-188`

**Interfaces:**
- Consumes: `Gallery` as an MDX tag (available globally in MDX content once Task 2 lands) — `<Gallery images={[{ src, alt, caption }, ...]} />`.

- [ ] **Step 1: Replace the 8 stacked `<img>` blocks with one `<Gallery>` call**

Replace lines 164–188 (from `## La cérémonie, en images` through the last `<img>` of that section — keep the heading, replace everything after it up to the next `---`) with:

```mdx
## La cérémonie, en images

<Gallery images={[
  { src: "/images/blog/gardienne/gardienne-speech.jpg", alt: "Présentation de Gardienne pendant le speech au jury", caption: "Pendant mon speech, en train de présenter Gardienne au jury." },
  { src: "/images/blog/gardienne/gardienne-attente.jpg", alt: "Assis avec les autres finalistes en attendant les résultats", caption: "L'attente. Assis avec les autres finalistes, à attendre les résultats." },
  { src: "/images/blog/gardienne/gardienne-promotrice.jpg", alt: "Avec la promotrice de l'événement", caption: "Avec la promotrice de l'événement, celle qui a rendu tout ça possible." },
  { src: "/images/blog/gardienne/gardienne-remise-prix.jpg", alt: "Remise du prix au Technopole", caption: "La remise du prix, dans le cadre du Technopole." },
  { src: "/images/blog/gardienne/gardienne-duo-prix.jpg", alt: "Photo avec le prix de la 2e place", caption: "2ᵉ place, prix en main, avec la personne qui l'a remis." },
  { src: "/images/blog/gardienne/gardienne-lots.jpg", alt: "Les lots remis : PC portable et chèque factice sur une table", caption: "Les lots, posés sur la table : PC portable, chèque factice, et le reste." },
  { src: "/images/blog/gardienne/gardienne-groupe-laureats.jpg", alt: "Photo de groupe avec les lauréats et les organisateurs", caption: "La photo de famille : lauréats et organisateurs réunis." },
  { src: "/images/blog/gardienne/gardienne-jury-app.jpg", alt: "Un membre du jury ouvre l'application Gardienne sur son téléphone", caption: "Et mon moment préféré : un membre du jury qui ouvre Gardienne sur son propre téléphone, écran d'accueil affiché, en plein test live." }
]} />
```

The `---` separator that follows (before `## Pour aller plus loin`) stays untouched.

- [ ] **Step 2: Commit**

```bash
git add src/content/posts/fr/2026-07-14-gardienne-cyberdefense-hackathon.mdx
git commit -m "feat: use Gallery component for Gardienne ceremony photos (FR)"
```

---

### Task 4: Use `<Gallery>` in the English Gardienne post

**Files:**
- Modify: `src/content/posts/en/2026-07-14-gardienne-cyberdefense-hackathon.mdx:164-188`

**Interfaces:**
- Consumes: same `Gallery` MDX tag as Task 3.

- [ ] **Step 1: Replace the 8 stacked `<img>` blocks with one `<Gallery>` call**

Replace lines 164–188 (from `## The ceremony, in pictures` through the last `<img>` of that section) with:

```mdx
## The ceremony, in pictures

<Gallery images={[
  { src: "/images/blog/gardienne/gardienne-speech.jpg", alt: "Presenting Gardienne during the speech to the jury", caption: "Mid-speech, presenting Gardienne to the jury." },
  { src: "/images/blog/gardienne/gardienne-attente.jpg", alt: "Sitting with the other finalists waiting for results", caption: "The wait. Sitting with the other finalists, waiting for results." },
  { src: "/images/blog/gardienne/gardienne-promotrice.jpg", alt: "With the event's promoter", caption: "With the event's promoter, the person who made it all possible." },
  { src: "/images/blog/gardienne/gardienne-remise-prix.jpg", alt: "Prize handover at the Technopole", caption: "Prize handover, at the Technopole venue." },
  { src: "/images/blog/gardienne/gardienne-duo-prix.jpg", alt: "Photo with the 2nd place prize", caption: "2nd place, prize in hand, with the person who handed it over." },
  { src: "/images/blog/gardienne/gardienne-lots.jpg", alt: "The prizes: laptop and fake cheque laid out on a table", caption: "The prizes, laid out on the table: laptop, oversized fake cheque, and the rest." },
  { src: "/images/blog/gardienne/gardienne-groupe-laureats.jpg", alt: "Group photo with laureates and organizers", caption: "The family photo: laureates and organizers together." },
  { src: "/images/blog/gardienne/gardienne-jury-app.jpg", alt: "A jury member opens the Gardienne app on their phone", caption: "And my favorite moment: a jury member opening Gardienne on their own phone, home screen on display, live-testing it right there." }
]} />
```

The `---` separator that follows (before `## Going further`) stays untouched.

- [ ] **Step 2: Commit**

```bash
git add src/content/posts/en/2026-07-14-gardienne-cyberdefense-hackathon.mdx
git commit -m "feat: use Gallery component for Gardienne ceremony photos (EN)"
```

---

### Task 5: Manual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

```bash
npm run dev &
timeout 30 bash -c 'until curl -sf http://localhost:3000 >/dev/null; do sleep 1; done'
```

- [ ] **Step 2: Screenshot the gallery at desktop width**

Using Playwright (already available in this environment's npx cache — see prior session for the `NODE_PATH` trick if `node_modules/playwright` isn't present locally), navigate to
`http://localhost:3000/fr/blog/2026-07-14-gardienne-cyberdefense-hackathon`, scroll to the "La cérémonie, en images" heading, and screenshot. Confirm:
- 8 images visible in a horizontal strip, none stretched or cropped (the portrait jury-app photo must show letterboxing, not a crop).
- Left/right arrow buttons are visible and vertically centered on the image row.

- [ ] **Step 3: Verify arrow click scrolls one slide**

Click the right arrow via Playwright (`page.click('button[aria-label="Next"]')`), wait briefly, screenshot again. Confirm the strip has visibly scrolled by roughly one slide width.

- [ ] **Step 4: Screenshot at mobile width**

Resize the Playwright viewport to `{ width: 390, height: 844 }` (iPhone-ish), reload the post, screenshot the gallery. Confirm slides are appropriately sized (`min(85%, 420px)` should show most of one slide plus a peek of the next) and swiping is the primary interaction (arrows can remain visible, that's fine).

- [ ] **Step 5: Repeat for the English post**

Same checks against `http://localhost:3000/en/blog/2026-07-14-gardienne-cyberdefense-hackathon`.

- [ ] **Step 6: Stop the dev server**

```bash
lsof -ti:3000 -sTCP:LISTEN | xargs -r kill
```

No commit for this task — it's verification only. If any check fails, fix the relevant task's code and re-run from Step 1.
