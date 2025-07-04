'use client'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { shippingAddressDefaultValues } from '@/lib/contants'
import { ShippingAddressType } from '@/types'
import { shippingAddressSchema } from '@/zod-schema-validator/shippingAddressSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader } from 'lucide-react'

import { useTransition } from 'react'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateUserAddressAction } from '@/actions/users/updateUserAddressAction'
export function ShippingAddressForm({
  address,
}: {
  address: ShippingAddressType
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof shippingAddressSchema>) {
    startTransition(async () => {
      const res = await updateUserAddressAction(values)
      if (!res.success) {
        toast.error(res?.message)
        return
      }
      //  redirect
      router.push('/payment-method')
    })
  }

  return (
    <>
      <div className='max-w-md mx-a space-y-4'>
        <h1 className='h2-bold mt-4'>Shipping Address</h1>
        <p className='text-sm text-muted-foreground '>
          Please neter an address to ship to
        </p>
        <Form {...form}>
          <form
            method='post'
            className='space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='fullName'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'fullName'
                  >
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='streetAddress'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'streetAddress'
                  >
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='city'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'city'
                  >
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='postalCode'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'postalCode'
                  >
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='country'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'country'
                  >
                }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex pag-2 '>
              <Button type='submit' disabled={isPending}>
                {isPending ? (
                  <Loader className='h-4 w-4 animate-spin' />
                ) : (
                  <ArrowRight className='w-4 h-4' />
                )}{' '}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
