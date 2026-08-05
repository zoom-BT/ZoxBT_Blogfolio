# Certifications page redesign + data cleanup

## Problem

Same-day site launch on LinkedIn. The Certifications page needs to be
accurate (no fake placeholder data) and needs to visually surface the
certificate itself (image + issuing-org logo), not just a text card.
It also needs 4 new real certifications added (Coursera ML Specialization
batch + IBM SkillsBuild badge) and an existing one (Kaggle) updated with
newly completed courses.

## Approach

### 1. Data model

Add three optional fields to `Certification` (`src/lib/types.ts`):

```ts
image?: string;   // certificate screenshot, e.g. /images/certifications/{slug}.png
logo?: string;    // issuing-org logo, e.g. /images/certifications/logos/cousera.png
order?: number;   // lower = shown first; entries without it sort after, by date desc (unchanged behavior)
```

### 2. Sort order (`getCertifications`, `src/lib/content.ts`)

Entries with `order` set come first, sorted ascending by `order`. Entries
without `order` follow, sorted by date descending exactly as today. This
is a pure additive change — existing entries with no `order` keep their
current relative order.

### 3. Card layout ("Design C", approved via visual mockup)

In `src/app/[locale]/certifications/page.tsx`'s card grid:
- If `cert.image` is set: render it full-width at the top of the card
  (fixed aspect box, `object-fit: cover`), with `cert.logo` (if set) as a
  circular medallion overlapping the bottom-left corner of the image.
- If `cert.image` is missing but `cert.logo` is set: show the logo
  centered on a neutral background in that same header area.
- If neither is set: fall back to today's plain text header (title only,
  no image area) — no card breaks for not-yet-illustrated entries.
- Clicking the image (or the existing "Voir certificat" link) opens
  `cert.certificate_url` in a new tab — no new internal detail page.

### 4. Data fixes (existing entries)

- `coursera-supervised-ml`: fix `date` (was 2024-08-20, actually
  August 2025 per the real Coursera record) → `2025-08-01`. Replace the
  fake `credential_id`/`verify_url` with the real share link as
  `certificate_url`: `https://coursera.org/share/89c425ea1336cdb3d700ca7fd82c353b`.
  Add `image`, `logo`, `order: 1`.
- `deep-learning-specialization`, `machine-learning-stanford`,
  `microsoft-ai-career`: drop the fake `certificate_url: "#"` /
  fabricated `credential_id` fields entirely rather than ship placeholder
  data. No `order` — they keep sorting by date, after the ordered batch.
- `kaggle-ml-courses`: expand `skills` to the 10 actually-completed
  Kaggle micro-courses (Intro to Machine Learning, Pandas, Intermediate
  Machine Learning, Data Visualization, Feature Engineering, Intro to
  Deep Learning, Computer Vision, Time Series, Intro to AI Ethics,
  Machine Learning Explainability). Date unchanged (already correct,
  within the real Aug–Sep 2024 completion window). Add `order: 6`.
- `src/app/[locale]/certifications/page.tsx`: fix the broken "Coursera"
  stat — currently `c.provider === 'Coursera'` never matches because
  every provider string is a compound like `"Coursera - Stanford
  University (Andrew Ng)"`. Change to `c.provider.includes('Coursera')`.

### 5. New entries (both `fr` and `en`)

- `coursera-advanced-learning-algorithms` — Advanced Learning Algorithms,
  DeepLearning.AI · Stanford, `date: 2026-07-01`, `certificate_url:
  https://coursera.org/share/7bf570d757b36a6e87c4791e7bf1bf34`, `order: 2`.
- `coursera-unsupervised-learning` — Unsupervised Learning, Recommenders,
  Reinforcement Learning, DeepLearning.AI · Stanford, `date: 2026-08-01`,
  `certificate_url: https://coursera.org/share/9d68d8de3c813590680b7beca99453b8`,
  `order: 3`.
- `machine-learning-specialization` — Machine Learning Specialization
  (all 3 courses above), DeepLearning.AI · Stanford, `date: 2026-08-05`,
  `certificate_url: https://coursera.org/share/25309f2c5b7fb50174acbc403a192f4f`,
  `order: 4`.
- `ibm-skillsbuild-ai-fundamentals` — Artificial Intelligence
  Fundamentals, IBM SkillsBuild, `date: 2025-07-22`, `certificate_url:
  https://www.credly.com/badges/387df920-e8da-44fb-bfe2-07a71afa148f`,
  `order: 5`. No `image` (no screenshot supplied) — renders via the
  logo-only fallback from section 3.

All four Coursera entries use `logo: /images/certifications/logos/cousera.png`
(the file the user already uploaded — filename kept as-is, including its
typo, to match what's actually on disk).

### 6. Images

User is uploading these directly into the repo (some already present at
spec time):
- `public/images/certifications/{slug}.png` per entry with a screenshot
  (4 Coursera entries already uploaded; Kaggle and IBM SkillsBuild
  pending, degrade gracefully via section 3 until added)
- `public/images/certifications/logos/` — `cousera.png`, `IBM-logo.png`,
  `Microsoft.png`, `Stanford-logo-circular.jpg` already present; `kaggle.png`
  and `deeplearning-ai.png` not yet supplied (not blocking — no current
  entry requires them: Coursera batch uses the Coursera logo, Kaggle has
  no logo yet and falls back to its existing icon emoji header).

## Out of scope (explicitly deferred, not blocking today's launch)

- "Zindi" certification mentioned early in the conversation — no details
  were ultimately provided; not added. Can be brainstormed separately.
- New logo files not yet supplied (Kaggle, DeepLearning.AI, Stanford
  rectangular variant) — the fallback chain in section 3 covers this.
- No new `/certifications/[slug]` detail page — clicking still goes
  straight to the external certificate link, per the user's explicit
  choice earlier in this conversation.

## Testing

Manual only (no automated test suite in this project): run the dev
server, view `/fr/certifications` and `/en/certifications`, confirm the
6 reordered/new entries appear in the right order with images+logos
where supplied and a clean fallback where not, confirm the Coursera stat
count is now non-zero, confirm no `#` links or fabricated IDs remain
anywhere on the page.
