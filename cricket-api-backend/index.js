// backend/index.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 5000;

const API_KEY = '72b2c915-63f4-4128-88b4-72d47e0ca37b';
const BASE_URL = 'https://api.cricapi.com/v1';

app.get('/', (req, res) => {
  res.send('🏏 CricketIQ Backend running...');
});

// Live Matches
app.get('/api/live-matches', async (req, res) => {
  try {
    const response = await axios.get(`https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0`);
    res.json({ matches: response.data.data });  // 🚨 MUST access .data.data
  } catch (error) {
    console.error("Live match fetch failed:", error.message);
    res.status(500).json({ error: 'Failed to fetch live matches' });
  }
});

// Match Details Route (updated for CricAPI v1)
app.get('/api/match-info/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.cricapi.com/v1/match_info?apikey=${API_KEY}&id=${id}`);
    
    if (response.data && response.data.status === "success") {
      res.json({ data: response.data.data });
    } else {
      res.status(404).json({ error: "Match info not available" });
    }
  } catch (error) {
    console.error("Error fetching match info:", error.message);
    res.status(500).json({ error: "Failed to fetch match info" });
  }
});



app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
