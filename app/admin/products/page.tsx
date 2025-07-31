import { deleteSingleProductAction } from '@/actions/products/deleteSingleProductAction'
import { getAllProductsAction } from '@/actions/products/getAllProductsAction'
import DeleteDialog from '@/components/shared/DeleteDialog'
import Pagination from '@/components/shared/Pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { authGuard } from '@/helperFuntions/authGuard'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'
import { formattUUID } from '@/helperFuntions/formatUUID'
import Link from 'next/link'

export default async function page(props: {
  searchParams: Promise<{
    page: string
    query: string
    category: string
  }>
}) {
  await authGuard()
  const searchParams = await props.searchParams
  const page = Number(searchParams.page || 1)
  const searchText = searchParams.query || ''
  const category = searchParams.query || ''

  const allProducts = await getAllProductsAction({
    query: searchText,
    page,
    category,
  })

  // console.log('allProducts :', allProducts)

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <h1 className='h2-bold'>Products</h1>
          {searchText && (
            <div className=''>
              Filterered by <i className=''>&quot;{searchText}&quot;</i>{' '}
              <Link href={'/admin/products'}>
                <Button size='sm'>Remove Filter</Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild>
          <Link href={'/admin/products/create'}>Create Product</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            {/* <TableHead className='text-right'>PRICE</TableHead> */}
            <TableHead>PRICE</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>RATING</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allProducts.data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{formattUUID(product.id)}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrencyHelper(product.price)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className='flex gap-1'>
                <Button asChild variant={'outline'} size='sm'>
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
                <DeleteDialog
                  id={product.id}
                  action={deleteSingleProductAction}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* {allProducts.totalPages && allProducts.totalPages > 1 && ( */}
      {allProducts.totalPages > 1 && (
        <Pagination page={page} totalPages={allProducts.totalPages} />
      )}
    </div>
  )
}
