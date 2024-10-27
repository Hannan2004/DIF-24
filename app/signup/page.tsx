'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '@/app/actions/auth';

export default function SignUpPage() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <img src="/signup.png" alt="Signup" className="object-cover w-full h-full rounded-l-lg" />
      </div>
      <div className="hidden md:block h-full border-l-2 border-gray-300 mx-4"></div> {/* Vertical Divider */}
      <div className="w-full md:w-1/2 p-8 bg-white shadow-lg rounded-lg md:rounded-l-none mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form action={action} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              placeholder="Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {state?.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              placeholder="Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {state?.errors?.password && (
              <div className="text-red-500 text-sm mt-1">
                <p>Password must:</p>
                <ul className="list-disc list-inside">
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
    >
      Sign Up
    </button>
  );
}