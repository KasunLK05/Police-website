// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  FileText,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ setSidebarWidth, setIsLoggedIn }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState({
    name: "Jhon Doe",
    email: "jhondoe100@gmail.com",
    photo: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser({
        name: storedUser.name || "Unnamed Officer",
        email: storedUser.email || "officer@police.lk",
        photo:
          storedUser.photo ||
          "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
      });
    }
  }, []);

  // Adjust sidebar width dynamically in App.jsx
  useEffect(() => {
    setSidebarWidth(isCollapsed ? 80 : 240);
  }, [isCollapsed, setSidebarWidth]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  // ✅ Clean minimal style
  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200
    ${
      pathname === path
        ? "bg-blue-100 text-blue-600"
        : "!text-black hover:bg-blue-50 hover:!text-blue-600"
    }`;

  const iconClass = (path) =>
    `transition-colors duration-200 ${
      pathname === path 
        ? "text-blue-600 group-hover:text-blue-900" 
        : "text-black group-hover:text-blue-600"
    }`;

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-60"
      }`}
    >
      {/* Profile Section */}
      <div className="relative border-b border-gray-100 pb-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100"
        >
          {isCollapsed ? (
            <ChevronRight size={18} className="text-blue-700" />
          ) : (
            <ChevronLeft size={18} className="text-blue-700" />
          )}
        </button>

        <div
          className={`flex flex-col items-center mt-6 transition-all duration-300 ${
            isCollapsed ? "px-0" : "px-3"
          }`}
        >
          <img
            src={user.photo}
            alt="Officer"
            className={`rounded-full border border-gray-300 transition-all duration-300 ${
              isCollapsed ? "w-10 h-10" : "w-14 h-14"
            }`}
          />
          {!isCollapsed && (
            <>
              <p className="mt-2 font-semibold text-gray-900 text-center truncate w-44">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 text-center truncate w-44">
                {user.email}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow mt-4">
        <nav className="flex flex-col gap-1 px-2">
          <Link to="/home" className={`group ${linkClass("/home")}`}>
            <Home size={18} className={iconClass("/home")} />
            {!isCollapsed && "Home"}
          </Link>

          <Link to="/profile" className={`group ${linkClass("/profile")}`}>
            <User size={18} className={iconClass("/profile")} />
            {!isCollapsed && "My Profile"}
          </Link>

          <Link to="/my-reports" className={`group ${linkClass("/my-reports")}`}>
            <FileText size={18} className={iconClass("/my-reports")} />
            {!isCollapsed && "My Reports List"}
          </Link>

          <Link to="/officers" className={`group ${linkClass("/officers")}`}>
            <Users size={18} className={iconClass("/officers")} />
            {!isCollapsed && "Officers / Users"}
          </Link>
        </nav>
      </div>

      {/* Secondary Links */}
      <div className="p-4 border-t border-gray-200">
        <nav className="flex flex-col gap-1">
          <Link to="/settings" className={`group ${linkClass("/settings")}`}>
            <Settings size={18} className={iconClass("/settings")} />
            {!isCollapsed && "Settings"}
          </Link>

          <Link to="/help" className={`group ${linkClass("/help")}`}>
            <HelpCircle size={18} className={iconClass("/help")} />
            {!isCollapsed && "Help / Support"}
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-lg font-medium transition-all duration-200"
          >
            <LogOut size={18} />
            {!isCollapsed && "Logout"}
          </button>
        </nav>
      </div>
    </aside>
  );
}
