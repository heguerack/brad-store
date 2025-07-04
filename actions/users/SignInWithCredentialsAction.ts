'use server'

import { signInFormSchema } from '@/zod-schema-validator/signSchemas'
import { signIn, signOut } from '@/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function SignInWithCredentialsAction(
  prevState: unknown,
  formData: FormData
) {
  // console.log(formData)

  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    // console.log(user)
    await signIn('credentials', user)
    return {
      success: true,
      message: 'Signed In successfully',
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.log(error)

    return {
      success: false,
      message: 'Invalid email or password', //we dont wanna give back the real reason like if email or pasword cuz of security reasos
    }
  }
}
