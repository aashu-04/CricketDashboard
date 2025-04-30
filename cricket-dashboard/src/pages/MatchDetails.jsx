// src/pages/MatchDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

export default function MatchDetails() {
  const { id } = useParams();
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatchInfo() {
      try {
        const response = await axios.get(`/api/match-info/${id}`);
        setMatchInfo(response.data?.data || {});
      } catch (error) {
        console.error("Error fetching match info:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatchInfo();
  }, [id]);

  if (loading) return <Loader />;

  if (!matchInfo || Object.keys(matchInfo).length === 0) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg text-red-600">No match details found.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-[80vh] p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Match Details
      </h2>

      <div className="space-y-5 text-lg text-gray-800 leading-relaxed">
        <p>
          <strong>Match:</strong>{" "}
          {matchInfo.name || `${matchInfo.teamInfo?.[0]?.name || "Team A"} vs ${matchInfo.teamInfo?.[1]?.name || "Team B"}`}
        </p>
        <p>
          <strong>Status:</strong> {matchInfo.status || "Status not available"}
        </p>
        <p>
          <strong>Venue:</strong> {matchInfo.venue || "Venue not specified"}
        </p>
        <p>
          <strong>Date:</strong> {matchInfo.date || "Unknown date"}
        </p>
        <p>
          <strong>Score:</strong> {matchInfo.score || "Not available yet"}
        </p>
        <p>
          <strong>Match Format:</strong> {matchInfo.matchType || "Format N/A"}
        </p>
      </div>
    </motion.div>
  );
}
