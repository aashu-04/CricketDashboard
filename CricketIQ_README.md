
# 🏏 CricketIQ Dashboard

This project is a full-stack Cricket Dashboard showing real-time match updates, player stats, and analytics.

---

## 📦 Folder Structure

```
cricket-dashboard/        # React + TailwindCSS frontend (Vite)
cricket-api-backend/      # Express.js backend for CricAPI and scraping
```

---

## ⚙️ Live Deployment with Render

### 🌐 Frontend (React + Vite)
1. Push `cricket-dashboard/` to a GitHub repo.
2. Go to [Render.com](https://render.com) → "New Static Site"
3. Connect your GitHub repo.
4. Use these settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### 🚀 Backend (Express API)
1. Push `cricket-api-backend/` to another GitHub repo.
2. Go to [Render.com](https://render.com) → "New Web Service"
3. Connect the repo and set:
   - **Environment**: `Node`
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Environment Variable**: `PORT = 5000`
4. Replace `YOUR_CRICAPI_KEY` in `index.js` with your real key (or use a secret var).

---

## 🐳 Dockerized Version (Optional)

### 1. Backend Dockerfile

```Dockerfile
# Use Node LTS
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```

Build and run:

```bash
docker build -t cricket-api-backend .
docker run -p 5000:5000 cricket-api-backend
```

### 2. Frontend Dockerfile

```Dockerfile
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t cricket-dashboard .
docker run -p 3000:80 cricket-dashboard
```

---

## 🧪 Test Locally

1. Run backend:
```bash
cd cricket-api-backend
npm install && npm start
```
Runs at `http://localhost:5000`

2. Run frontend:
```bash
cd cricket-dashboard
npm install && npm run dev
```
Runs at `http://localhost:5173`

---

## 📡 Endpoints Available

- `/api/live-matches` - Live match list (CricAPI)
- `/api/match-info/:id` - Match summary (CricAPI)
- `/api/player-stats/:name` - Player stats (ESPNcricinfo scraping)
