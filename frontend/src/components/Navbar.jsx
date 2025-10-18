// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // npm install lucide-react

export default function Navbar({ setIsLoggedIn }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
      pathname === path
        ? "!text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md"
        : "text-blue-600 hover:!text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:shadow-md"
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-3">
        <Link
          to="/reports"
          className="text-2xl font-bold text-blue-700 flex items-center gap-2"
        >
          🚓 Police Portal
        </Link>

        {/* Hamburger Icon (mobile) */}
        <button
          onClick={toggleMenu}
          className="text-blue-700 md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          <Link className={linkClass("/reports")} to="/reports">
            Reports
          </Link>
          <Link className={linkClass("/add-report")} to="/add-report">
            Add Report
          </Link>
          <Link className={linkClass("/analytics")} to="/analytics">
            Analytics
          </Link>
          {/* Logout Button REMOVED from Desktop */}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 flex flex-col items-center gap-2 py-3">
          <Link
            className={linkClass("/reports")}
            to="/reports"
            onClick={() => setIsOpen(false)}
          >
            Reports
          </Link>
          <Link
            className={linkClass("/add-report")}
            to="/add-report"
            onClick={() => setIsOpen(false)}
          >
            Add Report
          </Link>
          <Link
            className={linkClass("/analytics")}
            to="/analytics"
            onClick={() => setIsOpen(false)}
          >
            Analytics
          </Link>
          {/* Logout Button REMOVED from Mobile */}
        </div>
      )}
    </nav>
  );
}