// api/proxy.js  ← VERSION QUI MARCHE À 100%

const GAS_URL = "https://script.google.com/macros/s/AKfycbzt-NkwJindI7FzYzGygO_eXk6GUKt5MCdD-NiN1eUypAIyQKrOx65VjaqKNPDiNwzxZQ/exec";

module.exports = async (req, res) => {
  // Gestion du preflight OPTIONS
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  const url = new URL(GAS_URL);
  url.search = req.url.split("?")[1] || "";  // garde les query strings (?clientId=TUTU)

  const response = await fetch(url.toString(), {
    method: req.method,
    headers: { "Content-Type": "application/json" },
    body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
  });

  const text = await response.text();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(response.status).send(text);
};
