# Ads Launch — Status & Action Plan

**Handoff doc.** If you're Claude picking this up on another machine: this is the current state of
Dr. Michael Guida's paid-ads launch and what's left to do. Read this first, then continue from
"WHAT'S LEFT." All IDs/keys below are client-side (already public in `public/*.html`), not secrets.

---

## Who / context

- **Business:** Dr. Michael Guida's Piano Studio — private piano lessons, Scottsdale AZ (McCormick Ranch).
- **Site:** https://www.michaelguidapiano.com — static HTML in `public/`, deployed on Vercel
  (root = `public/`), `master` branch auto-deploys on push.
- **Google Business Profile:** "Dr. Michael Guida's Piano Studio", 9765 N 80th Pl, Scottsdale 85258 (verified).
- **Goal:** grow to ~30–35 students (≈25–30 normal + ~5 "serious"). Normal ≈ $135/wk/student,
  serious ≈ $300/wk/student, 44 wks/yr.
- **Timeline:** leaving Fri for a CA wedding + vacation, back ~Aug 2–3. Wants the serious ad
  **scheduled to auto-start ~Aug 1** (a couple days before returning) so warm applications pool
  up and he isn't fielding leads on vacation.
- **Two offers / two funnels:**
  - **Serious Student** (premium, ~5 spots, by application) → Facebook/Instagram ad → `/the-serious-student`.
    This is what launches during vacation (async application, on-brand to be selective).
  - **Normal students** (all ages & levels, the volume) → Google (GBP + reviews + Search/LSA) →
    `/piano-lessons-scottsdale`. Launches when he's HOME (needs fast response).
- **SoundMusical** = a SEPARATE venture (mass-market online tutorial/course play). Keep it fully
  separate — its own Meta business portfolio, not tied to the studio.

## Style rules (important)

- **No sentence-splitting em dashes** (attribution dashes like "— Name" are fine). Reads as AI otherwise.
- Concise copy. Spell out names (not "UT Austin"). Don't overstep / don't add tacky things unasked.

---

## WHAT'S DONE ✅

### Website / tracking
- **Meta Pixel is LIVE** on `/the-serious-student`. In `public/the-serious-student.html`:
  `window.META_PIXEL_ID = '2644187165976712'`. Fires **PageView** + a **Lead** event on
  application submit (`fbq('track','Lead')`). Verified live via curl.
- Pixel is **NOT yet on other pages** (only the serious page). TODO for the normal-student side + retargeting.

### Meta / Facebook
- **Facebook Page:** "Dr. Michael Guida's Piano Studio" — headshot profile, studio-recital cover
  (Steinway backdrop), bio, 2 posts (welcome + recital), "Call now" button. Ad-ready.
- **Business portfolio:** "Dr. Michael Guida's Piano Studio" (brand-new, separate from
  `soundmusical_official` and `apolloacademyofmusic`).
- **Ad account:** "Guida Piano Studio Ads", **ID 1327793202877511**, USD, America/Phoenix,
  payment method added, owned by the studio portfolio.
- **Pixel asset:** "Guida Piano Studio Pixel", **ID 2644187165976712**, owned by the portfolio,
  connected to the ad account.

### Lead capture (all tested & confirmed working)
Every submission hits THREE channels: HubSpot + Web3Forms email + pixel Lead event.
- **HubSpot** (portal **246810762**), split into two forms:
  - Serious page → **"Serious Student Applications"**, GUID `c51174fd-6737-4881-80e0-3f0e46373d37`.
    Message body = Goals / Dream pieces / Experience / Practice time.
  - Contact page → **"Piano Lesson Inquiries"** (formerly "Piano Leads"),
    GUID `7475ad11-3054-4d93-b871-6c664fa5b3eb`. Message = their message + Interest + Experience.
  - HubSpot notification emails arrive labeled by form name — treat these as the PRIMARY new-lead alert.
- **Web3Forms** (access key `3f8c02ae-91f2-4e5f-9f67-192ea2126f3a`): drives the on-page success
  message + a backup email. NOTE: it silently spam-filters *repeated identical test* submissions
  (returns success but no email). Real, unique leads come through fine — confirmed.

### Copy
- Ad copy written & saved in **`marketing/ad-copy.md`**: serious (warm + short) and normal
  (all-ages Facebook + Google Search). Warm serious version is the approved primary.

---

## WHAT'S LEFT

### 🔴 CRITICAL — build & schedule the serious ad (only thing blocking launch)
Walk Michael through Meta Ads Manager (Guida Piano Studio Ads account). Recommended setup:
- **Objective:** Leads, conversion location = **Website**, optimize for the **Lead** pixel event.
  (New pixel has no history — if delivery is starved, fall back to optimizing for Landing Page
  Views / Traffic to start, then switch to Lead once data builds.)
- **Pixel/event:** Guida Piano Studio Pixel (2644187165976712), event = **Lead**.
- **Audience:** Scottsdale, Paradise Valley, Arcadia, North Scottsdale + nearby, ~10–15 mi radius.
  Age ~30–60. Broad works for local high-ticket (optionally layer interests: classical music, piano).
- **Budget:** start **$15–20/day**.
- **Schedule:** **auto-start ~Aug 1** (before he's home ~Aug 2–3). No hard end; review when back.
- **Placements:** Advantage+ (automatic) is fine.
- **Creative:** image = `masterclass.webp` or a clean portrait (4:5 or 1:1), minimal on-image text.
  Swap the 60-sec video in later as a 2nd creative in the same ad set (Meta optimizes between them).
- **Copy:** from `marketing/ad-copy.md` → "Serious Student — WARM version":
  headline "Finally Learn Piano, the Right Way", CTA **Apply Now**,
  URL `https://www.michaelguidapiano.com/the-serious-student`.
- **Do NOT** A/B test copy at this budget/volume — one strong ad, let the pixel data guide. See ad-copy.md.

### 🟡 This week (mostly Michael's action)
- **Send review-request texts** to 10–15 past/current students (free, highest-ROI). Draft texts are
  in the conversation / can be regenerated; needs his Google review link (GBP → "Ask for reviews").
- **Film the 60-sec video** for the serious ad (optional for launch). Claude still owes him the
  **shot script** — write it: ~20–30s of him playing beautifully + a talking-head line about the
  white-glove / daily-access promise; no teleprompter needed. Shoot in good light.
- **Applicant autoresponder** — decide/implement an instant "got your application, I'll be in touch"
  so vacation applicants don't feel ghosted. Options: HubSpot workflow (needs paid tier) or
  form-level (free). On-page success message already sets some expectation.

### 🟢 Post-vacation
- **Google Business Profile optimization + reviews** → then the **normal-student engine**
  (Google Search / Local Services Ads). This is where most of the 25–30 normal students come from.
- **Add the pixel site-wide** (currently serious page only) for retargeting + the normal-student ad,
  then build the **normal-student campaign** (copy ready in ad-copy.md; landing `/piano-lessons-scottsdale`).
- **CAPI (Conversions API) upgrade** — server-side event for the Lead. Site is static on Vercel, so
  either a small Vercel serverless function that mirrors the form submit to Meta's CAPI, OR explore
  HubSpot's Meta Ads integration as a no-code path.
- **HubSpot polish (optional):** a lead-status pipeline (New → Interview → Decision); split the four
  serious-application answers into their own contact properties instead of one "message" blob.

---

## Repo notes for the next Claude
- Static site; no build step. Edit `public/*.html` + `public/styles.css` directly.
- Deploy = commit to `master` + push (Vercel auto-deploys; verify live with
  `curl -s https://www.michaelguidapiano.com/<page>`). Only push when Michael says.
- Commit messages end with the Co-Authored-By trailer.
- Marketing reference lives in `marketing/` (outside `public/`, never deployed): `ad-copy.md`, this file.
