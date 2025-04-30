// src/pages/LiveMatches.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import Loader from "../components/Loader";  // ✅ Ensure this exists

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await axios.get('/api/live-matches');
        console.log("Fetched Matches:", response.data);
        if (response.data.data) {
          setMatches(response.data.data);
        } else if (response.data.matches) {
          setMatches(response.data.matches);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  function downloadCSV() {
    const csv = Papa.unparse(matches.map(match => ({
      name: match.name || "N/A",
      status: match.status || "N/A",
      date: match.date || "N/A",
    })));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'matches.csv');
  }

  return (
    <motion.div 
      className="min-h-[80vh] p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Live & Upcoming Matches</h2>

      {loading ? (
        <Loader />
      ) : matches.length > 0 ? (
        <>
          <div className="flex justify-end mb-6">
            <button 
              onClick={downloadCSV}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow transition"
            >
              Download Matches CSV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, idx) => (
              <Link 
                to={`/match/${match.id || match.idMatch || idx}`} 
                key={idx}
                className="bg-white rounded-lg shadow-md hover:shadow-xl p-4 transition-transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {match.name || "Match"}
                </h3>
                <p className="text-gray-600">{match.status || "Status not available"}</p>
                <p className="text-gray-500 text-sm">{match.date || "Date not available"}</p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-lg">No matches available currently.</p>
      )}
    </motion.div>
  );
}
