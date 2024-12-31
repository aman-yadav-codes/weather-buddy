import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false); // Close the menu if the click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed w-full dark:bg-black dark:text-white bg-slate-300 text-black border-b flex justify-between items-center z-10 px-6 py-3">
      {/* Logo Section */}
      <div className="text-2xl flex items-center gap-2 font-bold">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="text-3xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M14.5 3l-1 3-1-3c-.184-.553.114-1.149.666-1.333.553-.185 1.15.114 1.334.666.075.226.07.458 0 .667zM19.864 6.05l-2.829 1.415 1.415-2.829c.261-.521.894-.731 1.414-.472.521.261.731.894.472 1.415-.107.212-.274.372-.472.471zM21.5 12l-3-1 3-1c.553-.185 1.149.114 1.334.667.184.552-.115 1.148-.668 1.333-.225.075-.457.069-.666 0zM8.55 4.636l1.415 2.829-2.829-1.415c-.521-.261-.732-.894-.472-1.414.261-.521.895-.731 1.414-.472.213.107.373.274.472.472zM17.776 12.342c.139-.424.224-.871.224-1.342 0-2.481-2.019-4.5-4.5-4.5-1.34 0-2.537.594-3.357 1.528l-.143-.028c-1.776 0-3.369.78-4.469 2.011-.24-.08-.472-.086-.697-.011-.553.185-.852.781-.668 1.333.057.167.158.299.277.411-.283.697-.443 1.458-.443 2.256l.002.126c-1.725.445-3.002 2.013-3.002 3.874 0 2.206 1.795 4 4 4h11c2.757 0 5-2.243 5-5 0-2.129-1.344-3.939-3.224-4.658zm-4.276-3.842c1.379 0 2.5 1.121 2.5 2.5 0 .366-.096.706-.238 1.019-.354.021-.72.074-1.118.188-.521-1.353-1.604-2.415-2.967-2.905.456-.49 1.102-.802 1.823-.802zm2.5 11.5h-11c-1.104 0-2-.897-2-2s.896-2 1.908-2.006l1.422.016-.248-1.202c-.055-.263-.082-.536-.082-.808 0-2.206 1.795-4 4-4l.069-.014c1.904.055 3.495 1.406 3.847 3.27l.038.186c.123.436.517.706.946.712l.289-.023c.312-.09.569-.131.811-.131 1.654 0 3 1.346 3 3s-1.346 3-3 3z"></path>
          </g>
        </svg>
        WeatherBuddy
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6 text-xl">
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <a className="block px-4 py-2" href="/" data-discover="true">
            Home
          </a>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <a className="block px-4 py-2" href="/About" data-discover="true">
            About
          </a>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <a className="block px-4 py-2" href="/Usage" data-discover="true">
            Usage
          </a>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <a className="block px-4 py-2" href="/Github" data-discover="true">
            Github
          </a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
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
          isMenuOpen ? "block" : "hidden"
        } dark:bg-black bg-slate-300 border rounded-b p-4 absolute top-14 right-6 text-xl transition duration-300 ease-in-out md:hidden`}
      >
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <a className="block px-4 py-2" href="/" data-discover="true">
            Home
          </a>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <a className="block px-4 py-2" href="/About" data-discover="true">
            About
          </a>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <a className="block px-4 py-2" href="/Usage" data-discover="true">
            Usage
          </a>
        </li>
        <li className="hover:bg-white hover:text-black hover:rounded w-full h-full">
          <a className="block px-4 py-2" href="/Github" data-discover="true">
            Github
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
