// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 shadow-md sticky top-0 z-50">
      <Link to="/" className="flex items-center text-white text-2xl font-bold">
      <img src="/logo.svg" alt="WicketPulse Logo" className="h-12" />
        Wicket Pulse
      </Link>

      <div className="space-x-6 text-white text-lg">
        <Link to="/" className="hover:text-yellow-300">Home</Link>
        <Link to="/live" className="hover:text-yellow-300">Live Matches</Link>
        <Link to="/analytics" className="hover:text-yellow-300">Analytics</Link>
        <Link to="/players" className="hover:text-yellow-300">Players</Link>
      </div>
    </nav>
  );
}
