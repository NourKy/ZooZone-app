import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between w-full h-20 bg-blue-500 text-white top-0 px-6">
      {/* Logo and site name */}
      <div className="flex items-center">
        <Link to={"/animals"}>
          <img src="/logo.svg" alt="ZooZone Logo" className="h-8 w-8 mr-2" />
        </Link>
        <div className="flex flex-col p-2">
          <span className="font-semibold text-xl tracking-tight">ZooZone</span>
          <span className="font-semibold text-sm tracking-tight text-gray-400">
            Animals Network
          </span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex md:items-center md:w-auto flex-grow justify-start p-5 md:p-0">
        <Link
          to={"/animals"}
          className="block md:inline-block md:mt-0 text-white mx-2"
        >
          Animals
        </Link>
        <Link
          to={"/aboutus"}
          className="block md:inline-block md:mt-0 text-white mx-2"
        >
          About Us
        </Link>
      </div>

      {/* Mobile menu toggle button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full md:hidden flex flex-col items-center p-5 bg-blue-500`}
      >
        <Link
          to={"/animals"}
          className="block text-white my-2"
          onClick={() => setIsOpen(false)}
        >
          Animals
        </Link>
        <Link
          to={"/aboutus"}
          className="block text-white my-2"
          onClick={() => setIsOpen(false)}
        >
          About Us
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
