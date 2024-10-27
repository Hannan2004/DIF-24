import { SignUpFormSchema, SignUpFormState, SignInFormSchema, SignInFormState } from '@/app/lib/definitions' 

export async function signup(state: SignUpFormState, formData: FormData) {
    // Validate the form data
    const validatedFields = SignUpFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
}

export async function signin(state: SignInFormState, formData: FormData) {
    // Validate the form data
    const validatedFields = SignInFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
}