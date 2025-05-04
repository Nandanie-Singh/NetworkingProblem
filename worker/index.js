let statusStore = new Map();

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/api/status') {
      const result = Array.from(statusStore.entries()).map(([name, status]) => ({ name, status }));
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (request.method === 'POST' && url.pathname === '/api/status') {
      const { name, status } = await request.json();
      if (!name || !status) {
        return new Response('Invalid input', { status: 400 });
      }
      statusStore.set(name, status);
      return new Response('OK');
    }

    return new Response('Not Found', { status: 404 });
  }
}
