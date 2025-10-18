// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ReportsList from "./pages/ReportsList";
import AddReport from "./pages/AddReport";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyReports from "./pages/MyReports";
import Officers from "./pages/Officers";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import "./index.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  const [sidebarWidth, setSidebarWidth] = useState(240); // default expanded width

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(!!localStorage.getItem("authToken"));
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {!isLoggedIn ? (
          // 🔓 Public routes: Login & Signup
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        ) : (
          // 🔒 Private area (with sidebar + navbar + footer)
          <div className="flex flex-grow">
            <Sidebar setSidebarWidth={setSidebarWidth} setIsLoggedIn={setIsLoggedIn} />

            <div
              className="flex flex-col flex-grow transition-all duration-300"
              style={{ marginLeft: `${sidebarWidth}px` }}
            >
              <Navbar setIsLoggedIn={setIsLoggedIn} />

              <main className="flex-grow p-6">
                <Routes>
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-reports"
                    element={
                      <ProtectedRoute>
                        <MyReports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/officers"
                    element={
                      <ProtectedRoute>
                        <Officers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/help"
                    element={
                      <ProtectedRoute>
                        <Help />
                      </ProtectedRoute>
                    }
                  />

                  {/* existing navbar pages */}
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <ReportsList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add-report"
                    element={
                      <ProtectedRoute>
                        <AddReport />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <ProtectedRoute>
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>

              <Footer />
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
