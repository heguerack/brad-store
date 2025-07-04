'use server'

import { signIn, signOut } from '@/auth'

export async function SignOutUser() {
  await signOut()
}
