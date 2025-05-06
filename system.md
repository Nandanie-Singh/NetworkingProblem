## Problem
Teams usually struggle to keep track of each other's availability, leading to missed deadlines or delays in communication.

## Solution
We created a simple web-based status board using Cloudflare Pages, Workers, and D1. Team members can post their status (Online, Busy, Offline) and see a live feed of everyone's current availability. The app is accessible via a shared public URL.

## How It Works
- **Frontend**: Static site hosted on Cloudflare Pages (HTML/CSS/JS).
- **Backend**: Cloudflare Worker at `/api/status` handles GET (fetch statuses) and POST (update a status).
- **Database**: Cloudflare D1 stores team member names and statuses. Each name is a unique row; updates overwrite the previous entry.


