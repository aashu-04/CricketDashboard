import { useState } from "react";
import { motion } from "framer-motion";
import teams from "./teams.json";
import TeamModal from "../components/TeamModal";

export default function Teams() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // Filtered teams based on search input
  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase()) ||
    team.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="p-8 min-h-[80vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">
        National Teams 🌐
      </h2>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by team name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <button
              key={team.id}
              onClick={() => {
                setSelectedTeam(team);
                setShowModal(true);
              }}
              className="bg-white rounded-lg shadow-md p-6 text-center border hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <img
                src={team.image_path}
                alt={team.name}
                className="w-20 h-20 mx-auto rounded-full mb-3 object-cover"
              />
              <h3 className="text-xl font-semibold text-blue-600">{team.name}</h3>
              <p className="text-sm text-gray-500">Code: {team.code}</p>
            </button>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No teams found.</p>
        )}
      </div>

      {/* Modal */}
      <TeamModal team={selectedTeam} show={showModal} setShow={setShowModal} />
    </motion.div>
  );
}
