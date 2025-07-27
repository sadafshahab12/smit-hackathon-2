import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLoginModal from "./AdminLoginModal";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    navigate("/admin/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600">
          <Link to="/">Student Portal</Link>
        </div>

        {/* Hamburger button for small screens */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? <IoCloseOutline size={22} className="cursor-pointer"/> : <HiOutlineMenuAlt3 size={22} className="cursor-pointer"/>}
          </svg>
        </button>

        {/* Menu items */}
        <div
          className={`flex-col md:flex-row md:flex md:items-center items-center absolute z-1 md:static bg-white md:bg-transparent top-15 left-0 md:h-auto h-screen w-full md:w-auto transition-all duration-300 ease-in-out ${
            menuOpen ? "flex" : "hidden"
          } md:space-x-4 py-4 md:py-0 shadow md:shadow-none`}
        >
          <Link
            to="/"
            className="block px-6 py-2 text-gray-700 hover:text-indigo-600 font-medium transition"
            onClick={() => setMenuOpen(false)}
          >
            Feedback Form
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/admin/dashboard"
                className="block px-6 py-2 text-gray-700 hover:text-indigo-600 font-medium transition"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition w-auto text-left md:text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              className="block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition w-auto text-left md:text-center"
            >
              Admin Login
            </button>
          )}
        </div>
      </nav>

      {showLogin && (
        <AdminLoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Navbar;
