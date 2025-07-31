'use client'

import { getReviewByProductIdWrittenByCurrentUser } from '@/actions/reviews/getReviewByProductIdWrittenByCurrentUser'
import { reviewsAction } from '@/actions/reviews/reviewsAction'
import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { reviewFormDafaultValues } from '@/lib/contants'
import { insertReviewSChema } from '@/zod-schema-validator/reviewsSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { StarIcon } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export default function ReviewForm({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string
  productId: string
  onReviewSubmitted: () => void
}) {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof insertReviewSChema>>({
    resolver: zodResolver(insertReviewSChema),
    defaultValues: reviewFormDafaultValues,
  })

  // Open form handler
  // const handleOpenForm = () => {
  const handleOpenForm = async () => {
    form.setValue('productId', productId)
    form.setValue('userId', userId)
    ///this for updating
    ///this for updating
    const review = await getReviewByProductIdWrittenByCurrentUser({ productId })
    //the user will be passed as session at the action
    if (review) {
      form.setValue('title', review.title)
      form.setValue('description', review.description)
      form.setValue('rating', review.rating)
    }
    ///this for updating
    ///this for updating
    setOpen(true)
  }

  //submit form handler
  const onsubmit: SubmitHandler<z.infer<typeof insertReviewSChema>> = async (
    values
  ) => {
    const res = await reviewsAction({ ...values, productId })
    if (!res?.success) {
      return toast.success('Product not found')
    }
    setOpen(false)
    onReviewSubmitted()
    toast.success(res.message)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button type='button' onClick={handleOpenForm}>
        Write a Review
      </Button>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form method='post' onSubmit={form.handleSubmit(onsubmit)}>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>
                Share your thoughts with other customers
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Enter description' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='rating'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // value={field.value.toString()}>
                      value={field.value ? field.value.toString() : ''}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a rating' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* no need to map here as array.from is a built in js, that maps already :) so it would be innefivient and redundant  */}
                        {Array.from({ length: 5 }).map((_, i) => (
                          <SelectItem key={i} value={(i + 1).toString()}>
                            {i + 1}
                            <StarIcon className='inline h-4 w-4' />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type='submit'
                size='lg'
                className='w-full'
                disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
