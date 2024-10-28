"use client";

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = (this as HTMLAnchorElement).getAttribute('href');
        const target = targetId ? document.querySelector(targetId) : null;
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow bg-gray-50">
        <section className="flex flex-col items-center py-12 text-center bg-white shadow-lg rounded-lg mx-4 md:mx-8 lg:mx-16 my-8 p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Digital Identity Vault
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Securely store, manage, and control access to your digital identity documents.
          </p>
          <a href="/signup" className="flex items-center px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Get Started
            <ChevronRightIcon className="ml-2 h-5 w-5" />
          </a>
        </section>
        <section id="features" className="py-16 bg-gray-100 w-full">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose Us?</h2>
            <p className="text-gray-600 mb-8">
              We provide a safe and convenient way to store and manage your identity documents.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Storage</h3>
                <p className="text-gray-600">Your data is encrypted and securely stored on the cloud.</p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Access</h3>
                <p className="text-gray-600">Access your documents anytime, anywhere with just a few clicks.</p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy Control</h3>
                <p className="text-gray-600">You have full control over who can view or download your documents.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
