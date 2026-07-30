# Blog post image gallery component

## Problem

Blog posts with many photos (e.g. the Gardienne hackathon post's ceremony
section) currently stack images vertically as separate `<img>` tags. With
8 photos this makes the article very long to scroll through. The user
wants a horizontally-scrolling gallery instead, and wants it as a
reusable building block for future posts, not a one-off hack.

## Approach

Add a `<Gallery>` React component, register it with `MDXRemote`'s
`components` prop so any `.mdx` post can use it, and swap the Gardienne
ceremony section over to it.

### `Gallery` component

- New file: `src/components/blog/Gallery.tsx` (client component —
  needs `onClick` handlers for the nav arrows).
- Props: `images: { src: string; alt: string; caption?: string }[]`.
- Layout: a horizontal flex row, `overflow-x: auto`, CSS
  `scroll-snap-type: x mandatory`; each slide is `scroll-snap-align:
  start`. This gives free touch-swipe/trackpad/wheel scrolling on
  every device with no JS.
- Each slide: fixed-height box (~360px), image inside uses
  `object-fit: contain` on a subtle background (`var(--bg-secondary)`)
  so no photo is ever cropped — needed because the ceremony set mixes
  landscape (0.67 ratio) and one portrait (1.5 ratio) shot.
- Caption: bold text rendered below the image inside the same slide
  (matches the existing caption style used elsewhere in posts).
- Nav: two floating `‹ ›` buttons overlaid on the gallery, calling
  `scrollBy({ left: ±slideWidth, behavior: 'smooth' })` on the
  container ref. Buttons are a progressive enhancement — swipe/scroll
  works without them, so no arrow state management (no need to hide
  at the start/end for v1).

### Wiring into MDX

`src/app/[locale]/blog/[slug]/page.tsx` passes
`components={{ Gallery }}` to `MDXRemote`. Any post can then write:

```mdx
<Gallery images={[
  { src: "/images/blog/gardienne/gardienne-speech.jpg", alt: "...", caption: "Pendant mon speech" },
  ...
]} />
```

### Gardienne post changes

In both `src/content/posts/fr/2026-07-14-gardienne-cyberdefense-hackathon.mdx`
and the `en/` counterpart, replace the 8 stacked `<img>` blocks under
"La cérémonie, en images" / "The ceremony, in pictures" with one
`<Gallery images={[...]} />` call carrying the same 8 photos, alts, and
captions already written.

## Out of scope

- No dot indicators, no autoplay, no lightbox/fullscreen zoom.
- No lazy-loading beyond what `<img>` gives by default — 8 images is
  small enough not to matter.
- Arrow disabled/hidden state at scroll boundaries — left for later if
  it's ever annoying in practice.

## Testing

Manual: run the dev server, open the Gardienne post, confirm the
gallery swipes/scrolls smoothly on a resized (mobile-width) browser
window and that arrow clicks scroll one slide. No automated test
harness exists in this project.
