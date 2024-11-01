'use client';
import { useFormState, useFormStatus } from 'react-dom';

// Define the form state type
interface FormState {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phone?: string[];
    dateOfBirth?: string[];
  };
  message?: string;
}

// Define the action type
interface ActionResult extends FormState {
  success?: boolean;
}

// Mock action function - replace with your actual implementation
async function updateProfile(
  prevState: FormState | undefined,
  formData: FormData
): Promise<ActionResult> {
  try {
    const response = await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dateOfBirth: formData.get('dateOfBirth'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return { success: true, message: 'Profile updated successfully' };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message, errors: errorData.errors };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred while updating the profile' };
  }
}


export default function ProfilePage() {
  const [state, action] = useFormState<FormState, FormData>(updateProfile, {});

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1c1c24]">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <div className="text-white text-center">
            <h2 className="text-4xl font-semibold">Your Profile</h2>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#2a2a33] flex items-center justify-center">
                <span className="text-3xl text-gray-400">👤</span>
              </div>
              <button 
                type="button"
                className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors"
              >
                <CameraIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          <form action={action} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
                />
                {state?.errors?.firstName && (
                  <p className="text-red-400 text-sm mt-2">
                    {state.errors.firstName.join(', ')}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
                />
                {state?.errors?.lastName && (
                  <p className="text-red-400 text-sm mt-2">
                    {state.errors.lastName.join(', ')}
                  </p>
                )}
              </div>
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
              />
              {state?.errors?.email && (
                <p className="text-red-400 text-sm mt-2">
                  {state.errors.email.join(', ')}
                </p>
              )}
            </div>

            <div>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
              />
              {state?.errors?.phone && (
                <p className="text-red-400 text-sm mt-2">
                  {state.errors.phone.join(', ')}
                </p>
              )}
            </div>

            <div>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                placeholder="Date of Birth"
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a33] text-white border border-gray-700 focus:outline-none focus:border-purple-500"
              />
              {state?.errors?.dateOfBirth && (
                <p className="text-red-400 text-sm mt-2">
                  {state.errors.dateOfBirth.join(', ')}
                </p>
              )}
            </div>

            <SubmitButton />
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
      Save Changes
    </button>
  );
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

function CameraIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
