// API Proxy pour Google Apps Script - Contourne CORS
export default async function handler(req, res) {
  // Votre URL Google Apps Script
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxDf3ZGcA1mHHHmA47h4-PD-mmNZsfXHekUrmB_cza9J5GRlL8REdVnutPR-Jwq6RqT/exec';
  
  // Permettre CORS depuis votre domaine
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  
  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Construire l'URL avec tous les paramètres de la requête
    const params = new URLSearchParams(req.query);
    const url = `${SCRIPT_URL}?${params.toString()}`;
    
    console.log('Calling Google Apps Script:', url);
    
    // Faire la requête vers Google Apps Script
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Récupérer la réponse
    const data = await response.json();
    
    console.log('Response from Google Apps Script:', data);
    
    // Renvoyer la réponse au client
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error in proxy:', error);
    return res.status(500).json({ 
      success: false, 
      message: `Erreur proxy: ${error.message}` 
    });
  }
}
