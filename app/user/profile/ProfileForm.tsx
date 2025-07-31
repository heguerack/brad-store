'use client'

// import { updateUserProfileAction } from '@/actions/users/updateUserProfileAction'
import { updateProfileSchema } from '@/zod-schema-validator/updateProfileSchema'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { updateUserProfileAction } from '@/actions/users/updateUserProfileAction'
// import { revalidate } from '@/app/(root)/layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { revalidatePath } from 'next/cache'

export default function ProfileForm() {
  const { data: session, update } = useSession()

  //  Define your form.
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? '', // if null then use empty string
      email: session?.user?.email ?? '',
    },
  })

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    const res = await updateUserProfileAction(values.name)
    if (!res.success) {
      toast.error(res?.message)
    }
    //update session
    //remember a sesion lok like this:
    //  session : {
    //   user: {
    //    name: 'papa',
    //    email: 'papa@gmail.com',
    //    id: 'fd709c2d-e973-42e5-b2a5-3277797e89bd',
    //    role: 'user'
    //  },
    //  expires: '2025-08-04T10:22:19.560Z'
    // }
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: values.name,
      },
    }

    await update(newSession)
    toast.success(res?.message)

    // so technically the previous changes in db, but not in the token, which is confusing becuase we are updating the session locally! i mean it works for me just like this. but for brad it doesnt work so he has to do some udjustmesn in auth.ts
    //auth.ts
    //  handle session updates
    //   if (session?.user.name && trigger === 'update') {
    //     token.name = session.user.name
    //   }
    //   return token
  }

  return (
    <Form {...form}>
      <form
        method='post'
        className='flex flex-col gap-5'
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    disabled
                    placeholder='Email'
                    className='input-filed'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    placeholder='Name'
                    className='input-filed'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          size={'lg'}
          className='button col-span-2 w-full'
          //this is a nice way to get the state without using useTransiont, just react-hook-form ?? nice :);
          disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Update Profile'}
        </Button>
      </form>
    </Form>
  )
}
