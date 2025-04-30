import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LiveMatches from "./pages/LiveMatches";
import MatchDetails from "./pages/MatchDetails";
import Analytics from "./pages/Analytics";
import Players from "./pages/PlayerStats";
import NotFound from "./pages/NotFound";
import Teams from "./pages/Teams";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<LiveMatches />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/players" element={<Players />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
