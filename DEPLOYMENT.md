# Deploying this Next.js app on cPanel

This project is a Next.js (App Router) application. These instructions help you deploy it on a typical cPanel host using the Node.js Application Manager.

If your hosting provider doesn’t offer the Node.js Application Manager, see the "Alternative: Static Export (limited)" section.

## Prerequisites
- cPanel access with Node.js Application Manager (sometimes called Application Manager or Node.js Selector).
- Node.js 18+ available on your hosting (Node 18–20 recommended).
- A domain or subdomain you can map to the app.

## What’s included in this repo for cPanel
- server.js — a small startup file that cPanel can run directly.
- package.json — includes useful scripts, including `postinstall` that builds the app after dependencies install.

You don’t need to change code for a basic deployment. If you plan to serve from a subpath (e.g., example.com/app), see the notes in the FAQ.

## Step-by-step: Deploy with Node.js Application Manager

1) Upload project files
- Zip your project locally (excluding node_modules) and upload it to your hosting account (e.g., into ~/apps/reporter or ~/project/Reporter).
- Extract the archive so that package.json is in the target directory.

2) Open cPanel → Application Manager (Node.js)
- Click "Create Application".
- Application mode: Production
- Node.js version: Choose the latest available that is compatible with Next.js (18+ recommended).
- Application root: The folder where package.json is located (e.g., /home/USER/apps/reporter)
- Application URL:
  - If you already created a subdomain (e.g., reporter.example.com), select it.
  - Or map a domain/subdomain later via Domains → Subdomains and then edit the application to attach it.
- Application startup file: server.js
- Environment variables (optional, but recommended):
  - NODE_ENV=production
  - HOST=0.0.0.0 (ensures binding to all interfaces)
  - PORT=3000 (or leave empty; cPanel usually sets this automatically)
  - Any custom runtime envs you need (NEXT_PUBLIC_* etc.)

3) Install dependencies and build
- In the Node.js Application Manager, click "Run NPM Install".
- This will run `npm install` and, thanks to the `postinstall` script, automatically run `next build`.
- If your host doesn’t execute `postinstall`, manually run `npm run build` from the app’s terminal.

4) Start/Restart the app
- Click "Restart" in the Application Manager.
- The app will boot using server.js and listen on the configured PORT.
- cPanel will proxy your domain/subdomain to the app automatically.

5) Test
- Visit your domain/subdomain. You should see the app running in production mode.

## Managing environment variables
- In Application Manager, you can add env vars like NEXT_PUBLIC_API_BASE_URL.
- After changing environment variables, click "Restart" to apply them.

## Logs and troubleshooting
- If the app doesn’t start, open the Application Manager logs panel.
- Common issues:
  - Memory limit during build: Ask your host to temporarily raise memory/CPU limits, or build locally and upload the `.next` folder (then skip `next build` on the server).
  - Wrong startup file name/path: Ensure it’s exactly `server.js` in the app root.
  - Wrong Node version: Use Node 18+.
  - Missing environment variables that your code expects.

## Deploy updates
- Upload only changed files, or use git pull if your host allows it.
- Click "Run NPM Install" if dependencies changed.
- Click "Restart" to pick up code changes (and re-build if needed).

## Alternative: Static Export (limited)
If your app doesn’t rely on server features and can be fully pre-rendered, you can host it as static files:
- Add a static export script (e.g., `next build && next export`).
- The output in `out/` can be uploaded under public_html/.
Note: Many features (dynamic routes without pre-render, API routes, server actions) won’t work with static export. This repository is configured for a standard Node deployment, not static export.

## Serving under a subpath (optional)
If you serve the app from a subpath such as `https://example.com/reporter`, you may need to set `basePath` in next.config.ts:

```
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // basePath: '/reporter', // Uncomment and set your subpath
}

export default nextConfig
```

After changing `basePath`, rebuild the app and restart.

## Local production run (for testing)
- Install dependencies: `npm install`
- Build: `npm run build`
- Start with Next’s server: `npm start` (uses `next start`), or use the cPanel-like server: `npm run serve` (uses `node server.js`).

## FAQ
- Do I need .htaccess rewrites? Usually no, when using cPanel’s Node.js Application Manager — it will proxy requests to the app. .htaccess rules are only needed for custom proxying outside Application Manager.
- Can I set a custom port? The app reads PORT from the environment. cPanel assigns one automatically and proxies traffic to it.
- Where do I place environment variables? In the Application Manager UI for the app.
