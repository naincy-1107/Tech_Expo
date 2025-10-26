import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white sticky top-0 z-50">
      {/* Logo / Brand */}
      <Link to="/" className="text-3xl font-extrabold tracking-tight hover:opacity-90 transition">
        Code<span className="text-yellow-300">Learn</span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-8 text-lg font-semibold">
        <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
        <Link to="/visualizer" className="hover:text-yellow-300 transition-colors">Visualizer</Link>
        <Link to="/pricing" className="hover:text-yellow-300 transition-colors">Pricing</Link>
      </nav>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-blue-600 transition font-semibold"
          aria-label="Log in to your account"
        >
          Log in
        </button>
        <button
          className="px-5 py-2 bg-yellow-400 text-blue-900 rounded-lg font-bold shadow-md hover:bg-yellow-300 transition"
          aria-label="Upgrade your plan"
        >
          Upgrade plan 🚀
        </button>
      </div>
    </header>
  );
}
