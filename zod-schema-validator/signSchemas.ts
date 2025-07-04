import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string().email('Invalid Email Address'),
  password: z.string().min(5, 'Passwird  has to be at least 6 characters long'),
})

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least characters long'),
    email: z.string().email('Invalid Email Address'),
    password: z
      .string()
      .min(5, 'Passwird  has to be at least 6 characters long'),
    passwordConfirm: z
      .string()
      .min(5, 'Confirm Password has to be at least 6 characters long'),
  })
  .refine((value) => value.password === value.passwordConfirm, {
    //this is also cool cuz we can refine shit to our liking :)
    message: 'passwords dont match',
    path: ['passwordConfirm'], //this is pretty cool cuz we can redirect the error to the right field!
  })
