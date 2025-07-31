'use client'
import { productDefaultValues } from '@/lib/contants'
import { ProductType } from '@/types'
import { InsertProductSchema } from '@/zod-schema-validator/productSchemas'
import { updateProductSchema } from '@/zod-schema-validator/updateProductSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import slugify from 'slugify'
import { Textarea } from '../ui/textarea'
import { createSingleProductAction } from '@/actions/products/createSingleProductAction'
import { toast } from 'sonner'
import { updateSingleProductAction } from '@/actions/products/updateProductAction'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { UploadButton } from '@/lib/uploadthing'
import { Checkbox } from '../ui/checkbox'

export default function ProductForm({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update'
  // product?: ProductType
  product?: ProductType
  productId?: string
}) {
  const router = useRouter()

  const schema = type === 'Update' ? updateProductSchema : InsertProductSchema

  type FormData = typeof schema extends typeof updateProductSchema
    ? z.infer<typeof updateProductSchema>
    : z.infer<typeof InsertProductSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  })
  // const form = useForm<z.infer<typeof InsertProductSchema>>({
  //   resolver:
  //     type === 'Update'
  //       ? zodResolver(updateProductSchema)
  //       : zodResolver(InsertProductSchema),
  //   defaultValues:
  //     product && type === 'Update' ? product : productDefaultValues,
  // })

  const images = form.watch('images')
  const isFeatured = form.watch('isFeatured')
  const banner = form.watch('banner')

  return (
    <Form {...form}>
      <h1>Create form</h1>
      {/* <form className='space-y-8' onSubmit={form.handleSubmit(onsubmit)}> */}
      <form
        className='space-y-8'
        onSubmit={form.handleSubmit(
          //so i decided to do the whole logic there
          async (values: z.infer<typeof InsertProductSchema>) => {
            // On Create
            // On Create
            if (type === 'Create') {
              const res = await createSingleProductAction(values)
              if (!res.success) {
                toast.error(res.message)
              } else {
                toast.success(res.message)
                router.push('/admin/products')
              }
            }
            // On Create
            // On Create
            if (type === 'Update') {
              if (!productId) throw new Error('Not product id')

              const res = await updateSingleProductAction({
                // this  because we are passing the values but they are just of this type:InsertProductSchema, and remeber it doesnt come with the id
                ...values,
                id: productId,
              })
              if (!res.success) {
                toast.error(res.message)
              } else {
                toast.success(res.message)
                router.push('/admin/products')
              }
            }
          }
        )}>
        <div className='flex flex-col md:flex-row gap-5'>
          {/* name  */}
          {/* name  */}
          {/* name  */}

          <FormField
            control={form.control}
            name='name'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof InsertProductSchema>,
                'name'
              >
            }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Product name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* slug */}
          {/* slug */}
          {/* slug */}
          <FormField
            control={form.control}
            name='slug'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof InsertProductSchema>,
                'slug'
              >
            }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input placeholder='Enter Product slug' {...field} />{' '}
                    <Button
                      type='button'
                      className='bg-gray-500 hever:bg-gray-600 px-4 py-3 mt-'
                      onClick={() => {
                        form.setValue(
                          // this is super cool! we can set values just like this :)
                          'slug',
                          slugify(form.getValues('name'), { lower: true })
                        )
                      }}>
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          {/* brand*/}
          {/* brand*/}
          {/* brand*/}
          <FormField
            control={form.control}
            name='brand'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof InsertProductSchema>,
                'brand'
              >
            }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Product brand' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*category */}
          {/*category */}
          {/*category */}
          <FormField
            control={form.control}
            name='category'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof InsertProductSchema>,
                'category'
              >
            }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Product category' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          {/* price  */}
          {/* price  */}
          {/* price  */}
          <FormField
            control={form.control}
            name='price'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof InsertProductSchema>,
                'price'
              >
            }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Product price' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* stock    */}
          {/* stock    */}
          {/* stock    */}
          <FormField
            control={form.control}
            name='stock'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof InsertProductSchema>,
                'stock'
              >
            }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Product stock' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='upload-field flex flex-col md:flex-row gap-5'>
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className='space-y-2mt-2 min-h-48'>
                    <div className='flex-start space-x-2'>
                      {images.map((img: string) => (
                        <Image
                          src={img}
                          key={img}
                          alt='product image'
                          className='w-20 h-20 object-cover object-center rounded-sm'
                          width={100}
                          height={100}
                        />
                      ))}
                      <FormControl>
                        <UploadButton
                          className='border-2 p-2 rounded-lg bg-amber-200 hover:bg-amber-300 cursor-pointer'
                          endpoint='imageUploader'
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue('images', [...images, res[0].url])
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`)
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='upload-field'>
          {/*isfeatured*/}
          {/*isfeatured*/}
          Featured Product
          <Card>
            <CardContent className='space-y-2 mt-2'>
              <FormField
                control={form.control}
                name='isFeatured'
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof InsertProductSchema>,
                    'isFeatured'
                  >
                }) => (
                  <FormItem className='space-x-2'>
                    <FormLabel>Is Featured?</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value === true}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <Image
                  src={banner}
                  alt='banner image'
                  className='w-full object-cover object-center rounded-sm'
                  width={1920}
                  height={680}
                />
              )}
              {isFeatured && !banner && (
                <UploadButton
                  className='border-2 p-2 rounded-lg bg-amber-200 hover:bg-amber-300 cursor-pointer'
                  endpoint='imageUploader'
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue('banner', res[0].url)
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`)
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div className=''>
          {/* description  */}
          {/* description  */}
          {/* description  */}
          <FormField
            control={form.control}
            name='description'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof InsertProductSchema>,
                'description'
              >
            }) => (
              <FormItem>
                <FormLabel>Desscription</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter Product desscription'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=''>
          {/* submit  */}
          <Button
            size={'lg'}
            className='clo-span-2 w-full'
            disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  )
}
