// src/pages/Analytics.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const battingData = [
  { name: 'Virat', runs: 580 },
  { name: 'Rohit', runs: 470 },
  { name: 'Smith', runs: 530 },
  { name: 'Root', runs: 490 },
  { name: 'Babar', runs: 510 },
];

const matchPerformance = [
  { match: 'Match 1', score: 220 },
  { match: 'Match 2', score: 180 },
  { match: 'Match 3', score: 250 },
  { match: 'Match 4', score: 210 },
  { match: 'Match 5', score: 230 },
];

export default function Analytics() {
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
            Top Batsmen - Total Runs
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
            Team Performance Over Matches
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
