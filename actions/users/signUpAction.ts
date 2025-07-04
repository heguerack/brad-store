'use server'

import { signIn } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'
import { signUpFormSchema } from '@/zod-schema-validator/signSchemas'
import { hashSync } from 'bcrypt-ts-edge'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function signUpAction(prevState: unknown, formData: FormData) {
  // console.log(formData)

  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConfirm: formData.get('password'),
    })
    const plainPassword = user.password // this becasue we need the plain pasword for signing ig right after signing up...and the thing is that we will hash the paswrod below. so thast why
    user.password = hashSync(user.password, 10)

    //Check if user exists
    const checkUserEmail = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })

    // checkUserEmail
    if (checkUserEmail) {
      return {
        success: false,
        message: 'User Alreadytaken!!', //we dont wanna give back the real reason like if email or pasword cuz of security reasos
      }
    }

    //create user
    const newCreateduser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })
    //if the new user is created sucessfully, we will also make sure is signed in right away

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    })
    return {
      success: true,
      message: 'user registred succesfully successfully',
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.log(error)

    return {
      success: false,
      message: 'User was not resiteredm, something went wrong', //we dont wanna give back the real reason like if email or pasword cuz of security reasos
    }
  }
}
