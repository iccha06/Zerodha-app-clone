# 📈 Zerodha Clone — Full-Stack Trading Platform

A full-stack clone of [Zerodha](https://zerodha.com/) — India's largest stock broker — built to replicate its **marketing website**, **trading dashboard**, and **admin analytics panel**. The project covers end-to-end product development: a public-facing landing site, a JWT-authenticated trading app with real portfolio logic (buy/sell, holdings, positions, P&L), and an admin panel with live charts for platform monitoring.

**🔗 Live Demo:** [zerodha-frontend-ten.vercel.app](https://zerodha-frontend-ten.vercel.app/) → Sign Up redirects to the [Trading Dashboard](https://zerodha-dashboard-mu-nine.vercel.app/)

---

## 🧭 Table of Contents

- [Overview](#-overview)
- [Live Links](#-live-links)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 🌐 Overview

This repository is a **monorepo** with three independently deployable apps:

| App | Description | Deployment |
|---|---|---|
| `frontend` | Public marketing site — home, products, pricing, about, support, and sign-up | Vercel |
| `dashboard` | Authenticated trading dashboard + admin analytics panel | Vercel |
| `backend` | REST API — auth, stocks, orders, holdings, positions, admin stats | Render |

The user journey mirrors the real Zerodha product: a visitor lands on the marketing site, clicks **Sign Up**, is routed to the dashboard app to register/log in, and then trades stocks with live portfolio tracking.

---

## 🔗 Live Links

| Service | URL |
|---|---|
| 🖥️ Frontend (Landing Page) | https://zerodha-frontend-ten.vercel.app/ |
| 📊 Dashboard (Trading App) | https://zerodha-dashboard-mu-nine.vercel.app/ |
| ⚙️ Backend API | Deployed on Render |

> Clicking **Sign Up** on the frontend redirects users to the dashboard app's login/register flow — the two apps are decoupled but connected via routing, just like Zerodha separates its main site (`zerodha.com`) from its trading platform (`kite.zerodha.com`).

---

## ✨ Features

### 🏠 Marketing Website (`frontend`)
- Responsive landing page with hero, stats, awards, and pricing sections
- Dedicated Products, Pricing, About, and Support pages
- Sign-up flow that hands off to the trading dashboard
- Client-side routing with React Router

### 💹 Trading Dashboard (`dashboard`)
- **Authentication** — JWT-based register/login, persisted sessions, protected routes
- **Portfolio Summary** — holdings, positions, and funds at a glance
- **Watchlist** — track stocks with live price/percentage change
- **Buy / Sell Orders** — real-time order execution with quantity validation against available market supply
- **Holdings & Positions** — average price recalculation on repeat buys, automatic holding cleanup on full sell-off
- **Order History** — full log of executed trades
- **Data Visualization** — portfolio breakdown via Chart.js (doughnut & bar charts)

### 🛠️ Admin Analytics Panel (`dashboard/admin`)
- Role-gated routes (`isAdmin` middleware)
- Platform KPIs — total users, orders, trading volume
- Recent Users & Recent Orders feeds
- User growth trend chart
- Buy vs. Sell distribution chart
- Top traded stocks
- Market overview & system health widgets

### ⚙️ Backend API (`backend`)
- RESTful API built with Express 5
- JWT authentication & authorization middleware
- MongoDB persistence via Mongoose (Users, Stocks, Holdings, Positions, Orders schemas)
- Password hashing with bcrypt
- Stock seeding script for demo/test data
- CORS-enabled for cross-origin frontend/dashboard consumption

---

## 🧰 Tech Stack

**Frontend & Dashboard**
- React 19 + Vite
- React Router v7
- Material UI (MUI) + Emotion (dashboard UI)
- Chart.js + react-chartjs-2 (analytics visualizations)
- Axios (API communication)
- React Icons

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for auth
- bcryptjs for password hashing
- Passport / passport-local (local auth strategy)
- dotenv, cors, body-parser

**Deployment**
- Frontend & Dashboard → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 🏗️ Architecture

```
                     ┌─────────────────────┐
                     │   Marketing Site      │
                     │   (frontend / Vercel) │
                     └──────────┬────────────┘
                                │  Sign Up →
                                ▼
                     ┌─────────────────────┐
        ┌───────────▶│  Trading Dashboard    │
        │            │  (dashboard / Vercel) │
        │            └──────────┬────────────┘
        │                       │  REST API (JWT Bearer)
        │                       ▼
        │            ┌─────────────────────┐
        │            │   Express Backend     │
        │            │   (backend / Render)  │
        │            └──────────┬────────────┘
        │                       │
        │                       ▼
        │            ┌─────────────────────┐
        └────────────│   MongoDB Atlas        │
             Admin     └─────────────────────┘
             analytics
             queries
```

---

## 📁 Project Structure

```
Zerodha-app-clone/
├── frontend/                 # Public marketing website (React + Vite)
│   └── src/
│       └── landing_page/
│           ├── home/         # Hero, Stats, Awards, Pricing
│           ├── products/     # Product showcase
│           ├── pricing/      # Brokerage & pricing details
│           ├── about/        # About & Team
│           ├── support/      # Support & ticket creation
│           └── signup/       # Sign-up entry point → redirects to dashboard
│
├── dashboard/                 # Trading dashboard + admin panel (React + Vite)
│   └── src/
│       ├── pages/             # Login, Register
│       ├── shared/            # Dashboard shell, Menu, TopBar, Home
│       ├── user/              # Summary, Holdings, Positions, Orders, Funds, WatchList
│       ├── admin/             # Admin summary, stock management
│       │   └── components/    # KPI cards, charts, recent activity widgets
│       └── components/        # Buy/Sell modals, charts, global context
│
├── backend/                    # REST API (Node.js + Express)
│   ├── controllers/            # auth, stock, trading, admin logic
│   ├── routes/                 # /auth, /stocks, /admin
│   ├── middlewares/             # JWT verification, admin role guard
│   ├── model/ & schemas/         # Mongoose models (User, Stock, Holdings, Positions, Orders)
│   ├── seedStock.js             # Seeds demo stock data
│   └── index.js                  # App entry point
│
└── README.md
```

---

## 📡 API Reference

Base URL: `<your-render-backend-url>`

### Auth — `/auth`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | — |
| POST | `/auth/login` | Log in and receive JWT | — |
| GET | `/auth/me` | Get current logged-in user | ✅ |
| POST | `/auth/logout` | Log out current session | ✅ |
| POST | `/auth/heartbeat` | Keep-alive / session check | ✅ |

### Stocks — `/stocks`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/stocks` | Get all available stocks |
| POST | `/stocks` | Add a new stock |
| DELETE | `/stocks/:id` | Remove a stock |

### Trading & Portfolio
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/allHoldings` | Get logged-in user's holdings with live prices | ✅ |
| GET | `/allPositions` | Get logged-in user's positions | ✅ |
| GET | `/allOrders` | Get logged-in user's order history | ✅ |
| POST | `/newOrder` | Place a BUY or SELL order | ✅ |

### Admin — `/admin` *(requires admin role)*
| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/stats` | Platform-wide stats |
| GET | `/admin/recent-users` | Recently registered users |
| GET | `/admin/recent-orders` | Recently placed orders |
| GET | `/admin/user-growth` | User growth over time |
| GET | `/admin/trading-volume` | Trading volume trend |
| GET | `/admin/top-stocks` | Most traded stocks |
| GET | `/admin/buy-sell-stats` | Buy vs. sell distribution |
| GET | `/admin/system-health` | System health metrics |
| GET | `/admin/market-overview` | Market overview snapshot |

> All protected routes expect a header: `Authorization: Bearer <token>`

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/iccha06/Zerodha-app-clone.git
cd Zerodha-app-clone
```

### 2. Backend setup
```bash
cd backend
npm install
# create a .env file — see Environment Variables below
npm start
```

### 3. Frontend (marketing site) setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Dashboard (trading app) setup
```bash
cd dashboard
npm install
npm run dev
```

### 5. (Optional) Seed demo stocks
```bash
cd backend
node seedStock.js
```

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=3002
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

For `frontend` and `dashboard`, set the deployed/local backend base URL wherever API calls are made (e.g. via a `.env` with `VITE_API_URL=http://localhost:3002`).

---

## 🖼️ Screenshots

> _Add screenshots or a short screen recording of the landing page, dashboard, and admin panel here to make the README stand out to recruiters._

```
| Landing Page | Trading Dashboard | Admin Panel |
|:---:|:---:|:---:|
| ![landing](./frontend/src/assets/hero.png) | (add screenshot) | (add screenshot) |
```

---

## 🗺️ Roadmap

- [ ] Real-time stock price updates via WebSockets
- [ ] Portfolio P&L over time (line chart)
- [ ] Email verification & password reset
- [ ] Dark mode
- [ ] Unit & integration test coverage

---

## 👤 Author

**Iccha**
GitHub: [@iccha06](https://github.com/iccha06)

---

### ⭐ If you found this project useful or interesting, consider giving it a star on GitHub!
