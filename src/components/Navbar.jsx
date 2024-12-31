import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null); // To reference the button

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    // Close the menu if clicked outside the menu or the hamburger button
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false); // Close the menu if clicking outside
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu when clicking a link
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed w-full dark:bg-black transition-all duration-300 ease-in-out dark:text-white bg-slate-300 text-black border-b flex justify-between items-center z-10 px-6 py-3">
      {/* Logo Section */}
      <div className="text-2xl flex items-center gap-2 font-bold">
        WeatherBuddy
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6 text-xl">
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <Link className="block px-4 py-2" to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <Link className="block px-4 py-2" to="/About" onClick={handleLinkClick}>
            About
          </Link>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <Link className="block px-4 py-2" to="/Usage" onClick={handleLinkClick}>
            Usage
          </Link>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <Link className="block px-4 py-2" to="/Github" onClick={handleLinkClick}>
            Github
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        ref={buttonRef} // Attach the ref to the button
        onClick={toggleMenu}
        className="md:hidden text-3xl font-bold focus:outline-none"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="48"
            d="M88 152h336M88 256h336M88 360h336"
          ></path>
        </svg>
      </button>

      {/* Mobile Menu */}
      <ul
        ref={menuRef}
        className={`${
          isMenuOpen
            ? "block transform scale-100 opacity-100"
            : "hidden transform scale-95 opacity-0"
        } dark:bg-black bg-slate-300 border rounded-b p-4 absolute top-14 right-6 text-xl transition duration-300 ease-in-out md:hidden`}
      >
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <Link className="block px-4 py-2" to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <Link className="block px-4 py-2" to="/About" onClick={handleLinkClick}>
            About
          </Link>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <Link className="block px-4 py-2" to="/Usage" onClick={handleLinkClick}>
            Usage
          </Link>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <Link className="block px-4 py-2" to="/Github" onClick={handleLinkClick}>
            Github
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
