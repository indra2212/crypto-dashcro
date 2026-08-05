export default async function handler(req, res) {
  const { symbol = 'BTCUSDT' } = req.query;
  const targetUrl = `https://fapi.binance.com/fapi/v1/globalLongShortAccountRatio?symbol=${symbol}&period=5m&limit=1`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch from Binance API' });
  }
}
