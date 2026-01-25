/**
 * Прокси-сервер для Anthropic API
 * Использует fetch для лучшей обработки больших запросов
 */

const http = require('http');

const PORT = 3001;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, anthropic-version');

  // Preflight request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Only handle POST to /api/analyze
  if (req.method !== 'POST' || !req.url.startsWith('/api/analyze')) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  try {
    // Read request body as buffer for proper handling
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const bodyBuffer = Buffer.concat(chunks);
    const bodyString = bodyBuffer.toString('utf8');

    const data = JSON.parse(bodyString);
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'API key required' }));
      return;
    }

    const requestBody = JSON.stringify(data);
    const bodySize = Buffer.byteLength(requestBody, 'utf8');

    console.log(`[${new Date().toISOString()}] Proxying request to Anthropic API...`);
    console.log(`[${new Date().toISOString()}] Request body size: ${(bodySize / 1024 / 1024).toFixed(2)} MB`);

    // Use native fetch (Node 18+)
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: requestBody
    });

    console.log(`[${new Date().toISOString()}] Response status: ${response.status}`);

    const responseText = await response.text();

    console.log(`[${new Date().toISOString()}] Response size: ${responseText.length} bytes`);

    res.writeHead(response.status, { 'Content-Type': 'application/json' });
    res.end(responseText);

  } catch (error) {
    console.error('Server error:', error.message);
    console.error('Full error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
});

// Increase server timeout for large PDF processing
server.timeout = 300000; // 5 minutes
server.keepAliveTimeout = 120000;

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   Framehouse API Proxy Server                              ║
║                                                            ║
║   Сервер запущен: http://localhost:${PORT}                  ║
║   Endpoint: POST /api/analyze                              ║
║                                                            ║
║   Для остановки нажмите Ctrl+C                            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
