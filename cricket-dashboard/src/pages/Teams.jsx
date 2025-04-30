import { useState } from "react";
import { motion } from "framer-motion";
import teams from "./teams.json";
import TeamModal from "../components/TeamModal";

export default function Teams() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      className="p-8 min-h-[80vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        National Teams 🌐
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teams.map((team) => (
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
        ))}
      </div>

      {/* Modal */}
      <TeamModal team={selectedTeam} show={showModal} setShow={setShowModal} />
    </motion.div>
  );
}
