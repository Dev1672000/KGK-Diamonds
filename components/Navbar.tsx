"use client"

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-500 border-gray-200 text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
     
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            CMS
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white text-2xl"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Menu */}
        <div
          className={`w-full md:block md:w-auto ${isMobileMenuOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link
                href="/create-post"
                className="mr-4 hover:text-gray-300 flex items-center space-x-2"
              >
                <span>Create Post</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="hover:text-gray-300 flex items-center space-x-2"
              >
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
