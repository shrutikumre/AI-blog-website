# Signal — AI & technology journal

Signal is a responsive editorial-style React + TypeScript website about AI and emerging technology. It includes a real GNews integration when configured, as well as a clearly labeled sample-story experience that works without an API key.

## Run locally

1. Install Node.js 20 or later.
2. From this directory, install dependencies and start Vite:

   ```sh
   npm install
   npm run dev
   ```

3. Open the local URL printed by Vite (normally `http://localhost:5173`).

## Optional live news

Copy `.env.example` to `.env.local` and add a GNews API key:

```env
VITE_GNEWS_API_KEY=your_gnews_api_key
```

Restart Vite after changing environment variables. When a key is available, Signal requests GNews technology headlines and links every result to its publisher. Search also queries GNews. API requests run from the browser, so a `VITE_` key is visible to visitors; for a production deployment, proxy requests through a server-side endpoint and protect the key. If the key is missing or the API request fails, the site clearly marks its included stories as editorial preview samples rather than live news.

## Included features

- Responsive home, latest, trending, category, story, search, about, contact, and saved-story pages.
- Theme preference and bookmarks persisted in browser local storage.
- Topic filters, pagination, search, story sharing/copy-link, contact and newsletter demo forms.
- Accessible navigation, semantic page structure, reduced-motion support, page transitions, and reading progress indicator.
- SEO title and description metadata.

Newsletter signups and contact messages are saved only in the current browser for this demo. Connect a form service or backend to receive them centrally. Sample stories are illustrative editorial previews; their dated labels are not a claim of real-time reporting.

## Production build

```sh
npm run lint
npm run build
npm run preview
```
