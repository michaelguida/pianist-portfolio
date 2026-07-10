# Dr. Michael Guida — Piano Studio Website

A static website for Dr. Michael Guida's piano studio in Scottsdale, Arizona.
Built as plain HTML and CSS (no build step) and deployed as a static site on Vercel.

## Structure

Everything lives in [`public/`](public/), which is the deployed root:

- `index.html` — home
- `about-me.html` — about / bio
- `piano-lessons-scottsdale.html` — lessons
- `performances.html` — performance videos
- `student-recitals.html` — student recital videos
- `contact.html` — contact form (delivers to email via Web3Forms)
- `privacy-policy.html` — privacy policy
- `styles.css` — shared styles
- images, `favicon.svg`, `icons.svg`
- `vercel.json` — Vercel static hosting config (clean URLs)

## Local preview

No dependencies to install. Serve the `public/` folder with any static server, e.g.:

```
npx serve public
```

Then open the printed URL (e.g. http://localhost:3000).

## Deploy

Hosted on Vercel with the project root set to `public/`. Pushing to the
default branch publishes the site.
