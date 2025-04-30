// backend/index.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 5000;

const API_KEY = '72b2c915-63f4-4128-88b4-72d47e0ca37b';
const BASE_URL = 'https://cricketdata.org/api'; 

app.get('/', (req, res) => {
  res.send('🏏 CricketIQ Backend running...');
});

// Live Matches
app.get('/api/live-matches', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/matches?apikey=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch live matches' });
  }
});

// Match Details
app.get('/api/match-info/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/cricketScore?apikey=${API_KEY}&unique_id=${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch match info' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
