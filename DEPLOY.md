# Publishing to Vercel (free)

Your portfolio is configured to deploy to Vercel as a free static site.
Follow these steps once — after that, every future change auto-deploys.

---

## Step 1 — Push your project to GitHub

If you haven't already, create a GitHub repo and push the code.

```bash
cd portfolio-app
git init
git add .
git commit -m "Initial portfolio"
git branch -M main

# Create an empty repo on github.com first (don't add any files), then:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

---

## Step 2 — Deploy to Vercel (2 minutes)

1. Go to **https://vercel.com** and sign in with GitHub (free).
2. Click **"Add New → Project"**.
3. Find your repo in the list and click **"Import"**.
4. Vercel auto-detects Vite. **Do not change any settings.** Click **"Deploy"**.
5. Wait ~60 seconds. You'll get a live URL like:
   `https://adam-funk-portfolio.vercel.app`

That's it. Copy that link into LinkedIn, X, Instagram, and your resume.

---

## Step 3 (optional) — Customize the URL

1. In your Vercel dashboard, open your project → **Settings → Domains**.
2. Change the subdomain (e.g., `adamfunk.vercel.app`) if available.
3. Or add a custom domain you own (e.g., `adamfunk.com`) and follow Vercel's DNS steps.

---

## Future updates

Any time you want to change something:

```bash
git add .
git commit -m "describe your change"
git push
```

Vercel automatically rebuilds and redeploys the live site in ~60 seconds.

---

## Editing your content locally

Edit mode is **disabled on the live site** — visitors can never see the editor,
even if they try `?edit`. To edit content yourself:

```bash
npm run dev
```

Then open the URL in the terminal with `?edit` at the end, for example:
`http://localhost:5173/?edit`

Your saved changes persist in your own browser across sessions.
If you want those edits to appear on the live site for everyone, update the
values directly in `src/data/profile.js`, then `git push`.

---

## Sharing the link

**LinkedIn post idea:**
> Excited to share something I built from scratch with AI — an interactive 3D
> resume you can actually walk through. Every building represents a chapter of
> my career. Take a walk: https://adam-funk-portfolio.vercel.app

**X / Instagram:** Same link.

**Resume:** Add a line under your contact info, e.g.:
> Interactive Portfolio · adamfunk.vercel.app
