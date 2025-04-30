import { useState } from "react";
import { motion } from "framer-motion";

// const players = [
//   { name: "Virat Kohli", country: "India", img: "https://documents.bcci.tv/resizedimageskirti/164_compress.png" },
//   { name: "Rohit Sharma", country: "India", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Prime_Minister_Of_Bharat_Shri_Narendra_Damodardas_Modi_with_Shri_Rohit_Gurunath_Sharma_%28Cropped%29.jpg/500px-Prime_Minister_Of_Bharat_Shri_Narendra_Damodardas_Modi_with_Shri_Rohit_Gurunath_Sharma_%28Cropped%29.jpg" },
//   { name: "Steve Smith", country: "Australia", img: "https://m.media-amazon.com/images/M/MV5BYTlhYjkzNTQtMjFiNS00NDYyLThlNTgtMWE4ZTI0ZTY4NmM1XkEyXkFqcGc@._V1_.jpg" },
//   { name: "Joe Root", country: "England", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS44D9AAIIZEgFkeYPbwipq7pjEmdYGj_RioQ&s" },
//   { name: "Babar Azam", country: "Pakistan", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS34qgT1gOgEIW_QrK-EoGbNDzx92PRgCkmNA&s" },
//   { name: "Kane Williamson", country: "New Zealand", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNfNJqVf_tqkVOJO6L6q0nXz105DImT4o6Rw&s" },
// ];
import players from "./players.json"

import Modal from "./Modal.jsx";

export default function Players() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [currPlayer, setCurrPlayer] = useState({});

  const filteredPlayers = players.filter(p =>
    p.firstname.toLowerCase().includes(search.toLowerCase())
  );

  const setPLayerModal = (player) => {
    setShow(true);
    setCurrPlayer(player)
  }

  return (
    <motion.div 
      className="min-h-[80vh] p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    > 
    <Modal show={show} setShow={setShow} player={currPlayer}/>

      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Star Players 🌟</h2>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlayers.map((player, idx) => (
          <button 
            key={idx}
            className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 text-center transition-transform hover:-translate-y-2"
            // whileHover={{ scale: 1.05 }}
            onClick={()=>{setPLayerModal(player)}}
          >
            <img 
              src={player.image_path}
              alt={player.firstname}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-600">{player.firstname} {player.lastname}</h3>
            <p className="text-gray-600">{player.country_name}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}


