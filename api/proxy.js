// api/proxy.js
const GAS_URL = "https://script.google.com/macros/s/AKfycbx8xd2M6i25cNbgHMG7YEZkbeV0WIGjscizxVSkdYS8H_rlapYKjWjAVrFoGo2zG4Q5fA/exec";

module.exports = async function (req, res) {
  const target = GAS_URL + req.url;
  const response = await fetch(target, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    redirect: "follow"
  });

  const data = await response.text();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  res.status(response.status).send(data);
};
