import { z } from 'zod'

export const SignUpFormSchema = z.object({
    firstName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .trim(),
    lastName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .trim(),
    email: z.string().email({ message: 'Please enter a valid email address.' }).trim(),
    password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9)]/, { message: 'Password must contain at least one special character.'})
    .trim(),
})

export const SignInFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }).trim(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9)]/, { message: 'Password must contain at least one special character.'})    
    .trim(),
})

export type SignUpFormState = 
  | {
    errors? : {
        firstName?: string[],
        lastName?: string[],
        email? : string[],
        password? : string[]
    }
    message? : string
    }
  | undefined

  export type SignInFormState = 
  | {
    errors? : {
        name?: string[],
        email? : string[],
        password? : string[]
    }
    message? : string
    }
  | undefined  