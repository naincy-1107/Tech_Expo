import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      {/* Logo / Brand */}
      <div className="text-3xl font-extrabold tracking-tight">
        Code<span className="text-yellow-300">Learn</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-8 text-lg font-semibold">
        <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
        <Link to="/Visualizer" className="hover:text-yellow-300 transition">Visualizer</Link>
        <Link to="/Pricing" className="hover:text-yellow-300 transition">Pricing</Link>
      </nav>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-blue-600 transition font-semibold">
          Log in
        </button>
        <button className="px-5 py-2 bg-yellow-400 text-blue-900 rounded-lg font-bold shadow-md hover:bg-yellow-300 transition">
          Upgrade plan 🚀
        </button>
      </div>
    </header>
  );
}
