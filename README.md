# Hervé Nkurikiyimfura — portfolio

This portfolio is made React and Next.js App Router. It has five main pages, Nine project case studies and their URLs, role/technology filters, responsive navigation, light/dark themes, contact links, Google Analytics, portrait, favicons, manifest, and four resume PDFs. 

## Run locally

Use Node.js 22+ (Node 24 LTS recommended). Dependencies are pinned in `package-lock.json`.

```sh
cd InNext
npm ci
npm run dev
```

Open http://localhost:3000. From the `Portfolio` directory, you can also run `npm --prefix InNext run dev`.

## SEO for every page

All 14 content pages are prerendered into full HTML, including every `/projects/[slug]` case study. Search engines and visitors without JavaScript receive the content, headings, and real navigation links immediately. React hydrates interactive filters and theme controls afterward.

Each content page has a unique title and description, absolute canonical URL, index/follow directives, Open Graph and Twitter metadata, and WebPage structured data. Global Person and WebSite JSON-LD identify the portfolio and its author. Inner pages add breadcrumbs, case studies describe their CreativeWork, and the projects index includes an ItemList. The sitemap derives from the project data automatically, and `robots.txt` points to it. Unknown pages and project slugs return HTTP 404 with `noindex`.

Existing routes are preserved: `/`, `/projects`, `/about`, `/resume`, `/contact`, and all nine `/projects/<slug>` URLs. Query strings do not change canonical URLs.

Copy `.env.example` to `.env.local` to change configuration:

```dotenv
NEXT_PUBLIC_SITE_URL=https://herve.dev
NEXT_PUBLIC_GTAG_ID=G-Z4420RG7TZ
```

`NEXT_PUBLIC_SITE_URL` must be the public HTTP(S) origin, without a subpath, query, or fragment. Set the correct domain **before building** and rebuild after changes. Set `NEXT_PUBLIC_GTAG_ID=` to disable analytics. The existing property tracks the first page and client-side navigation. If Google Analytics enhanced measurement also tracks browser history changes, disable that automatic page-change setting for this property to avoid counting the same navigation twice.

After deploying, submit `https://herve.dev/sitemap.xml` in Google Search Console and Bing Webmaster Tools. These technical SEO features support discovery and indexing; search engines decide when to index pages and where to rank them.

## Build and verify

For a Node server:

```sh
npm run build
npm run typecheck
npm run test:seo
npm start
```

The SEO test launches and stops an isolated production server. It checks all 14 routes, unique metadata, canonical and social URLs, valid JSON-LD, rendered case-study sections, crawlable links, filters, sitemap, robots, every public asset, the resume, query-independent canonicals, and real HTTP 404 responses.

For static hosting:

```sh
npm run generate
npm run typecheck
npm run test:seo:static
```

This writes deployable HTML, assets, and Next.js navigation files to **`out/`**. The static SEO test checks those files, including `404.html`, without starting a server. `build` and `generate` share Next.js's `.next/` build cache; run `npm run build` again before `npm start` or `npm run test:seo` after a static export. Type checking works directly after `npm ci`; builds also run Next.js's generated route type checks.

## Deploy to your VPS

### Static files

Run `npm run generate` and upload the **entire contents of `out/`** to your web root. Include `_next/`, `.txt` files, and route segment directories: Next.js uses them for client navigation. Configure Nginx using [`deploy/nginx-static.conf`](deploy/nginx-static.conf). It serves each route's HTML and returns the exported 404 page with HTTP 404 for missing URLs.

The included [GitHub Actions workflow](.github/workflows/deploy.yml) performs a manual static deployment with type and SEO checks first. If `InNext` is its own repository, the workflow is already in the correct location. If you track all of `Portfolio` in one repository, copy the workflow to that repository's root `.github/workflows/`; it detects the `InNext` subdirectory automatically. GitHub does not run workflows nested inside a project folder.

Configure repository secrets `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PATH`, and `VPS_KNOWN_HOSTS` (the server's verified SSH known-hosts entry). Optional repository variables `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GTAG_ID` override the workflow's preserved production defaults. To disable analytics in this workflow, set its `NEXT_PUBLIC_GTAG_ID` environment value to an empty string. Start it from the Actions tab when ready. This migration does not run that workflow or change the existing live deployment.

The deploy uploads files without deleting existing server files. When replacing an older build, use a clean release directory and point the web root at that release so removed routes do not remain available.

### Node server or managed Next.js hosting

Deploy the `InNext` project and run `npm ci`, `npm run build`, then `npm start`. On a VPS, use a process manager and reverse-proxy the public domain to the Node server. To bind it locally:

```sh
npm start -- --hostname 127.0.0.1 --port 3000
```

For managed Next.js hosting, choose `InNext` as the project root when importing the parent repository and set the public environment variables before building.

## Source map

- `src/app/`: server-rendered pages, global layout, sitemap, robots, and error pages.
- `src/components/`: React navigation, footer, project cards, filters, theme controls, analytics, and JSON-LD.
- `src/data/projects.ts` / `src/types/project.ts`: all original typed case-study content.
- `src/data/site.ts`: identity and contact information.
- `src/data/profile.ts`: preserved experience, skills, and awards from the Nuxt source.
- `src/lib/seo.ts`: titles, descriptions, and reusable Next.js metadata.
- `src/lib/site-url.ts`: validated public origin and absolute URL helpers.
- `src/app/globals.css`: migrated design tokens, themes, component styles, and responsive rules.
- `public/`: every original public asset and resume PDF.
- `scripts/`: static build wrapper and production/static SEO verification.

To add a project, add an entry to `src/data/projects.ts`. Next.js prerenders its route and adds it to the sitemap on the next build. Update the project list in `scripts/verify-seo.mjs` and the projects-page description when changing the portfolio inventory.

Next.js references: [App Router metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [static exports](https://nextjs.org/docs/app/guides/static-exports), and [sitemaps](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).
