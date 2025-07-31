import { getAllCategoriesAction } from '@/actions/products/getAllCategoriesAction'
import { getAllProductsAction } from '@/actions/products/getAllProductsAction'
import ProductCard from '@/components/shared/product/ProductCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $100',
    value: '51-100',
  },
  {
    name: '$101 to $200',
    value: '101-200',
  },
  {
    name: '$201 to $500',
    value: '201-500',
  },
  {
    name: '$501 to $1000',
    value: '501-1000',
  },
]

const ratings = [4, 3, 2, 1]
const sortProducts = ['newest', 'lowest', 'highest', 'rating']

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string
    category: string
    price: string
    rating: string
  }>
}) {
  const { q, category, price, rating } = await props.searchParams

  const isQuerySet = q && q !== 'all' && q.trim() !== ''
  const isCategorySet = category && category !== 'all' && category.trim() !== ''
  const isPriceSet = price && price !== 'all' && price.trim() !== ''
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== ''

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ''} 
       ${isCategorySet ? `: Category ${category} ` : ''}
       ${isPriceSet ? `: Price ${price} ` : ''}
       ${isRatingSet ? `: Rating ${rating} ` : ''}
      `,
    }
  } else {
    return { title: 'Search Products' }
  }
}

export default async function searchPage(props: {
  searchParams: Promise<{
    q?: string // remember we named this as "q" in the input (query)
    category?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }>
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = await props.searchParams // so se set q="all" default, imb case nothing gets passed then we take all as a value, but if something is set it stays, and we can just modify item by item though the same function

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string
    s?: string
    p?: string
    r?: string
    pg?: string
  }) => {
    const params = { q, category, price, rating, sort, page }
    if (c) params.category = c
    if (s) params.sort = s
    if (p) params.price = p
    if (r) params.rating = r
    if (pg) params.page = pg

    return `/search?${new URLSearchParams(params).toString()}`
  }

  const products = await getAllProductsAction({
    query: q,
    category,
    price,
    rating,
    page: Number(page),
    sort,
  })

  const categoriesData = await getAllCategoriesAction()

  return (
    <div className='grid  md:grid-cols-5 md:gap-5'>
      {/* FILTER LINKS AREA  */}
      {/* FILTER LINKS AREA  */}
      {/* FILTER LINKS AREA  */}
      <div className='filter-links'>
        {/* Categories Links  */}
        <div className='text-xl mb-2 mt-3'>Department</div>
        <div className=''>
          <ul className='space-y-1'>
            <Link
              className={`${
                (category === 'all' || category === '') && 'font-bold'
              }`}
              href={getFilterUrl({ c: 'all' })}>
              Any
            </Link>
            {categoriesData.map((obj) => (
              <li key={obj.category}>
                <Link
                  href={getFilterUrl({ c: obj.category })}
                  className={`${category === obj.category && 'font-bold'}`}>
                  {obj.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Price Links  */}
        <div className='text-xl mb-2 mt-8'>Price</div>
        <div className=''>
          <ul className='space-y-1'>
            <Link
              className={`${price === 'all' && 'font-bold'}`}
              href={getFilterUrl({ p: 'all' })}>
              Any
            </Link>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`${price === p.value && 'font-bold'}`}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Ratings Links  */}
        <div className='text-xl mb-2 mt-8'>Rating</div>
        <div className=''>
          <ul className='space-y-1'>
            <Link
              className={`${rating === 'all' && 'font-bold'}`}
              href={getFilterUrl({ r: 'all' })}>
              Any
            </Link>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: r.toString() })}
                  className={`${rating === `${r}` && 'font-bold'}`}>
                  {`${r} starts & Up`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* BIG AREA WHERE PRODUCTS ARE SHOWN */}
      {/* BIG AREA WHERE PRODUCTS ARE SHOWN */}
      {/* BIG AREA WHERE PRODUCTS ARE SHOWN */}
      <div className='md:col-span-4 space-y-4'>
        <div className='flex-between flex-col md:flex-row my-4'>
          <div className='flex items-center'>
            {q !== 'all' && q !== '' && 'Query: ' + q}
            {category !== 'all' && category !== '' && 'Category: ' + category}
            {price !== 'all' && 'Price: ' + price}
            {rating !== 'all' && 'Rating: ' + rating + ' Stars & Up'}
            &nbsp;
            {(q !== 'all' && q !== '') ||
            (category !== 'all' && category !== '') ||
            rating !== 'all' ||
            price !== 'all' ? (
              <Button variant='link' asChild>
                <Link href={'/search'}>Clear</Link>
              </Button>
            ) : null}
          </div>
          <div className=''>
            Sort{''}
            {sortProducts.map((s) => (
              <Link
                href={getFilterUrl({ s })}
                key={s}
                className={`mx-2 ${sort == s && 'font-bold'}`}>
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {' '}
          {products.data.length === 0 && <div>Not products Found</div>}
          {products.data.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
