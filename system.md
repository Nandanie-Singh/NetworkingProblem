## Problem
Remote teams often struggle to keep track of each other's availability in real time. Without a shared dashboard, it's hard to know who's online, busy, or offline — leading to missed handoffs, awkward pings, or delays.

## Solution
We created a simple web-based status board using Cloudflare Pages, Workers, and D1. Team members can post their status (Online, Busy, Offline) and see a live feed of everyone's current availability. The app is accessible via a shared public URL.

## How It Works
- **Frontend**: Static site hosted on Cloudflare Pages (HTML/CSS/JS).
- **Backend**: Cloudflare Worker at `/api/status` handles GET (fetch statuses) and POST (update a status).
- **Database**: Cloudflare D1 stores team member names and statuses. Each name is a unique row; updates overwrite the previous entry.

## Tech Stack
- Cloudflare Pages for UI
- Cloudflare Worker (API)
- Cloudflare D1 (SQLite-based persistence)

## API
### POST /api/status
Update a status
```json
{
  "name": "Alice",
  "status": "online"
}
```

### GET /api/status
Returns all current statuses
```json
[
  { "name": "Alice", "status": "online" },
  { "name": "Bob", "status": "offline" }
]
```

## Deployment
- Worker and Pages deployed via Wrangler
- Schema migrated via `wrangler d1 execute`

## Bonus Features
- Real-time refresh every 10 seconds on the frontend
- Responsive UI
