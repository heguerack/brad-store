'use client'

import { paymentMethodSchema } from '@/zod-schema-validator/paymentMethodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/contants'
import { updateUserPaymentMethodAction } from '@/actions/users/updateUserPaymentMethod'
import { ArrowRight, Loader } from 'lucide-react'

export default function PaymentForm({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // console.log('PAYMENT_METHODSS :', PAYMENT_METHODS)
  // 1. Define your form.
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof paymentMethodSchema>) {
    startTransition(async () => {
      const res = await updateUserPaymentMethodAction(values)
      if (!res.success) {
        toast.error(res?.message)
        return
      }
      //  redirect
      router.push('/place-order')
    })
  }
  return (
    <>
      <div className='max-w-md mx-a space-y-4'>
        <h1 className='h2-bold mt-4'>Payment Method</h1>
        <p className='text-sm text-muted-foreground '>
          Please enter a payment method
        </p>
        <Form {...form}>
          <form
            method='post'
            className='space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormControl>
                      <RadioGroup
                        className='flex flex-col space-y-2'
                        // {...field}
                        onValueChange={field.onChange}>
                        {PAYMENT_METHODS?.map((paymentMethod) => (
                          <FormItem
                            key={paymentMethod}
                            className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem
                                value={paymentMethod}
                                checked={field.value === paymentMethod}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {paymentMethod}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
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
