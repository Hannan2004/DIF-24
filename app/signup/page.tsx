'use client';

import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:3000/api/signup', formData);
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex h-screen bg-[#1c1c24]">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden rounded-2xl m-6">
        {/* Image with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-[1]"></div>
        <img 
          src="/signup2.png" 
          alt="Hero" 
          className="object-cover w-full h-full"
          style={{
            imageRendering: 'crisp-edges',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>
      <div className="absolute bottom-20 left-12 text-white space-y-2 z-10 text-center">
          <h1 className="text-3xl font-semibold leading-tight">
          Your Identity, Your Control:<br />
          Securely Store and Manage Your Digital Life.
          </h1>
        </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-white space-y-2">
            <h2 className="text-4xl font-semibold">Create</h2>
            <p className="text-gray-400">
              Already have an account?{' '}
              <a href="#" className="text-white hover:underline">Log in</a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="flex-1 w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="flex-1 w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOffIcon className="w-5 h-5 text-gray-400" /> : <EyeIcon className="w-5 h-5 text-gray-400" />}
              </button>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-700 bg-[#2a2a33] text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-white hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 font-normal"
            >
              Create account
            </button>

            {message && <p className="text-green-500 text-sm mt-1">{message}</p>}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-[#1c1c24]">
                  Or register with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg hover:bg-[#2a2a33] transition-colors"
              >
                <GoogleIcon/>
                <span className="text-white font-normal ml-2">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg hover:bg-[#2a2a33] transition-colors"
              >
                <AppleIcon className="w-5 h-5 mr-2" />
                <span className="text-white font-normal">Apple</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function EyeIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function GoogleIcon() {
  return <FcGoogle size={22} />;
}

function AppleIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="white"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    </svg>
  );
}