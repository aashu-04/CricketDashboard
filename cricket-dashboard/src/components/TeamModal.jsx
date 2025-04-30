import { motion, AnimatePresence } from "framer-motion";

export default function TeamModal({ team, show, setShow }) {
  if (!team) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-md text-center relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <img
              src={team.image_path}
              alt={team.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-blue-700">{team.name}</h2>
            <p className="text-gray-700">Code: <strong>{team.code}</strong></p>
            <p className="text-gray-700">Country ID: {team.country_id}</p>
            <p className="text-gray-700">
              National Team:{" "}
              <span className={team.national_team === "TRUE" ? "text-green-600" : "text-red-600"}>
                {team.national_team === "TRUE" ? "Yes" : "No"}
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-2">Last Updated: {new Date(team.updated_at).toLocaleDateString()}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
