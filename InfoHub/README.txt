InfoHub (Full Stack) - Normal CSS
=================================

This package contains a full-stack project with:
- server/ (Node.js + Express API)
- client/ (Vite + React SPA with normal CSS)

Quick start:

1) Server
   cd server
   npm install
   npm start

2) Client
   cd client
   npm install
   npm run dev

The Vite dev server proxies /api to http://localhost:3001 per vite.config.js.

Endpoints:
- GET /api/weather?city=CityName
- GET /api/currency?amount=100
- GET /api/quote

Notes:
- Weather uses Open-Meteo geocoding + forecast (no API key).
- Currency uses exchangerate.host (no API key).
- Quotes use Quotable API (no key) with local fallback.
