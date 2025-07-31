import ProductForm from '@/components/admin/ProductForm'
import { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Create Product page',
}

export default function createProductPage() {
  return (
    <>
      <h2 className='h2-bold'>
        <div className='my-8'>
          <ProductForm type={'Create'} />
        </div>
      </h2>
    </>
  )
}
