export default {
  async fetch(request, env, ctx) {
    const { url } = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'GET' && path === '/api/status') {
      const { results } = await env.DB.prepare('SELECT name, status FROM team_status').all();
      return new Response.json(results, { headers: corsHeaders });
    }

    if (request.method === 'POST' && path === '/api/status') {
      try {
        const { name, status } = await request.json();
        if (!name || !status) {
          return new Response('Invalid input', { status: 400 , headers: corsHeaders });
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

    // IMPORTANT: Let Wrangler serve static files (don't hijack everything)
    return new Response(request, { status: 404 });
  }
}