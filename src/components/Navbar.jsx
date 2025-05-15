import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Menu, X } from "lucide-react"; // أيقونات جميلة

const Navbar = () => {
  const { userData, logoutUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-5xl font-bold tracking-wide text-white">
          BookFinder
        </Link>

        {/* Menu Toggle (Mobile) */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Links (Desktop) */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-300">
            Contact
          </Link>
          {userData ? (
            <>
              <Link to="/favorites" className="hover:text-blue-300">
                Favorites
              </Link>

              <span className="text-sm text-gray-300">
                Hello, {userData.name}
              </span>
              <button onClick={logoutUser} className="hover:text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-800 px-4 pb-4 space-y-2">
          <Link to="/" className="block py-2 hover:text-blue-300">
            Home
          </Link>
          <Link to="/about" className="block py-2 hover:text-blue-300">
            About
          </Link>
          <Link to="/contact" className="block py-2 hover:text-blue-300">
            Contact
          </Link>
          {userData ? (
            <>
              <Link to="/favorites" className="block py-2 hover:text-blue-300">
                Favorites
              </Link>

              <span className="block py-1 text-sm text-gray-300">
                Hello, {userData.name}
              </span>
              <button
                onClick={logoutUser}
                className="block py-2 text-left w-full hover:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 hover:text-blue-300">
                Login
              </Link>
              <Link to="/register" className="block py-2 hover:text-blue-300">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
