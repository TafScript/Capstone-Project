# Capstone Project: Crypto Watchlist & Notes Dashboard

- Full-stack web app to track cryptocurrencies and take notes
- Features:
  - Watchlist
    - Add crypto coins to watchlist
    - View live prices and 24h change
    - Edit targets and notes
    - Delete items
  - Notes
    - Add, edit, and delete notes
    - Organize by title and content
  - Top 50 Coins Dashboard
    - Live data for top 50 coins (price, market cap, 24h change)
    - Scrollable dashboard for easy browsing.

- Technologies
  - Frontend: React, Vite, CSS
  - Backend: Node.js, Express
  - Database: MongoDB
  - API: CoinGecko API
  - Hosting: Render (backend), Netlify (frontend)

- Setup
  - Clone repo: `git clone https://github.com/TafScript/Capstone-Project.git`
  - Backend:
    - `cd backend`
    - `npm install`
    - Create `.env` with `MONGO_URI` and `PORT`
    - `npm run start`
  - Frontend:
    - `cd ../frontend`
    - `npm install`
    - `npm run dev`
  - Open browser at `http://localhost:5173`
  - Live Deployment site: https://capstonecrypto.netlify.app/

- Future Improvements
  - Add user authentication
  - Price alerts
  - Mobile responsiveness and better styling


