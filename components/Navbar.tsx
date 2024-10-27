"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Digital Identity Vault
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-white hover:text-gray-200 transition duration-300">
            Home
          </Link>
          <Link href="/features" className="text-white hover:text-gray-200 transition duration-300">
            Features
          </Link>
          <Link href="/about" className="text-white hover:text-gray-200 transition duration-300">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-200 transition duration-300">
            Contact
          </Link>
          <Link href="/login" className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-200 transition duration-300">
            Login
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 hover:bg-blue-700 transition duration-300">
              Home
            </Link>
            <Link href="/features" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 hover:bg-blue-700 transition duration-300">
              Features
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 hover:bg-blue-700 transition duration-300">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 hover:bg-blue-700 transition duration-300">
              Contact
            </Link>
            <Link href="/auth/login" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-white hover:bg-gray-200 transition duration-300">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
