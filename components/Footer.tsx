"use client"; // Add this line at the top

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} Digital Identity Vault. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <Link href="/privacy" className="text-gray-400 hover:text-white transition duration-300">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-400 hover:text-white transition duration-300">
            Terms of Service
          </Link>
          <Link href="/contacts" className="text-gray-400 hover:text-white transition duration-300">
            Contact us
          </Link>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300"> {/* Replace "#" with actual social media links */}
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;