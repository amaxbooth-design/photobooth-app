// api/proxy.js
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzB79ndhRVbHwlYqzxRHERaIpNuPKOUZVIAg8nGazPu1U5qIsmJ3rDzsfdyi0FuKT2_tw/exec';

export default async function handler(req, res) {
  const url = new URL(APPS_SCRIPT_URL);
  Object.entries(req.query || {}).forEach(([k, v]) => url.searchParams.append(k, v));

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  const response = await fetch(url, {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
  });

  const text = await response.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { success: false, message: text }; }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(json);
}
