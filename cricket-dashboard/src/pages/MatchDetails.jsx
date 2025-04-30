// src/pages/MatchDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "../components/Loader";  // ✅ Added missing Loader import!

export default function MatchDetails() {
  const { id } = useParams();
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatchInfo() {
      try {
        const response = await axios.get(`/api/match-info/${id}`);
        setMatchInfo(response.data);
      } catch (error) {
        console.error("Error fetching match info:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatchInfo();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!matchInfo || Object.keys(matchInfo).length === 0) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-lg text-red-500">No match information available.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-[80vh] p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Match Details
      </h2>

      <div className="space-y-4 text-lg text-gray-700">
        <p><strong>Match:</strong> {matchInfo["team-1"] || "Team 1"} vs {matchInfo["team-2"] || "Team 2"}</p>
        <p><strong>Score:</strong> {matchInfo.score || "Not available yet"}</p>
        <p><strong>Match Status:</strong> {matchInfo.stat || "Status not available"}</p>
        <p><strong>Toss:</strong> {matchInfo.toss_winner_team ? `${matchInfo.toss_winner_team} won the toss` : "Toss not yet decided"}</p>
        <p><strong>Match Type:</strong> {matchInfo.type || "N/A"}</p>
      </div>
    </motion.div>
  );
}
