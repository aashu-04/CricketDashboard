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

  const team1 = matchInfo.teamInfo?.[0]?.name || "Team A";
  const team2 = matchInfo.teamInfo?.[1]?.name || "Team B";
  const tossWinner = matchInfo.tossWinner || "Toss info not available";
  const winProb = matchInfo.winProbability || {};

  return (
    <motion.div
      className="min-h-[80vh] p-6 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-800">
        {matchInfo.name || `${team1} vs ${team2}`}
      </h2>

      <div className="space-y-4 text-lg text-gray-800">
        <p><strong>Status:</strong> {matchInfo.status || "Not available"}</p>
        <p><strong>Venue:</strong> {matchInfo.venue || "Unknown venue"}</p>
        <p><strong>Date:</strong> {matchInfo.date || "Unknown date"}</p>
        <p><strong>Match Type:</strong> {matchInfo.matchType || "N/A"}</p>
        <p><strong>Toss Winner:</strong> {tossWinner}</p>

        {Object.keys(winProb).length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-green-700 mb-2">Win Probability</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-green-100 rounded">
                <p className="font-medium">{team1}</p>
                <p className="text-2xl text-green-800 font-bold">
                  {winProb[team1] ? `${winProb[team1]}%` : "N/A"}
                </p>
              </div>
              <div className="p-4 bg-red-100 rounded">
                <p className="font-medium">{team2}</p>
                <p className="text-2xl text-red-800 font-bold">
                  {winProb[team2] ? `${winProb[team2]}%` : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Score Summary</h3>
          {Array.isArray(matchInfo.score) && matchInfo.score.length > 0 ? (
            <ul className="list-disc ml-6 space-y-2">
              {matchInfo.score.map((s, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{s.inning}:</span>{" "}
                  {s.r}/{s.w} in {s.o} overs
                </li>
              ))}
            </ul>
          ) : (
            <p>Score details not available.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
