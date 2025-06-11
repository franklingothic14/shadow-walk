import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

app.get('/api/shaded-route', async (req, res) => {
  const { from, to, time } = req.query;
  const apiKey = process.env.SHADEMAP_API_KEY;
  try {
    const response = await fetch(`https://api.shademap.app/v1/route?from=${from}&to=${to}&time=${time}`, {
      headers: { Authorization: apiKey }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'API error', details: err.toString() });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
