import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import teams from "./teams.json";
import players from "./players.json";

export default function Analytics() {
  const [battingData, setBattingData] = useState([]);
  const [matchPerformance, setMatchPerformance] = useState([]);

  useEffect(() => {
    // 1. Batting chart: Top 1 player per country with dummy run values (use real when available)
    const topPlayers = [];

    const groupedByCountry = players.reduce((acc, player) => {
      if (!acc[player.country_name]) acc[player.country_name] = [];
      acc[player.country_name].push(player);
      return acc;
    }, {});

    for (const [country, countryPlayers] of Object.entries(groupedByCountry)) {
      // Simulate performance metric (e.g., use player.id * 10 as fake "runs")
      const sorted = countryPlayers.sort((a, b) => b.id - a.id); // placeholder logic
      const top = sorted[0];
      topPlayers.push({
        name: `${top.firstname} ${top.lastname}`,
        runs: top.id * 10, // use actual stats here if available
      });
    }

    setBattingData(topPlayers);

    // 2. Match performance: Use number of players per team as placeholder "score"
    const teamStats = teams.map((team) => {
      const count = players.filter((p) => p.country_name === team.name).length;
      return {
        match: team.name,
        score: count * 20, // simulate average score metric
      };
    });

    setMatchPerformance(teamStats);
  }, []);

  return (
    <motion.div
      className="p-8 min-h-[80vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Analytics Dashboard 📊
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Batsmen Runs - Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4 text-center text-blue-600">
            Top Players (Estimated Runs)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={battingData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="runs" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Match Performance - Line Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4 text-center text-green-600">
            Player Representation per Team
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={matchPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="match" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
