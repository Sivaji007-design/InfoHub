const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Quote list fallback
const QUOTES = [
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "The future depends on what you do today. — Mahatma Gandhi",
  "It always seems impossible until it's done. — Nelson Mandela",
  "Quality is not an act, it is a habit. — Aristotle",
  "Small steps every day."
];

// Geocoding using Open-Meteo (no API key)
async function geocode(city) {
  try {
    const r = await axios.get('https://geocoding-api.open-meteo.com/v1/search', { params: { name: city, count: 1 }});
    return r.data.results && r.data.results[0] ? r.data.results[0] : null;
  } catch (e) { return null; }
}

// /api/weather?city=London
app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'New Delhi';
  try {
    const geo = await geocode(city);
    if (!geo) return res.status(404).json({ error: 'City not found' });
    const { latitude, longitude, name, country } = geo;
    const w = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: { latitude, longitude, current_weather: true, timezone: 'auto' }
    });
    const cw = w.data.current_weather;
    res.json({
      city: name,
      country,
      temperature_c: cw.temperature,
      windspeed: cw.windspeed,
      winddirection: cw.winddirection,
      weathercode: cw.weathercode,
      time: cw.time
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch weather data.' });
  }
});

// /api/currency?amount=100
app.get('/api/currency', async (req, res) => {
  const amount = parseFloat(req.query.amount) || 1;
  try {
    const r = await axios.get('https://api.exchangerate.host/latest', { params: { base: 'INR', symbols: 'USD,EUR' }});
    const rates = r.data.rates || {};
    res.json({
      base: 'INR',
      amount,
      rates: {
        USD: rates.USD ? amount * rates.USD : null,
        EUR: rates.EUR ? amount * rates.EUR : null
      },
      fetched_at: r.data.date || null
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch currency rates.' });
  }
});

// /api/quote
app.get('/api/quote', async (req, res) => {
  // Try Quotable first
  try {
    const r = await axios.get('https://api.quotable.io/random');
    return res.json({ quote: `${r.data.content} — ${r.data.author}` });
  } catch (e) {
    // fallback to local list
    const idx = Math.floor(Math.random() * QUOTES.length);
    return res.json({ quote: QUOTES[idx] });
  }
});

// Serve client in production if exists
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

app.listen(PORT, () => console.log(`InfoHub API running on port ${PORT}`));
