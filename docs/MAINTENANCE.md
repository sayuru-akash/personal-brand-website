# Maintenance Notes

## Content and Interaction Changes

- Edit approved copy in `data/portfolio.ts`. The ordered `heroTools` list controls the small homepage tool row; `skillCategories` independently controls the expandable groups and physics toolbox.
- Keep new preview terms and their destinations in `data/hero-previews.ts`. Verify organisation facts and logos against official sources. Source URLs are stored alongside the preview copy.
- The introduction renderer inserts context buttons without changing `heroContent.subtitle`. Its regression test checks the resulting text exactly.
- Preview cards support hover, focus, click/tap, Escape, and outside dismissal through Floating UI. Test the pointer path from a word into its card and the viewport edges after changes.
- Physics controls must remain usable after bodies settle. Explicitly wake sleeping bodies when applying direct interaction. Keep the static reduced-motion fallback and offscreen/hidden-page suspension.
- The photo archive uses a native dialog. Preserve Escape dismissal, focus return, and scroll restoration.

## Images and Identity

Personal image paths and dimensions are maintained in `data/portfolio.ts`. Keep descriptive alt text and stable aspect ratios when replacing them.

`next.config.ts` disables provider-side image transformation. Optimize source files before committing them. The `/images/` response header marks assets immutable for one year, so use a new filename for every changed image and update its references.

The browser icon set is referenced by `app/layout.tsx` and `public/manifest.json`:

| File | Use |
| --- | --- |
| `public/icon-32.png` | Browser favicon and shortcut |
| `public/icon-180.png` | Apple touch icon |
| `public/icon-192.png` | Larger favicon and web app icon |
| `public/icon-512.png` | Large web app icon |

README screenshots live under `docs/images/`. Refresh them from a local production build after visible design changes. Keep the browser state representative, exclude private developer tools, and optimize the images before committing.

## Contact Delivery

The contact form calls `POST /api/contact`:

1. The route checks configuration, content type, request size, and the Zod schema.
2. A honeypot field rejects automated submissions without revealing the check.
3. Cloudflare verifies the Turnstile token. The response hostname and action must match the server's expected values.
4. Resend delivers HTML and plain-text messages with a reply-to address and an idempotency key based on the submission UUID.
5. The client shows success only after an accepted API response and resets the security token after each attempt.

Missing server configuration returns `503`; invalid input returns `400` or `422`; failed security verification returns `403`; delivery errors return `502`. Do not bypass validation or hostname checks to make a test submission pass.

For delivery verification, use a real authorized test submission and check the received message or provider evidence. A passing build alone does not verify Resend DNS, Turnstile host configuration, or inbox delivery.

## Analytics

The root layout loads GA4 through `@next/third-parties` for production builds. Development mode does not load the tag. A local `npm run start` preview uses production behavior, including analytics unless it was disabled before the build.

- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` selects the public measurement ID.
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_DISABLED=true` excludes collection from a production build.
- The GA4 property must have Enhanced Measurement browser-history page changes enabled for client-side navigation.
- `Analytics.tsx` reports Web Vitals and the `generate_lead` event after successful contact submissions.
- Keep form values and personal message content out of custom event payloads.

Browser blockers can suppress the Google tag. Inspect the actual tag and collection requests when verifying; queued events and received Analytics reports are different evidence.

## Release Checks

```bash
npm ci
npm run lint
npm run test -- --runInBand
npm run build
npm run start -- -p 3001
```

Check Home, About, Contact, Privacy Policy, and the not-found experience at desktop and mobile widths. Verify content wrapping, local image loading, focus visibility, preview bounds, gallery dismissal, and the physics tray. Test reduced motion separately.

Before deploying:

- Preserve canonical URLs, metadata, sitemap entries, Open Graph images, and JSON-LD unless a requested content change requires an update.
- Configure the sender's verified domain, Turnstile hostnames, and server secrets on the correct hosting project.
- Use hosting that supports the Node.js contact route. A static-only export is insufficient.
- Run `npm audit` separately from lint and tests. Passing functional checks does not establish that the dependency tree has no security advisories.
- Verify the deployed origin and public domain independently after release. Do not assume a successful local build proves deployment or CDN freshness.

## Common Problems

| Symptom | Check |
| --- | --- |
| Contact form remains unavailable | Public widget key, hostname configuration, security token, and browser network errors |
| Contact route returns `503` | Required Resend and Turnstile server environment variables |
| Contact route returns `403` | Token expiry, expected action, widget configuration, and allowed hostname |
| Contact route returns `502` | Resend credential, verified sending domain, and provider response |
| A changed image still looks old | Immutable asset filename and deployment version |
| README screenshots look outdated | Rebuild locally and recapture the current UI |
| Analytics appears during local testing | Production build mode and the build-time analytics-disable flag |
| Port is already in use | Choose another port; avoid stopping an unrelated server |
