# Team Status Board
A real-time team check-in dashboard powered by Cloudflare Pages + Workers + D1.

## 🛠 How to Run Locally
1. Clone the repo
2. Install Wrangler if not installed:
   ```bash
   npm install -g wrangler
   ```
3. Link your Cloudflare account and create a D1 database:
   ```bash
   wrangler login
   wrangler d1 create team_status_db
   ```
4. Add your `database_id` to `wrangler.toml`
5. Execute the schema:
   ```bash
   wrangler d1 execute team_status_db --file=schema.sql
   ```
6. Run the Worker + Pages locally:
   ```bash
   wrangler dev
   ```

## 🌐 Deployment
```bash
wrangler publish
```