import { getSingleproductByIdAction } from '@/actions/products/getSingleproductByIdAction'
import { getSingleUserByIdAction } from '@/actions/users/getSingleUserById'
import ProductForm from '@/components/admin/ProductForm'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const metadata: Metadata = {
  title: 'Edit Your Product here!',
}

export default async function page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const product = await getSingleproductByIdAction(id)
  if (!product) return notFound()

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h1 className='h2-bold'>Update Producs</h1>
      <ProductForm type='Update' productId={product.id} product={product} />
    </div>
  )
}
