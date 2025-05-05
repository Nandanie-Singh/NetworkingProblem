export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle API routes only
    if (request.method === 'GET' && url.pathname === '/api/status') {
      const { results } = await env.DB.prepare('SELECT name, status FROM team_status').all();
      return Response.json(results);
    }

    if (request.method === 'POST' && url.pathname === '/api/status') {
      try {
        const { name, status } = await request.json();
        if (!name || !status) {
          return new Response('Invalid input', { status: 400 });
        }

        await env.DB.prepare(
          `INSERT INTO team_status (name, status)
           VALUES (?1, ?2)
           ON CONFLICT(name) DO UPDATE SET status=excluded.status`
        ).bind(name, status).run();

        return new Response('OK');
      } catch {
        return new Response('Error processing request', { status: 500 });
      }
    }

    // 👇 Allow Wrangler/Pages to serve static assets
    return env.ASSETS.fetch(request);
  }
}




