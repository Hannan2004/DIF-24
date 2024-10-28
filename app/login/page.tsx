'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '@/app/actions/auth';
import { FcGoogle } from 'react-icons/fc';
import { JSX, SVGProps } from 'react';

export default function SigninForm() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1c1c24]">
      <div className="w-full max-w-md p-8">
        <div className="text-center text-white space-y-2 mb-8">
          <h2 className="text-4xl font-semibold">Your Identity, Your Control</h2>
          <p className="text-gray-400 text-lg">
            Securely Store and Manage Your Digital Life
          </p>
        </div>

        <div className="space-y-8">
          <div className="text-white space-y-2">
            <h2 className="text-3xl font-semibold">Login</h2>
            <p className="text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-white hover:underline">Sign up</a>
            </p>
          </div>

          <form action={action} className="space-y-6">
            <div>
              <input
                id="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
              />
              {state?.errors?.email && (
                <p className="text-red-400 text-sm mt-2">{state.errors.email}</p>
              )}
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
              />
              {state?.errors?.password && (
                <div className="text-red-400 text-sm mt-2">
                  <p>Password must:</p>
                  <ul className="list-disc list-inside mt-1">
                    {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <SubmitButton />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-[#1c1c24]">
                  Or login with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg hover:bg-[#2a2a33] transition-colors"
              >
                <FcGoogle size={22} />
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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full px-4 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 font-normal"
    >
      Login
    </button>
  );
}

function AppleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="white"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    </svg>
  );
}