# Frank Notes

## Add Shacn

## install next themes

```ts
npm install next-themes
```

###

"With app/You'll need to update your app/layout.jsx to use next-themes. The simplest layout looks like this:"

```ts
// app/layout.jsx
import { ThemeProvider } from 'next-themes'

export default function Layout({ children }) {
  return (
    <htm land='en' suppressHydrationWarning>
      //even with suppressHydrationWarning we copuld have hydration error as
      servers don have access to he window.object that this packge uses under
      the dood. we have to mount the theme using useEfft fist , check modeTpggle
      componet
      <body>
        <ThemeProvider
          attribute={'class'}
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </htm>
  )
}
```

### create modeToggle componet

-add it here

```ts
    <div className='space-x-2'>
          <ModeToggle />
          <Button asChild variant={'ghost'}>
            <Link href={'/cart'}>
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          <Button asChild variant={'default'}>
            <Link href={'/sign-in'}>
              <ShoppingCart />
              Sign In
            </Link>
          </Button>
```

```ts
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
```

-fix mounting issue for the theme

```ts
'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { MoonIcon, SunDimIcon, SunIcon } from 'lucide-react'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          {theme === 'system' ? (
            <SunIcon />
          ) : theme === 'dark' ? (
            <MoonIcon />
          ) : (
            <SunDimIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
```

- continue on component

```ts
<DropdownMenuContent>
  <DropdownMenuLabel>Appereance</DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuCheckboxItem
    checked={theme === 'system'}
    onClick={() => setTheme('system')}>
    System
  </DropdownMenuCheckboxItem>
  <DropdownMenuCheckboxItem
    checked={theme === 'dark'}
    onClick={() => setTheme('dark')}>
    Dark
  </DropdownMenuCheckboxItem>
  <DropdownMenuCheckboxItem
    checked={theme === 'light'}
    onClick={() => setTheme('light')}>
    Light
  </DropdownMenuCheckboxItem>
</DropdownMenuContent>
```

## create loading page and not found page

### create loading page

```ts
import Image from 'next/image'

export default function loadingPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}>
      <Image src={'/loader.gif'} alt='Loading...' height={150} width={150} />
    </div>
  )
}
```

-test by adding a delay in home page for example

### create not found page

app/not-found.tsx

```ts
'use client'
export default function notFoundPage() {
  return <div>not-found</div>
}
```

## Work on header

### create a Menu.tsx

- remove the following from header to create the new component.

```ts
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import ModeToggle from './ModeToggle'
import { Button } from '@/components/ui/button'

export default function Menu() {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <ModeToggle />
        <Button asChild variant={'ghost'}>
          <Link href={'/cart'}>
            <ShoppingCart />
            Cart
          </Link>
        </Button>
        <Button asChild variant={'default'}>
          <Link href={'/sign-in'}>
            <ShoppingCart />
            Sign In
          </Link>
        </Button>
      </nav>
    </div>
  )
}
```

### add sheet compionet to Menu

## add and import sample data

## Create a productList.tsx

- again dont worry about pes, we will deal with it later whenusing db ORM

```ts
export default function ProductList({
  data,
  title,
}: {
  data: any
  title?: string
}) {
  console.log(data)

  return (
    <div className='my-10'>
      <h2 className='h2-bold mb-4'>{title}</h2>
      {data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {data.map((item: any) => (
            <h1 key={item.slug}>{item.name}</h1>
          ))}
        </div>
      ) : (
        <div>
          <p className=''>No Products Found</p>
        </div>
      )}
    </div>
  )
}
```

- add a limit to the data, say 4

```ts
<ProductList data={products} title='Newest Arrivals' limit={4} />
```

## Create Product Card

```ts
import { Card, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({ product }: { product: any }) {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
    </Card>
  )
}
```

-In productList , replace h1, with productCard

```ts
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
  {limitedData.map((item: any) => (
    <h1 key={item.slug}>{item.name}</h1>
  ))}
</div>
```

### Add productCard content

```ts
 <CardContent className='grid p-4 gap-4'>
        <div className='text-xs'>
          {product.brand}
          <Link href={`/product/${product.slug}`}>
            <h2 className='text-sm font-medium'>{product.name}</h2>
          </Link>
          <div className='flex-between'>
            <p className=''>{product.rating} Stars</p>//this for now
            {product.stock > 0 ? (
              <p className='font-bold'>{product.price}</p>
            ) : (
              <p className='text-destructive'>Out of Stock</p>
            )}
          </div>
        </div>
      </CardContent>
</CardContent>
```

### creata a Productprice.tsx

```ts
import { cn } from '@/lib/utils'

export default function ProductPrice({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  //Ensure two decimal places
  const stringValue = value.toFixed(2)
  //get int and float
  const intvalue = stringValue.split('.')[0]
  const floatValue = stringValue.split('.')[1]

  return (
    <p className={cn('text-2xl', className)}>
      <span className='text-xs align-super'>$</span>
      {intvalue}
      <span className='text-xs align-super'>.{floatValue}</span>
    </p>
  )
}
```

## Add PostgreSQL via Neon(vercel!) & Prisma ORM

```ts
'https://vercel.com/franks-cbb4bfa6/~/stores'
```

-select Neon Postgress
-dont paste the connectios strings or .env.local stuff just yet, wait for prisma

### Install Prisma

```ts
npx prisma init
```

- This will create the initial prisma schema, where we creat all of our models
- it will also update the .env, make sure to add the correct url string from Neon(Vercel)!, and replace it
- Anfd that should be all, the set up should be rady to work witht the database

### models

```ts
'https://www.prisma.io/docs/orm/prisma-schema/data-model/models'
```

```ts


generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  //@id makes it a primary key,
  // @Default() //this let us format the id to the uuid type
  // @db.Uuid this makes sure we have the uuid type
  name        String
  slug        String   @unique(map: "product_slug_idx") //with the map() w add an index
  category    String
  images      String[]
  brand       String
  description String
  stock       Int
  price       Decimal  @default(0) @db.Decimal(12, 2)
  //@default(0) is a default with a value of 0
  //@db.Decimal(12, 2) this makes sure its a decimal , and this how you say how many digits on each side of the coma
  rating      Decimal  @default(0) @db.Decimal(12, 2)
  numReviews  Int      @default(0)
  isfeatured  Boolean  @default(false)
  banner      String?
  createdAt   DateTime @default(now()) @db.Timestamp(6)
  // @db.Timestamp(6) , this add 6 digits to the miliseconds part
}

```

### Generate Db

- add this shorcau to packah=ge json

```ts
  "postinstall": "prisma generate"
```

- run it locally

```ts
  npx prisma generate
```

### Add migration

init is the name we give to the fusrt migration

```ts
  npx prisma migrate dev --name init
```

### cehck in prisma studio

```ts
  npx prisma studio
```

### Important

if you change anything o yuor schema, then you have to generate agin!!

### add dta to DB via seeder

- we will use the ame sample data to populate our db
- create file db/seed.ts

```ts
import { PrismaClient } from '@/lib/generated/prisma'
import sampleData from './sample-data'

export async function seeder() {
  const prisma = new PrismaClient()
  await prisma.product.deleteMany()
  await prisma.product.createMany({ data: sampleData.products })
}
```

- run tsx ./db/seed // as it is a typescrip file we wont use node, we use tsx

```ts
 npx tsx ./lib/sample-data/db/seed  // it takes it from the root fro some reason
```

-it might ask to install the tsx package

```ts
generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  //@id makes it a primary key,
  // @Default() //this let us format the id to the uuid type
  // @db.Uuid this makes sure we have the uuid type
  name        String
  slug        String   @unique(map: "product_slug_idx") //with the map() w add an index
  category    String
  images      String[]
  brand       String
  description String
  stock       Int
  price       Decimal  @default(0) @db.Decimal(12, 2)
  //@default(0) is a default with a value of 0
  //@db.Decimal(12, 2) this makes sure its a decimal , and this how you say how many digits on each side of the coma
  rating      Decimal  @default(0) @db.Decimal(3, 2)
  numReviews  Int      @default(0)
  isFeatured  Boolean  @default(false)
  banner      String?
  createdAt   DateTime @default(now()) @db.Timestamp(6)
  // @db.Timestamp(6) , this add 6 digits to the miliseconds part
}

```

### Load products from database

-create action actions/productsAction

```ts
'use server'

import { converToPlainObject } from '@/hooks-regular-funtions/convertPrismaToRegularJsObject'
import { PrismaClient } from '@/lib/generated/prisma'

// get latest products
export async function getLatestProductsAction() {
  const prisma = new PrismaClient()

  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  })

  return converToPlainObject(data) //we will use a funtion to convert prisma onject to regular js objects
}
```

- convert prisma onject to regular js objects

```ts
export function converToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}
```

- I like to add a helper function to grab the data into the component, that way wejsut called the fucntion from wherever , ready to be useed

```ts
import { getLatestProductsAction } from '@/app/actions/productsAction'

export const getLatestProducts = async () => {
  const products = await getLatestProductsAction()
  return products
}
```

### Limit products

-- Add a constant frist, and itead of hardcoding the limit from prisma/action we do it this way.

```ts
'contants/index'
export const LATEST_PRODUCTS_LIMIT = Number(
  process.env.LATEST_PRODUCTS_LIMIT || 4
)
```

```ts
'.env'
LATEST_PRODUCTS_LIMIT = '4'
```

```ts
const data = await prisma.product.findMany({
  // take: 4,
  take:LATEST_PRODUCTS_LIMIT
  orderBy: { createdAt: 'desc' },
})
```

--and remeber, we could limit from here as well

      <ProductList data={products} title='Newest Arrivals' limit={3} />

```ts
<ProductList data={products} title='Newest Arrivals' limit={3} />
```

- but becasue this one is optional we could jsut remove it.

## Add / fix types and Validation via ZOD

### Lets start by creating our types file fisrt

```ts
'types/index'
```

-but instead of doing something like this:

```ts
export type Product = {
  id: string
  name: string
  ...
}
```

- we will just infere from our zod schema!

### Create Zod schemas

```ts
import { z } from 'zod'

export const InsertProductSchema = z.object({
  name: z.string().min(3, 'Name - Minimun 3 characters'),
  name: z.string().min(3, 'Name - Minimun 3 characters'), //copy paste, use control D to change name for slug, now if I do that the "N will be lower case. to fix that lets add this extension: multiple cursor case preserve  :)
})
```

```ts
import { z } from 'zod'

export const InsertProductSchema = z.object({
  name: z.string().min(3, 'Name - Minimun 3 characters'),
  slug: z.string().min(3, 'Slug - Minimun 3 characters'),
  category: z.string().min(3, 'Category - Minimun 3 characters'),
  brand: z.string().min(3, 'Brand - Minimun 3 characters'),
  description: z.string().min(3, 'Description - Minimun 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: z.string(),
})
```

- we are gonna skip the price for now, we will use a helper as it has to be presice

### lets bring the zod / schema to the types file

-so we bring what we insert..ex: form, to the type, and merg that with what we dobt insert but that we still need,

```ts
import { InsertProductSchema } from '@/zod-schema-validator/InsertProductSchema'
import { z } from 'zod'

export type Product = z.infer<typeof InsertProductSchema> & {
  id: string
  rating: string
  createdAt: Date
}
```

### replace type:any

```ts
export default function ProductCard({ product }: { product: any }) {

export default function ProductList({
  data,
  title,
  limit,
}: {
  data: any

{limitedData.map((item: any) => (
```

for

```ts
export default function ProductCard({ product }: { product: Product}) {

export default function ProductList({
  data,
  title,
  limit,
}: {
  data:

{limitedData.map((item: Product) => (
```

## Serverless environmet configuration

- we have to do this beasue we will deploy in vercel, and they use serverless functions. So yeah, this is to make the neon database funtion correctly with prisma
- why beuase actions as just serverless funtion under the hood, pretty much evrything vercel is serverless as they use thign like AWS under the hood for infrastructure

### Neon driver

```ts
'https://neon.com/docs/serverless/serverless-driver'
```

-install these packages:

```ts
npm i @neondatabase/serverless  // provides low-level connection interface to interact with the Neon serveless PostgreSQL database using WebSockets

npm i @prisma/adapter-neon  //This is an adapter specifically for Prisma to ensure Prisma can operate smoothly with Neon in serverless environtments

npm i ws  // this is a webSocket library used by the Neon adapter to stablish and manage conneticons to the Neon serverless database

npm install bufferutil
npm install -D @types/ws
```

#### explanation of the previous packges

npm i
Short for npm install — installs packages.

1. -D
   This means --save-dev — the package(s) will go under "devDependencies" in package.json.

Use this when the package is only needed during development, not in production (like TypeScript types).

2. @types/ws
   This is the TypeScript type definitions for the ws WebSocket library.

ws itself is a popular WebSocket server/client library.

If you're using TypeScript, @types/ws gives you IntelliSense and type safety.

✅ Only needed in dev (hence -D).

3. bufferutil
   This is a native addon used to optimize WebSocket performance in the ws library.

Speeds up certain operations (like masking/unmasking WebSocket frames).

It’s optional — ws works without it, but it's recommended for performance.

❌ This one is not a dev-only package — it should not be installed with -D if your app uses ws in production.

### Prisma adapter

- go to prisma folder ans grab the schema.prismam file

```ts
generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma"//not sure when we got this one!
  previewFeatures=["driverAdapters"]
}
```

- and dont forget to regenerate the cleint!

```ts
npx prisma generate
```

### configuration - Use the driver over WebSockets /prisma

```ts
https://neon.com/docs/serverless/serverless-driver#use-the-driver-over-websockets
```

```ts
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
const pool = new Pool({ connectionString })

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon(pool)

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  //we can instantiate the prisma client here and exported intead of  wheever needed
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString()
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString()
        },
      },
    },
  },
})
```

#### Configuration Isssue with Pool

```ts
💡 1. Why does the Pool exist in the first place?
The Pool from @neondatabase/serverless is an abstraction that manages multiple database connections. It:

Queues and reuses connections efficiently

Helps with performance in environments where multiple queries are fired in parallel

Is useful when you want fine-grained control over your database client (e.g. in non-Prisma apps or raw SQL)

💡 2. Why does the code sometimes work when you comment out the Pool?
Because the PrismaNeon adapter accepts either:

a pool (advanced usage)

or just a connectionString (simpler usage)

ts
Copy
Edit
// Advanced
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon({ pool })

// Simpler (your working version)
const adapter = new PrismaNeon({ connectionString })
So when you use only the connectionString, Prisma creates and manages a connection internally — which is fine for many cases (especially in serverless or small projects).

💡 3. Are you missing something important by not including the Pool?
Depends on your app:

Without Pool	With Pool
✅ Simpler setup	✅ More connection control
✅ Good for most apps	✅ Good for large-scale or complex apps
🚫 Less optimized for heavy concurrent loads	✅ Better pooling/queuing under load

In short:
If you're not doing thousands of concurrent queries or needing custom pool behavior, you're not missing anything major by skipping the Pool.

✅ TL;DR
The Pool is optional and just gives you more control and performance tuning.

Your current setup (connectionString only) is valid and supported by Prisma.

Unless you're hitting scaling issues, you're good without the Pool.

Let me know if you want a quick example comparing both side-by-side in usage or when you'd need the Pool.
```

#### New code

```ts
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.

//////////////////////////////////////////////////////////////
//COMMENT THIS OUT
// const pool = new Pool({ connectionString })
//////////////////////////////////////////////////////

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.

// const adapter = new PrismaNeon({ pool })
const adapter = new PrismaNeon({ connectionString })

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  // export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString()
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString()
        },
      },
    },
  },
})
```

## PRODUCT DETAIL PAGE

### create GetSingleproductAction

```ts
//   looks werid, right?
export default function productDetailsPage(props: {
  params: Promise<{ slug: string }>
}) {
  return <div>details page</div>
}
```

- Here is the deal, if we await, then the slug is a promise remeber! and thats how we do it now.
- but if regular slug then as below

```ts
export default async function productDetailsPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  return <div>details page</div>
}
```

- and remeber that this is how we used to do it up to next 13

```ts
// pages/product/[slug].tsx

export async function getServerSideProps(context) {
  const { slug } = context.params
  return {
    props: { slug },
  }
}

export default function ProductPage({ slug }) {
  return <div>{slug}</div>
}
```

### Add not found

```ts
import { getSingleproductAction } from '@/actions/getSingleproductAction'
import { notFound } from 'next/navigation'

export default async function productDetailsPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const singleproduct = await getSingleproductAction(slug)
  console.log(singleproduct)

  if (!singleproduct) notFound //it seems like we dont need to return here, if we do, we get an error!

  return (
    <div>
      <p>{singleproduct?.name}</p>
      <p>{singleproduct?.category}</p>
    </div>
  )
}
```

### Add content to the page

```ts
import { getSingleproductAction } from '@/actions/getSingleproductAction'
import ProductPrice from '@/components/shared/product/ProductPrice'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { notFound } from 'next/navigation'

export default async function productDetailsPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const singleproduct = await getSingleproductAction(slug)
  console.log(singleproduct)

  if (!singleproduct)
    notFound //it seems like we dont need to return here, if we do, we get an error!
  else
    return (
      <>
        <section>
          <div className='grid grid-cols-1 md:grid-cols-5  '>
            {/* IMAGES COLUMN  */}
            <div className='col-span-2'>{/* Images components  */}</div>
            {/* details column   */}
            <div className='col-span-2 p-5'>
              <div className='flex flex-col gap-6'>
                <p>
                  {singleproduct.brand} {singleproduct.category}
                </p>
                <h1 className='h3-bold'>{singleproduct.name}</h1>
                <p className=''>
                  {singleproduct.rating} of {singleproduct.numReviews} Reviews
                </p>
                <div className='felx flex-col sm:flex-row sm:items-center gap-3'>
                  {/* <ProductPrice value={Number(singleproduct.price)} /> */}
                  <ProductPrice
                    value={singleproduct.price}
                    className='w-24 rounded-full bg-green-100 py-2 px-5 text-green-700'
                  />
                </div>
              </div>
              <div className='mt-10'>
                <p className='font-semibold'>Description</p>
                <p className=''>{singleproduct.description}</p>
              </div>
              {/* Action Column  */}
              <div className='p-4 '>
                <Card>
                  <CardContent>
                    <div className='mb-2 flex justify-between'>
                      <div className=''>Price</div>
                      <div className=''>
                        <ProductPrice value={singleproduct.price} />
                      </div>
                    </div>
                    <div className='mb-2 flex justify-between'>
                      <div className=''>Status</div>
                      {singleproduct.stock > 0 ? (
                        <Badge variant={'outline'}>In Stock</Badge>
                      ) : (
                        <Badge variant={'destructive'}>Out Of Stock</Badge>
                      )}
                    </div>

                    {singleproduct.stock > 0 && (
                      <div className='flex-center'>
                        <Button className=''>Add To Cart</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </>
    )
}
```

### Add Images to page

```ts
  return (
      <>
        <section>
          <div className='grid grid-cols-1 md:grid-cols-5  '>
            {/* IMAGES COLUMN  */}
            <div className='col-span-2'>
              {/* Images components  */}
              <ProductImages images={singleproduct.images} />
```

- ProductImages.tsx

```ts
'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

export default function ProductImages({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  return (
    <div className='space-y-4'>
      <Image
        src={images[current]}
        alt={'product image'}
        width={1000}
        height={1000}
        className='min-h-[300px] object-cover object-center'
      />
      <div className='flex gap-4 justify-center'>
        {images.map((image, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'border mr-2 cursor-pointer hover:border-orange-600',
              current === i && 'border-orange-500'
            )}>
            <Image src={image} alt={image} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Initial deployment - Contimnues deployment :)

### Local build first

- We always wan to build localy fisrt to make sure things are ok.

```ts
npm run build
```

###

- copy this from git hub when creating new project
- It will creat the initial commit
- it will push initial project

```ts
git remote add origin https://github.com/heguerack/brad-store.git
git branch -M main
git push -u origin main
```

- this will add a new commit
- and will push to main once again

```ts
git branch
git checkout main
git add .
git commit -m "fisr push of changes"
git push -u origin main
```

- Lets branch out
- dont forget to branch out
- -donbt forget to puch to the new branch

```ts
git checkout -b dbsetup
git push -u origin dbsetup
```

- Now swith to main and pull from github

```ts
git checkout main
git pull origin main
```

#### Github branches lecture

```ts
Golden Rule: Never push to main directly in a team
✅ Recommended Workflow (Safe & Professional):
Work in branches (branch-1, branch-2, etc.)

When done, push to GitHub (but still on your branch)

Open a Pull Request (PR) into main

Someone (or you) reviews and merges

After merging, everyone pulls the new main

📦 Example Team Flow (You + One Teammate):
👤 You:
Work in branch-2

Push to GitHub

Open PR into main

👤 Teammate:
Work in branch-1

Also opens PR into main

Then:
Merge one of the branches first (say, branch-1)

Before merging branch-2, you pull from main into branch-2 to resolve conflicts

bash
Copy
Edit
git checkout branch-2
git pull origin main      # sync up before merging into main
Then finalize PR for branch-2

✅ Benefits:
No one breaks main

Easy to spot bugs or conflicts early

Clean, trackable history

Let me know if you want a visual diagram of this (PR flow), or I can give you a GitHub repo setup guide with branch protection rules.
```

## Authentication

- User based model
- seed user data
- next Auth setup
- sign out button
- zod schema validation
- sign up page fomr
- error handling
- JWT Callback

### Add prisma models

```ts
'https://authjs.dev/getting-started/adapters/prisma'
```

```ts
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev
```

- PostgreSQL
- /prisma/schema.prisma
- paste under product model
- -fix to your liking

#### user model

- copy /paste from docs

```ts
model User {
   // id    String    @id @default(cuid())
  id  String  @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  // name          String?
  name String @default("NO_NAME")
    // email         String    @unique
  email  String    @unique(map: "user_email_idx") //not sure of this one
  emailVerified DateTime?
  image         String?
  accounts      Account[]//remove this as we will use plain JWT
  sessions      Session[]//remove this
  // Optional for WebAuthn support
  Authenticator Authenticator[]//remove this

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- final user model
-

```ts

model User {
// id String @id @default(cuid())
id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
// name String?
name String @default("NO_NAME")
// email String @unique
email String @unique(map: "user_email_idx") //not sure of this one
// emailVerified DateTime?
emailVerified DateTime? @db.Timestamp(6)
image String?
//we add password
password String? // we leave it optional cuz we might not require a password depending on setup
// we add role
role String @default("user")
// we add address
address Json? @db.Json
// we add payment
paymentMethod String?
// createdAt DateTime @default(now())
createdAt DateTime @default(now()) @db.Timestamp(6)
updatedAt DateTime @updatedAt
}
```

#### Account model

- copy /paste from docs

```ts
model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([provider, providerAccountId])
}
```

- after fixing or amnding it

```ts
model Account {
  //  userId            String
  userId            String  @db.Uuid
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([provider, providerAccountId]) //this one is realted to user model via: Account Account[]
}
```

#### Add sesion model

- copy /paste from docs

```ts

model Session {
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

```

- after fixing or amnding it

```ts
model Session {
  // sessionToken String   @unique
  sessionToken String   @id //this way we make it the same as the primary key, which is default too, but also a primary key!
  // userId       String
  userId       String   @db.Uuid
  // expires DateTime
  expires      DateTime @db.Timestamp(6)
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  // createdAt DateTime @default(now())
  createdAt    DateTime @default(now()) @db.Timestamp(6)
  updatedAt    DateTime @updatedAt
}
```

#### Add verification Token

```ts
model VerificationToken {
  identifier String
  token      String
  expires    DateTime

  @@id([identifier, token])
}
```

- no amendments

### we gotta generetate prima client cuz we added to the table remberer!

```ts
npx prisma generate
npx prisma migrate dev --name add_user //so this is kind of like when we build in github, if you check your prisma>migrations> you will find folders for the diferen versions  :)
```

### Add user via seeder

Add these user array to the sample data in sampleData

```ts
users: [
{
name: 'John',
email: 'admin@example.com',
password: hashSync('123456', 10),
// Admin
role: 'admin',
},
{
name: 'Jane',
email: 'user@example.com',
password: hashSync('123456', 10),
// Admin
role: 'user',
},
],
```

-but before anyhting we will install bcrypt-ts-edge, which is a special one for dealing with typescript and edge or serverless funtions, it works the same as the regular bcrypt.js

```ts
npm i bcrypt-ts-edge
```

- but before we seed we must amned the file a bit

```ts
import { PrismaClient } from '@prisma/client'
import sampleData from './sample-data'

export async function seeder() {
  const prisma = new PrismaClient()
  await prisma.product.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()

  await prisma.product.createMany({ data: sampleData.products })
  await prisma.user.createMany({ data: sampleData.users })

  console.log('Database seeded successfully')
}
seeder()
```

-- ok lets seed the users

```ts
npx tsx ./lib/sample-data/db/seed
```

### Add NextAuth

```ts
npm i next-auth@beta
npm i @auth/prisma-adapter // if you havent installed it
```

#### Add .env variables

```ts
"https://next-auth.js.org/configuration/options"
- generate secret with chatgpt
NEXTAUTH_SECRET = "tG6zmsmsJ5gxSGv9lCFw7X4+SC7Zmk2n8z+a0JrxyIE"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"

```

#### Initialization

```ts
'https://authjs.dev/getting-started/installation?framework=Next.js'

'./auth.ts'

import NextAuth from 'next-auth'

// const handler = NextAuth({
//   ...
// })
// export { handler as GET, handler as POST }

export const config = {}
export const { handlers, signIn, signOut, auth } = NextAuth(
  // {providers: [],} <=config
  config
)
```

```ts
'https://next-auth.js.org/configuration/options#pages'
pages: {
  signIn: '/signin',
  // signOut: '/auth/signout',
  error: '/signin', // Error code passed in query string as ?error=
  // verifyRequest: '/auth/verify-request',
  // newUser: '/auth/new-user'
}
```

```ts
'https://next-auth.js.org/configuration/options#session'
session: {
  // Choose how you want to save the user session.
  // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
  // If you use an `adapter` however, we default it to `"database"` instead.
  // You can still force a JWT session by explicitly defining `"jwt"`.
  // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  // which is used to look up the session in the database.
  strategy: "database",

  // Seconds - How long until an idle session expires and is no longer valid.
  maxAge: 30 * 24 * 60 * 60, // 30 days

  // Seconds - Throttle how frequently to write to database to extend a session.
  // Use it to limit write operations. Set to 0 to always update the database.
  // Note: This option is ignored if using JSON Web Tokens
  updateAge: 24 * 60 * 60, // 24 hours

  // The session token is usually either a random UUID or string, however if you
  // need a more customized session token string, you can define your own generate function.
  generateSessionToken: () => {
    return randomUUID?.() ?? randomBytes(32).toString("hex")
  }
}
```

- "https://next-auth.js.org/configuration/providers/credentials"
- Bring prisma adapter and object
- -add session
- add providers
- add adapters
- Add pages
- Add callbacks

```ts
import NextAuth from 'next-auth'
import { prisma } from './lib/sample-data/db/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getSingleUserAcion } from './actions/getSingleUserAcion'

import type { NextAuthConfig } from 'next-auth'

type Credentials = {
  email?: string
  password?: string
}

export const config = {
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },

      //credentials here is really the data/credentailas coming from database
      async authorize(credentials, req) {
        if (credentials == null) return null
        const user = getSingleUserAcion(credentials as Credentials)
        return user
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // Set the user ID from the token
      session.user.id = token.sub

      //if there is an update, set the user name, we do this one becasue users will be able to update their profile
      if (trigger === 'update') {
        session.user.name = user.name
      }

      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
```

#### Next auth catch all api

```ts
'https://next-auth.js.org/configuration/initialization#route-handlers-app'

'/app/api/auth/[...nextauth]/route.ts'
```

```ts
// import NextAuth from 'next-auth'
//we kind of fdid this in a separate file, so we will just import that logic hre
// const handler = NextAuth({
//   ...
// })
// export { handler as GET, handler as POST }
import { handlers } from '@/auth'

export const { GET, POST } = handlers
```

#### test connection

```ts
'http://localhost:3000/api/auth/session'
```

#### Create Sign-in page

```ts
'/app/(auth)/sign-in/page.tsx'
export default function page() {
  return <div>page</div>
}
```

#### Create layout

```ts
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='flex-center w-full min-h-screen'>{children}</div>
}
```

- schema

```ts
import { z } from 'zod'

export const signInFormSchema = z.object({
  emai: z.string().email('Invalid Email Address'),
  password: z.string().min(6, 'Passwird  has to be at least 6 characters long'),
})
```

- action
  -sign in

```ts
import { signIn, signOut } from '@/auth'

export async function SignOutUser() {
  await signOut()
}
```

- action
- sign out

#### create Signin with credential hook

```ts
'use server'

import { signInFormSchema } from '@/zod-schema-validator/signInFormSchema'
import { signIn, signOut } from '@/auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function SignInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    await signIn('credentials', user)
    return {
      success: true,
      message: 'Signed In successfully',
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return {
      success: false,
      message: 'Invalid email or password', //we dont wanna give back the real reason like if email or pasword cuz of security reasos
    }
  }
}
```

#### Finished sign in page

```ts
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { APP_NAME } from '@/lib/contants'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function page() {
  return (
    <div className='w-full max-w-md mx-auto '>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href={'/'} className='flex-center'>
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              width={100}
              height={100}
              priority={true}
            />
          </Link>
          <CardTitle className='text-center'>Sing In</CardTitle>
          <CardDescription>Sing in to your account</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>form here</CardContent>
      </Card>
    </div>
  )
}
```

### Add Sing In form

- create it and bring it to sign in page

```ts
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInDefaultValue } from '@/lib/contants'
import Link from 'next/link'

export default function SigninFormWithCredentials() {
  return (
    <form className='space-y-6 '>
      <div className=''>
        <Label htmlFor='email' className=''>
          Email
        </Label>
        <Input
          id='email'
          name='email'
          type='email'
          required
          autoComplete='email'
          defaultValue={signInDefaultValue.email}
        />
      </div>
      <div className=''>
        <Label htmlFor='password' className=''>
          Password
        </Label>
        <Input
          id='password'
          name='password'
          type='password'
          required
          autoComplete='password'
          defaultValue={signInDefaultValue.password}
        />
      </div>
      <div className=''>
        <Button className='w-full' variant={'default'}>
          Sign In
        </Button>
      </div>
      <div className='text-sm text-center text-muted-foreground'>
        Don&apos;t have an account{' '}
        <Link href={'/sign-up'} target='_self' className='link'>
          Sign Up
        </Link>
      </div>
    </form>
  )
}
```

#### Hook up sign in form

```ts
'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInDefaultValue } from '@/lib/contants'
import Link from 'next/link'
import { useActionState } from 'react' //new
import { SignInWithCredentialsAction } from '@/actions/users/SignInWithCredentialsAction' //new
import SigninButton from './SigninButton' //new

export default function SigninFormWithCredentials() {
  const [data, action] = useActionState(SignInWithCredentialsAction, {
    //so this is very cool becasue we set the following but then it get replaced by the return object
    success: false,
    message: '',
  })
  return (
    <form className='space-y-6 ' action={action}>
      <div className=''>
        <Label htmlFor='email' className=''>
          Email
        </Label>
        <Input
          id='email'
          name='email'
          type='email'
          required
          autoComplete='email'
          defaultValue={signInDefaultValue.email}
        />
      </div>
      <div className=''>
        <Label htmlFor='password' className=''>
          Password
        </Label>
        <Input
          id='password'
          name='password'
          type='password'
          required
          autoComplete='password'
          defaultValue={signInDefaultValue.password}
        />
      </div>
      <div className=''>
        <SigninButton />
        //new
      </div>
      {data && !data.success && (
        <div className='text-center text-destructive'>{data.message}</div>
      )}
      <div className='text-sm text-center text-muted-foreground'>
        Don&apos;t have an account{' '}
        <Link href={'/sign-up'} target='_self' className='link'>
          Sign Up
        </Link>
      </div>
    </form>
  )
}
```

- Add signinButton

```ts
'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

export default function SigninButton() {
  const { pending } = useFormStatus()
  return (
    <Button className='w-full' variant={'default'} disabled={pending}>
      {pending ? 'Signing...' : 'Sign In'}
    </Button>
  )
}
```

- Add redirect once submitted

#### Add redurect if signed in

```ts
'app/auth/sign-in/'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

// export default  function page() { // add async to await
export default async function page() {
  const session = await auth() //and this is how we get the session in a sever component, for  thew client its a bit direferne, with a hook
  if (session) {
    return redirect('/')
  }
    return (...
```

#### Add callback redirect

- "/sign-in/page.tsx"

```ts
//this is how we grab the searchparams in a async funtion (server)
export default async function page(props: {
  searchparams: Promise<{  //this is similar as to how we grab the param on async funtion
    callbackUrl: string
  }>
  }) {...
  const { callbackUrl } = await props.searchParams

  const session = await auth() //existing

  if (session) {
      // return redirect('/')
      return redirect(callbackUrl)
    }
```

- Now on the actiual form

```ts
//this is how we grab the searchparams ina client component
// we will get the callback url amd submitted (hidden) in the form
//Im guessing we eend this to redirect depending on wo is signin in? its not really clear to me why we are doing this in the signin. or maybe the url will be saved locally so that we redirect the user to the last visited page?
import { useSearchParams } from 'next/navigation'
export default function SigninFormWithCredentials() {...
  const [data, action] = useActionState(SignInWithCredentialsAction, {
    success: false,
    message: '',
  })

  const searchParam = useSearchParams()
  const callbackUrl = searchParam.get('callbackUrl') || '/'


   <form className='space-y-6 ' action={action}>...
      <input type='hidden' name='callbackRul' value={callbackUrl}/>//new
```

### User Button and Sign in

- "/components/header/menu"
- replace both sign-in buttons, cut the button, creat new component

```ts
<Button asChild variant={'default'}>
  <Link href={'/sign-in'}>
    <ShoppingCart />
    Sign In
  </Link>
</Button>
```

- for a new component UserButton

```ts
    import { Button } from '@/components/ui/button'
    import { ShoppingCart } from 'lucide-react'
    import Link from 'next/link'
    import { auth } from '@/auth'
  -export default async function UserButton() {
  const session = await auth()


return (
<Button asChild variant={'default'}>

<Link href={'/sign-in'}>
<ShoppingCart />
Sign In
</Link>
</Button>
)
}
```

#### Small review, how we bring the session on server vs client

- server

```ts
import { auth } from '@/auth'
const session = await auth()
```

- client

```ts
'use client'

import { useSession } from 'next-auth/react'

export default function ClientComponent() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>You must be logged in</p>

  return <p>Welcome {session.user.name}</p>
}
```

#### Finished userButton

```ts
import { Button } from '@/components/ui/button'
import { ShoppingCart, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutUser } from '@/actions/users/SignOutUser'

export default async function UserButton() {
  const session = await auth()
  if (!session)
    return (
      <Button asChild variant={'default'}>
        <Link href={'/sign-in'}>
          <UserIcon /> Sign In
        </Link>
      </Button>
    )

  const fisrtInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U'
  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex items-center'>
            <Button
              variant={'ghost'}
              className='flex relative w-8 h-8 rounded-full ml-2 items-center justify-center bg-gray-200'>
              {fisrtInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <div className='text-sm font-medium leading-none'>
                {session.user?.name}
              </div>
              <div className='text-sm text-muted-foreground leading-none'>
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className='p-0 mb-1'>
            <form action={SignOutUser} className='w-full'>
              <Button
                className='w-full py-4 px-2 h-4 justify-start'
                variant={'ghost'}>
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
```

### Sign Up

#### Set up action and zod schema

- zod schema

```ts
import { z } from 'zod'

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
```

- Action

```ts
import { signIn } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'
import { signUpFormSchema } from '@/zod-schema-validator/signUpFormSchema'
import { hashSync } from 'bcrypt-ts-edge'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function signUpAction(prevState: unknown, formData: FormData) {
  // console.log(formData)

  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConfirm: formData.get('password'),
    })
    const plainPassword = user.password // this becasue we need the plain pasword for signing ig right after signing up...and the thing is that we will hash the paswrod below. so thast why
    user.password = hashSync(user.password, 10)

    const newCreateduser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })
    //if the new user is created sucessfully, we will also make sure is signed in right away

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    })
    return {
      success: true,
      message: 'user registred succesfully successfully',
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.log(error)

    return {
      success: false,
      message: 'User was not resiteredm, something went wrong', //we dont wanna give back the real reason like if email or pasword cuz of security reasos
    }
  }
}
```

#### Sign up Page

- we pretty much coy the whole folder from sign-in, and amned/fix stuff as required

- so this is the page

```ts
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { APP_NAME } from '@/lib/contants'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
// import SigninFormWithCredentials from './SigninFormWithCredentials'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import SignupFormWithCredentials from './SignupFormWithCredentials'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default async function page(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const { callbackUrl } = await props.searchParams

  const session = await auth()

  if (session) {
    // return redirect('/')
    return redirect(callbackUrl || '/')
  }

  return (
    <div className='w-full max-w-md mx-auto '>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href={'/'} className='flex-center'>
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              width={100}
              height={100}
              priority={true}
            />
          </Link>
          <CardTitle className='text-center'>Sing Up</CardTitle>
          <CardDescription>Create your accout</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <SignupFormWithCredentials />
        </CardContent>
      </Card>
    </div>
  )
}
```

- and this is the form

```ts
'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInDefaultValue } from '@/lib/contants'
import Link from 'next/link'
import { useActionState } from 'react'
import { signUpAction } from '@/actions/users/signUpAction'
import { useSearchParams } from 'next/navigation'
import SignupButton from './SignupButton'

export default function SignupFormWithCredentials() {
  const [data, action] = useActionState(signUpAction, {
    success: false,
    message: '',
  })

  const searchParam = useSearchParams()
  const callbackUrl = searchParam.get('callbackUrl') || '/'

  return (
    <form className='space-y-6 ' action={action}>
      <input type='hidden' name='callbackRul' value={callbackUrl} />
      <div className=''>
        <Label htmlFor='name' className=''>
          Name
        </Label>
        <Input id='name' name='name' type='name' required autoComplete='name' />
      </div>
      <div className=''>
        <Label htmlFor='email' className=''>
          Email
        </Label>
        <Input
          id='email'
          name='email'
          type='email'
          required
          autoComplete='email'
          defaultValue={signInDefaultValue.email}
        />
      </div>
      <div className=''>
        <Label htmlFor='password' className=''>
          Password
        </Label>
        <Input
          id='password'
          name='password'
          type='password'
          required
          autoComplete='password'
          defaultValue={signInDefaultValue.password}
        />
      </div>
      <div className=''>
        <Label htmlFor='passwordConfirm' className=''>
          PasswordConfirm
        </Label>
        <Input
          id='passwordConfirm'
          name='passwordConfirm'
          type='password'
          required
          autoComplete='passwordConfirm'
        />
      </div>
      <div className=''>
        <SignupButton />
      </div>
      {data && !data.success && (
        <div className='text-center text-destructive'>{data.message}</div>
      )}
      <div className='text-sm text-center text-muted-foreground'>
        Already have an account{' '}
        <Link href={'/sign-up'} target='_self' className='link'>
          Sign Up
        </Link>
      </div>
    </form>
  )
}
```

- and this s the sign up button

```ts
'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

export default function SignupButton() {
  const { pending } = useFormStatus()
  return (
    <Button className='w-full' variant={'default'} disabled={pending}>
      {pending ? 'Signing up...' : 'Sign Up'}
    </Button>
  )
}
```

#### lets work on error handling a bit

- ok the way I did is by making a request to check if email is taken, if so then return false with message.
- here it is

```ts
// checkUserEmail
if (checkUserEmail) {
  return {
    success: false,
    message: 'User Alreadytaken!!', //we dont wanna give back the real reason like if email or pasword cuz of security reasos
  }
}
```

- now ther way Brad did seems to be the right way as we can grab the error from th response , play some magic, and boom.
- here is the link for his approach

```ts
'https://www.udemy.com/course/nextjs-ecommerce-course/learn/lecture/47560401'
```

#### Customize token with JWT

```ts
import NextAuth from 'next-auth'
import { prisma } from './lib/sample-data/db/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getSingleUserAcion } from './actions/users/getSingleUserAcion'

import type { NextAuthConfig } from 'next-auth'
import { log } from 'console'

type Credentials = {
  email?: string
  password?: string
}

export const config = {
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },

      //credentials here is really the data/credentailas coming from database
      async authorize(credentials, req) {
        if (credentials == null) return null
        const user = getSingleUserAcion(credentials as Credentials)
        return user
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // Set the user ID from the token id
      console.log(token)
      session.user.id = token.sub
      console.log(token)
      //we do this after we have set the role in the token via jwt
      session.user.role = token.role
      session.user.name = token.name
      console.log(token)
      //if there is an update, set the user name, we do this one becasue users will be able to update their profile

      if (trigger === 'update') {
        session.user.name = user.name
      }

      return session
    },
    // But if you want to modify the token
    // to customize your token we gotta use jwt
    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to the token
      if (user) {
        token.role = user.role
        //if user has no name then use email, sey they used ghoogle to sign in.
        if (user.name === 'NO_NAME') {
          //same
          token.name = user.email!.split('@')[0]
          // update database to reflec the token name, so basically if the person signedup with a social credential, then it has no name, no"NO_NAME"  will be created as a naem. the idea is that as soon as that happens, we fired but updating the name with the fisrt part of the enail
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          })
        }
      }
      return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
```

##### console.log(console.log('Session:', session))

```ts
Session: {
  user: {
    name: 'vale',
    email: 'vale@gmail.com',
    image: undefined,
    id: '9292b521-0a1f-4c3b-b8a1-83e7715f5751'
  },
  expires: '2025-07-19T11:24:14.537Z'
}
```

##### console.log(console.log(token))

```ts
{
  name: 'vale',
  email: 'vale@gmail.com',
  sub: '9292b521-0a1f-4c3b-b8a1-83e7715f5751',
  iat: 1750332254,
  exp: 1752924254,
  jti: '7f7c9920-0b47-4d0d-b619-8830f717b3e5'
}
```

##### Not type for USer?

- just nitice that for the user we didnt realy set up the types. like we have a user model via prisma, and then ouer userSchema , chich we use to create users. but they dont mutch, oiue typoe really is the zod schema not the prisma model. Lik eprisma set up the model, and the we creat users with par tof that model, then wecan udjust ior amend the user via jwt, token.

##### Quick lecture on callbacks first

1. signIn(user, account, profile)
   Controls if a user can sign in.
   Return true, false, or a redirect URL.

2. redirect({ url, baseUrl })
   Controls where users are redirected after sign in / sign out.

3. session({ session, token, user })
   Customize the session object returned to the client.

4. jwt({ token, user, account, profile, isNewUser })
   Modify or persist JWT token on sign in.

```ts
callbacks: {
  async signIn({ user, account, profile }) {
    return true; // or check conditions
  },
  async redirect({ url, baseUrl }) {
    return baseUrl; // or a specific path
  },
  async session({ session, token, user }) {
    session.user.id = token.id;
    return session;
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    if (user) token.id = user.id;
    return token;
  },
}

```

## Add to Cart

- cart Schema / Model
- Next Auth call back
- Add to cart Component
- Cart Actions
- Dynamic Cart Button
- useTransiton hook

### cart Schema / Model

```ts
import { z } from 'zod'
import { currencySchema } from './currencySchema'

export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  name: z.string().min(1, 'name is required'),
  slug: z.string().min(1, 'slug is required'),
  qty: z.number().int().nonnegative('Queantity must be a positve number'),
  image: z.string().min(1, 'PImage is required'),
  price: currencySchema,
})

export const inserCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsprice: currencySchema,
  totalPrice: currencySchema,
  shippingPrice: currencySchema,
  taxPrice: currencySchema,
  sessionCartId: z.string().min(1, 'Session cart id is required'),
  userID: z.string().optional().nullable(), //becasue we will let users add items to the cart , vene if they are not logged in. but as they go through and they cjheck out, they have to login, and we will still have the data inthe cart as we will create a sesion for it.
})
```

#### ad types

```ts
export type CartItemType = z.infer<typeof cartItemSchema>

export type CartType = z.infer<typeof inserCartSchema>
```

#### Add to prisma

- but before that io just niticed or realized that i cna set the prsma table with a bunch of optional fields, that could be used after, like giving option to users to create fileds, but they have to chhose from the fileds in the table. something ive been thinking about it for a long time, butstill not sure how to implement, maybe this is the way!!

```ts
model Cart {
  id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId        String?  @db.Uuid
  sessionCartId String
  items         Json[]   @default([]) @db.Json
  itemsPrice    Decimal  @db.Decimal(12, 2)
  totalPrice    Decimal  @db.Decimal(12, 2)
  shippingPrice Decimal  @db.Decimal(12, 2)
  taxPrice      Decimal  @db.Decimal(12, 2)
  updatedAt     DateTime @default(now()) @db.Timestamp(6)
  user          User?    @relation(fields: [userId], references: [id], onDelete: Cascade) // i made the suer optional, bacause agai, we might not the the user to start with the cart or transsation
}
```

- dont forget to npx prisma generate

```ts
npx prisma generate
```

- and dont forget to migrate!!

```ts
npx prisma migrate dev --name add-cart
```

### Add to cart Component

```ts
'use client'

import { CartItemType } from '@/types'

export default function AddToCart({ item }: { item: CartItemType }) {
  return <div>AddToCart</div>
}
```

#### Add component to page

```ts
'/app/roo.product/[slug]/page'
   {singleproduct.stock > 0 && (
      <div className='flex-center'>
        <Button className=''>Add To Cart</Button>//replce this button for the actual add to cart item component
      </div>
    )}
   </CardContent>
  </Card>
```

```ts
 {singleproduct.stock > 0 && (
      <div className='flex-center'>
        {/* so it seems that because this schema does not really match the miodel, when we get the product , we make it a cartItem by filtering the data that we need to please our schema....so we kind of destructure before passing the cartItemObject */}
        // So yeah basically ce create the product from the cart item...another way we could have done this is by creatin ght ecartItem, then extending it to become a product item
        <AddItemToCart
          item={{
            productId: singleproduct.id,
            name: singleproduct.name,
            slug: singleproduct.slug,
            price: singleproduct.price,
            qty: 1,
            image: singleproduct.images[0],
          }}
        />
      </div>
      )}
    </CardContent>
  </Card>
```

- work on the actual component now
- Add sonner from shadcn first....toast is deprecated

```ts
  disableTransitionOnChange>
    {children}
    <Toaster />// here
```

- set up / initalize toast

#### Create AddItemToCartAction

- just creat a quick action that retursns sucess, we will fix it later

```ts
'use server'

import { CartItemType } from '@/types'

export async function addItemToCartAction(data: CartItemType) {
  return {
    success: true,
    message: 'Item added to Cart',
  }
}
```

#### Cart Item Component

```ts
'use client'

import { addItemToCartAction } from '@/actions/cart/addItemToCartAction'
import { Button } from '@/components/ui/button'
import { CartItemType } from '@/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function AddItemToCart({ item }: { item: CartItemType }) {
  const router = useRouter()

  const handleAddToCart = async () => {
    const res = await addItemToCartAction(item) // remember this action is returning success but in fact is doing nothing! just so that we can create our logic really
    if (!res.success) {
      toast.error(res.message)
      return
    }

    // handle sucees add to cart
    toast.success(`${item.name} added to cart`, {
      action: {
        label: 'Go to cart',
        onClick: () => router.push('/cart'),
      },
    })
  }

  return (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      AddToCart
    </Button>
  )
}
```

- My way

```ts
    toast(
      <div className='flex justify-between items-center w-full'>
        <span>{item.name} added to cart</span>
        <Button
          onClick={() => router.push('/cart')}
          className='bg-primary text-white hover:bg-gray-800'>
          Go to cart
        </Button>
      </div>,
      {
        duration: 5000, // optional, in ms
      }
    )
  }
```

#### Create cart cookie - Next Auth call back

- the idea is to creat a cooki when added to cart, so that we saved that info lcaolly in case its require afetr logginh in. remeber that the user can add to cart without beeing logged in. thats why we do this!! so it will be created as soon as they come to the site

- authorized(): Invoked when a user needs authorization, using Middleware. You can override this behavior by returning a NextResponse.

```ts
'https://authjs.dev/reference/nextjs#authorized'
```

##### create middleware fisrt

```ts
'https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side'
```

- we create it fist otherwise the authorize worn work
- this is all we need

```ts
'./middleawre.ts'
export { auth as middleaware } from '@/auth'
```

##### add logic to ./auth.ts

```ts
authorized({ request, auth }: any) {
    //check for session cart cookie
    if (!request.cookie.get('sessionCardId')) {
      //generate new sesion cart id cookie
      const sessionCartId = crypto.randomUUID // <= and where the hech is tis crypto coming from?
      console.log(sessionCartId) // to test the create cookie. remeber we havet assigned the cooki yet, we just created it
      return true
    } else {
      return true
    }
  },
```

- ok, somehow the repvious is not wprking, lets try a difrent approach
- create a new auth.config.ts file
- Add the following imports:

import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

- the following was taken form a fix from brad...not sure how we got here :(

```ts

```

- Just remove auithorized form the main auth , create a new auth.config, here we add the authorzie routes, and also the cookie creation thing for the cart
- Thus, the new files look like this

```ts
'/auth.ts'
import NextAuth from 'next-auth'
import { prisma } from './lib/sample-data/db/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getSingleUserAcion } from './actions/users/getSingleUserAcion'

import type { NextAuthConfig } from 'next-auth'
import { authConfig } from './auth.config'

type Credentials = {
  email?: string
  password?: string
}

export const config = {
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  session: {
    strategy: 'jwt' as const, // i added the as const when fiixng or adding the auth.config
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },

      //credentials here is really the data/credentailas coming from database
      async authorize(credentials, req) {
        if (credentials == null) return null
        const user = getSingleUserAcion(credentials as Credentials)
        return user
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, user, trigger, token }: any) {
      // Set the user ID from the token id
      // console.log(token)
      session.user.id = token.sub
      // console.log(token)
      //we do this after we have set the role in the token via jwt
      session.user.role = token.role
      session.user.name = token.name
      // console.log(token)
      //if there is an update, set the user name, we do this one becasue users will be able to update their profile

      if (trigger === 'update') {
        session.user.name = user.name
      }

      return session
    },
    // But if you want to modify the token
    // to customize your token we gotta use jwt
    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to the token
      if (user) {
        token.role = user.role
        //if user has no name then use email, sey they used ghoogle to sign in.
        if (user.name === 'NO_NAME') {
          //same
          token.name = user.email!.split('@')[0]
          // update database to reflec the token name, so basically if the person signedup with a social credential, then it has no name, no"NO_NAME"  will be created as a naem. the idea is that as soon as that happens, we fired but updating the name with the fisrt part of the enail
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          })
        }
      }
      return token
    },
    //this one got added in a diferen manner on the auth.config
    // authorized({ request, auth }: any) {
    //   //check for session cart cookie
    //   if (!request.cookies.get('sessionCartId')) {
    //     //generate new sesion cart id cookie
    //     const sessionCartIdd = crypto.randomUUID() // <= and where the hech is tis crypto coming from?
    //     console.log('newly sessionCartId: ', sessionCartIdd)
    //     return true
    //   } else {
    //     console.log(request.cookies.get('sessionCartId'))

    //     return true
    //   }
    // },
  },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
```

- and the new auth.config looks like this....it has the protected routes too, we havent got there yet, but its

```ts
import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

//This will now use the auth.config.ts file for the configuration and the auth.ts file for the middleware function.
export const authConfig = {
  providers: [], // Required by NextAuthConfig type
  callbacks: {
    authorized({ request, auth }: any) {
      // Array of regex patterns of paths we want to protect
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ]

      // Get pathname from the req URL object
      const { pathname } = request.nextUrl

      // Check if user is not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false

      // Check for session cart cookie
      if (!request.cookies.get('sessionCartId')) {
        // Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID()

        // Create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: new Headers(request.headers),
          },
        })

        // Set newly generated sessionCartId in the response cookies
        response.cookies.set('sessionCartId', sessionCartId)

        return response
      }

      return true
    },
  },
} satisfies NextAuthConfig
```

##### bring cooki to the action,

- to select the product or item and have ready for db as cart item
- so that we can deal with our items in the cart

```ts
'use server'

import { CartItemType } from '@/types'

export async function addItemToCartAction(data: CartItemType) {
  return {
    success: true,
    message: 'Item added to Cart',
  }
}
```

- so here is how it looks so far

```ts
'use server'

import { auth } from '@/auth'
import { CartItemType } from '@/types'
import { cookies } from 'next/headers'

export async function addItemToCartAction(data: CartItemType) {
  try {
    // check fo rhte cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('cart session not found')

    // get session and userID
    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined

    //testing
    console.log({
      'session Cart Id': sessionCartId,
      'user DI': userId,
    })
    return {
      success: true,
      message: 'Item added to Cart',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Item was not added to Cart',
    }
  }
}
```

- and follows as this, but before we will creat the getMyCartAction

```ts
'use server'
import { cookies } from 'next/headers'
import { auth } from '@/auth'
import { converToPlainObject } from '@/helperFuntions/convertPrismaToRegularJsObject'
import { prisma } from '@/lib/sample-data/db/prisma'
import { CartItemType } from '@/types'

export async function getMyCartAction() {
  // check fo rhte cart cookie
  const sessionCartId = (await cookies()).get('sessionCartId')?.value
  if (!sessionCartId) throw new Error('cart session not found')

  // get session and userID
  const session = await auth()
  const userId = session?.user?.id ? (session.user.id as string) : undefined // this way we dont get an error :)

  // get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId }, // so the cart has userid attached. but if not looged in, then the sessionCartId will be attched. thus, when paying we wil have the info via userId or sessionCartId, regardless if logged in or not
  })

  if (!cart) return undefined

  // is there is , cob=vert to decinmal and return
  return converToPlainObject({
    ...cart,
    items: cart.items as CartItemType[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  })
}
```

```ts
'use server'

import { auth } from '@/auth'
import { CartItemType } from '@/types'
import { cookies } from 'next/headers'
import { getMyCartAction } from './getMyCartAction'
import { cartItemSchema } from '@/zod-schema-validator/cartSchemas'

export async function addItemToCartAction(data: CartItemType) {
  try {
    // check fo rhte cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('cart session not found')

    // get session and userID
    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined // this way we dont get an error :)

    //logic here
    const cart = await getMyCartAction()

    // parse and validate item
    const item = cartItemSchema.parse(data)

    //testing
    console.log({
      'session Cart Id': sessionCartId,
      'user DI': userId,
      'Item requested': item,
    })

    return {
      success: true,
      message: 'Item added to Cart',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Item was not added to Cart',
    }
  }
}
```

- get preoduct

```ts
'use server'

import { auth } from '@/auth'
import { CartItemType } from '@/types'
import { cookies } from 'next/headers'
import { getMyCartAction } from './getMyCartAction'
import { cartItemSchema } from '@/zod-schema-validator/cartSchemas'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function addItemToCartAction(data: CartItemType) {
  try {
    // check fo rhte cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('cart session not found')

    // get session and userID
    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined // this way we dont get an error :)

    //logic here
    const cart = await getMyCartAction()

    // parse and validate item
    const item = cartItemSchema.parse(data)

    // now find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    })

    //testing
    console.log({
      // so basically this is the object we need!!
      'session Cart Id': sessionCartId,
      'user DI': userId,
      'Item requested': item,
      'Product Found': product,
    })

    return {
      success: true,
      message: 'Item added to Cart',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Item was not added to Cart',
    }
  }
}
```

##### add items to cart in db

- remeber we set the cart model so that the items were there as a empty array, so we will just push item by item
- if items has been added then just increase its quantity
- do all the math when done adding, or maybe as we add?
- remove quanty form prodct, as we have items in stock
-

###### create helper function to round numbers...totals

```ts
export const roundTwoDecimals = (value: number) => {
  if (typeof value === 'number') {
    //The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1 that is representable as a Number value, which is approximately: 2.2204460492503130808472633361816 x 10‍−‍16.
    //use to avoid errors when rounding , just how computers work
    //following logic ==> ex: 12.345*100=1234.5, then when we round we get 1235, we then divede by  100 so we get 12.35; so this is just a little trick to make life easier :)
    return Math.round((value + Number.EPSILON) * 100) / 100
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100
  } else {
    throw new Error('value is not a number or a string :(')
  }
}
```

##### create calculatePriceHelper

```ts
import { CartItemType } from '@/types'
import { roundTwoDecimals } from './roundNumberTwoDecimals'

export const calculateCartPrices = (items: CartItemType[]) => {
  const itemsPrice = roundTwoDecimals(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  )

  const shippingPrice = roundTwoDecimals(itemsPrice > 100 ? 0 : 100) //lol this logic, so lame

  const taxPrice = roundTwoDecimals(itemsPrice * 0.15)

  const totalPrice = itemsPrice + shippingPrice + taxPrice

  return {
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
  }
}
```

#### fixing bugs

```ts
import { CartItemType } from '@/types'
import { roundTwoDecimals } from './roundNumberTwoDecimals'

export const calculateCartPrices = (items: CartItemType[]) => {
  const itemsPrice = roundTwoDecimals(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  )

  const shippingPrice = roundTwoDecimals(itemsPrice > 100 ? 0 : 10) //lol this logic, so lame

  const taxPrice = roundTwoDecimals(itemsPrice * 0.15)

  const totalPrice = itemsPrice + shippingPrice + taxPrice
  console.log(typeof itemsPrice.toString(), itemsPrice.toString())

  return {
    itemsPrice: itemsPrice.toString(),
    shippingPrice: shippingPrice.toString(),
    taxPrice: taxPrice.toString(),
    totalPrice: roundTwoDecimals(totalPrice).toString(),
  }
}
```

```ts
export const roundTwoDecimals = (value: number) => {
  if (typeof value === 'number') {
    //The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1 that is representable as a Number value, which is approximately: 2.2204460492503130808472633361816 x 10‍−‍16.
    //use to avoid errors when rounding , just how computers work
    //following logic ==> ex: 12.345*100=1234.5, then when we round we get 1235, we then divede by  100 so we get 12.35; so this is just a little trick to make life easier :)
    return Math.round((value + Number.EPSILON) * 100) / 100
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100
  } else {
    throw new Error('value is not a number or a string :(')
  }
}
```

```ts
import { formatNumberWithDecimal } from '@/helperFuntions/formatNumberWithDecimal'
import { z } from 'zod'

export const currencySchema = z.string().refine(
  // (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
  (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
  'price must have two decimal places'
)
```

```ts
import { z } from 'zod'
import { currencySchema } from './currencySchema'

// so it seems that because this schema does not really match the miodel, when we get the product , we make it a cartItem by filtering the data that we need to please our schema....so we kind of destructure before passing the cartItemObject
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  name: z.string().min(1, 'name is required'),
  slug: z.string().min(1, 'slug is required'),
  qty: z.number().int().nonnegative('Queantity must be a positve number'),
  image: z.string().min(1, 'PImage is required'),
  price: currencySchema,
})

export const inserCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currencySchema,
  totalPrice: currencySchema,
  shippingPrice: currencySchema,
  taxPrice: currencySchema,
  sessionCartId: z.string().min(1, 'Session cart id is required'),
  userId: z.string().optional().nullable(), //becasue we will let users add items to the cart , vene if they are not logged in. but as they go through and they cjheck out, they have to login, and we will still have the data inthe cart as we will create a sesion for it.
})
```

#### Add more items to cart

- my failed approach :(

```ts
 else {
      console.log(cart)
      //  if(cart.items.includes( productId===item.productId))
      const hasItem = cart.items.filter(
        (cartIitem) => cartIitem.productId === item.productId
      )
      console.log('HasItem: ', hasItem)
      // check stok, make sure we have enuough
      if(hasItem){
         console.log('hasItem: ', hasItem[0])
        cart.items[0].qty = cart.items[0].qty + 1
        console.log('new item qty: ', cart.items[0].qty)
      }
    }
```

- brads way

```ts
//if item does not exists (or doesnt have the itme in cart)
//check stock
if (product.stock < 1) throw new Error('Not enough stock')
//add item to the cart.items
cart.items.push(item)
```

### remove from cart

- my attempt, i tested and it works fine!!
- - we will compare to brads though

```ts
<Button
  className='w-full bg-red-700 hover:bg-red-800'
  type='button'
  onClick={handleRemoveItem}>
  remove from Cart
</Button>
```

- my attempt action

```ts
'use server'
'use server'

import { auth } from '@/auth'
import { cookies } from 'next/headers'
import { getMyCartAction } from './getMyCartAction'
import { prisma } from '@/lib/sample-data/db/prisma'
import { calculateCartPrices } from '@/helperFuntions/calculateCartPrices'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { type } from 'node:os'

export async function removeItemFromCartAction(id: string) {
  try {
    console.log('removing item from cart')

    //check cartCoookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('cart session not found')

    // // get session and userID
    // const session = await auth()
    // const userId = session?.user?.id ? (session.user.id as string) : undefined

    // now find product in database
    const product = await prisma.product.findFirst({
      where: { id: id },
    })
    if (!product) throw new Error('Product not found')

    //getcart
    const cart = await getMyCartAction()
    if (!cart) throw new Error('cart now found')

    // remove item from cart
    let itemToProcess = cart.items.find((cartItem) => cartItem.productId === id)
    if (!itemToProcess) throw new Error('Not item to process')

    // if quantity===0 just remove the item
    if (itemToProcess.qty === 1) {
      const filteredCart = cart.items.filter((item) => item.productId !== id)
      console.log('filteredCart :', filteredCart)
      //remove item/product and update database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: filteredCart,
        },
      })
    } else {
      itemToProcess.qty = itemToProcess.qty - 1
      console.log(itemToProcess.qty)
      //save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[], //this is just a type ting, making sure its good
          ...calculateCartPrices(cart.items),
        },
      })
    }

    //revalidatePath
    revalidatePath(`/product/${product.slug}`)
    return {
      success: true,
      message: `${product.name} removed from cart`,
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,

      message: 'Item was not removed  from Cart',
    }
  }
}
```

- ok, and this is what i had for controllers/buttons

  ```ts
  {
    /* {!goToCart ? (
        <Button className='w-full ' type='button' onClick={handleAddToCart}>
          + Add To Cart
        </Button>
      ) : (
        <Button
          className='w-full bg-red-700 hover:bg-red-800'
          type='button'
          onClick={handleRemoveItem}>
          remove from Cart
        </Button>
      )}
  
      {goToCart && (
        <Button asChild className='w-full bg-green-900' type='button'>
          <Link href={'/cart'}>Go To Cart</Link>
        </Button>
      )} */
  }
  ```

- We will now instead do it like brds just to follow his design

#### Add dynamic button

```ts
'/product/[slug]/page.tsx'

import { getMyCartAction } from '@/actions/cart/getMyCartAction'
const cart = await getMyCartAction()


<AddItemToCart
    cart={cart} // new
    item={{
      productId: singleproduct.id,
      name: singleproduct.name,
      slug: singleproduct.slug,
      price: singleproduct.price,
      qty: 1,
      image: singleproduct.images[0],
    }}
  />
```

- now in component

```ts
export default function AddItemToCart({
  cart, //new
  item,
}: {
  cart?: CartType //new
  item: CartItemType
})
```

#### smooth Ui with the useTransion Hook.

- the idea is let user know about the request...like a loading
- seems pretty similar to the useFomr or the one we use in the form to see if its pending or not. but here we will use it in a action, meaning is connection from server to db, not from front end or form to action

```ts
'sahred/product/AdditemToCart'
import { useTransition } from 'react'

export default function AddItemToCart({
  cart,
  item,
}: {
  cart?: CartType
  item: CartItemType
}) {...
const [isPending, startTransiton] = useTransition()

 const handleAddToCart = async () => {
    startTransiton()//and wrap the logic with this function
```

-ano now like this, so the idea is wrap the logic with an async function, and thats all

```ts
const handleAddToCart = async () => {
  startTransiton(async () => {
    const res = await addItemToCartAction(item) // remember this action is returning success but in fact is doing nothing! just so that we can create our logic really
    if (!res?.success) {
      toast.error(res?.message)
      return
    }

    toast(
      <div className='flex justify-between items-center w-full'>
        {/* this way we use the mesasage coming back */}
        <span>{res.message}</span>
        form the server
        <Button
          onClick={() => router.push('/cart')}
          className='bg-primary text-white hover:bg-gray-800'>
          Go to cart
        </Button>
      </div>,
      {
        duration: 5000, // optional, in ms
      }
    )
    setGoToCart(true)
  })
}
```

- do the same for the remove.
- ```ts
  const handleRemoveItem = async () => {
    startTransiton(async () => {
      const res = await removeItemFromCartAction(item.productId) // remember this action is returning success but in fact is doing nothing! just so that we can create our logic really
      if (!res?.success) {
        toast.error(res?.message)
        return
      }

      toast(
        <div className='flex justify-between items-center w-full'>
          {/* this way we use the mesasage coming back */}
          <span>{res.message}</span>
          {/* from the server */}
          <Button
            onClick={() => router.push('/cart')}
            className='bg-primary text-white hover:bg-gray-800'>
            Go to cart
          </Button>
        </div>,
        {
          duration: 5000, // optional, in ms
        }
      )
      setGoToCart(true)
    })
  }
  ```

- now we have access to the isPending

```ts
import { Loader, Minus, Plus } from 'lucide-react'
;<Button className='w-full ' type='button' onClick={handleAddToCart}>
  {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Plus />} Add To
  Cart
</Button>
```

## Cart & Shipping

- cart page
- ShadCn ui Table
- Formt currency
- Shipping Address page
- Shipping Address Form
- For submition/Action
- Checkout steps component

### Cart Page, CartTable

```ts
import { Metadata } from 'next'
import CartTable from './CartTable'
import { getMyCartAction } from '@/actions/cart/getMyCartAction'

export const metadata: Metadata = {
  title: `Shopping Cart`,
  description: 'A modern ecommerce store built with next js',
}

export default async function cartPage() {
  const cart = await getMyCartAction()

  return (
    <div>
      <CartTable cart={cart} />
    </div>
  )
}
```

- CartTable

```ts
'use client'

import { CartType } from '@/types'

export default function CartTable({ cart }: { cart?: CartType }) {
  return (
    <>
      <h1 className='py-4 h2-bold'>Shopping Cart</h1>
    </>
  )
}
```

- we keep working on thse,,,, upopdates coming```ts

```ts
'use client'
import { toast } from 'sonner'

import { CartType } from '@/types'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import Link from 'next/link'

export default function CartTable({ cart }: { cart?: CartType }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <h1 className='py-4 h2-bold'>Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div className=''>
          Cart is empty <Link href={'/'}>GO Shopping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='ocerflow-x-auto md:col-span'>Table</div>
        </div>
      )}
    </>
  )
}
```

#### Install Table from ShadCn

```ts
'use client'
import { toast } from 'sonner'

import { CartType } from '@/types'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { removeItemFromCartAction } from '@/actions/cart/removeItemFromCartAction'
import { Loader, Minus, Plus } from 'lucide-react'
import { addItemToCartAction } from '@/actions/cart/addItemToCartAction'

export default function CartTable({ cart }: { cart?: CartType }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <h1 className='py-4 h2-bold'>Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div className=''>
          Cart is empty <Link href={'/'}>GO Shopping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className='text-center '>Quantity</TableHead>
                  <TableHead className='text-right '>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex items-center'>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className='px-2'>{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className='flex-center gap-2'>
                      <Button
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCartAction(
                              item.productId
                            ) //
                            if (!res?.success) {
                              toast.error(res?.message)
                              return
                            }
                          })
                        }
                        disabled={isPending}
                        variant={'outline'}
                        type='button'>
                        {isPending ? (
                          <Loader className='w-4 h-4 animate-spin' />
                        ) : (
                          <Minus className='h-4 w-4' />
                        )}
                      </Button>
                      <span className=''>{item.qty}</span>
                      <Button
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCartAction(item) //
                            if (!res?.success) {
                              toast.error(res?.message)
                              return
                            }
                          })
                        }
                        disabled={isPending}
                        variant={'outline'}
                        type='button'>
                        {isPending ? (
                          <Loader className='w-4 h-4 animate-spin' />
                        ) : (
                          <Plus className='h-4 w-4' />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className='text-right'>${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  )
}
```

#### Subtotal card

- create a currencyFormatter helper first

```ts
export const currencyFormatter = new Intl.NumberFormat('en-us', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
})

/// format currency using the formatter
export const formatCurrencyHelper = (amount: number | string | null) => {
  if (typeof amount === 'number') {
    return currencyFormatter.format(amount)
  } else if (typeof amount === 'string') {
    return currencyFormatter.format(Number(amount))
  } else {
    return 'NaN'
  }
}
```

- Bring it to the table, when creating the subtotal card component

```ts
  </TableBody>...
        </Table>
      </div>
      <Card>
        <CardContent className='p-4 gap-4 '>
          <div className='pb-3 text-xl'>
            Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)})
            <span className='font-bold'>
              {formatCurrencyHelper(cart.itemsPrice)}
            </span>
          </div>
        </CardContent>
      </Card>
```

### Shipping page Set up

#### Shiping Address and Zod Schema

- schema

```ts
import { z } from 'zod'

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters long'),
  streetAddress: z
    .string()
    .min(3, 'Address must be at least 3 characters long'),
  city: z.string().min(3, 'City must be at least 3 characters long'),
  postalCode: z
    .string()
    .min(3, 'Postal code must be at least 3 characters long'),
  country: z.string().min(3, 'Name must be at least 3 characters long'),
  lat: z.number().optional(),
  lng: z.number().optional(),
})
```

- bring it to types and create type

```ts
import { shippingAddressSchema } from '@/zod-schema-validator/shippingAddressSchema'
export type ShippingAddressType = z.infer<typeof shippingAddressSchema>
```

#### shipping page creation

- create contant for default values fist

```ts
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME!
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION! ||
  'A modern ecommerce store built with next js'
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL! || 'http://localhost:3000'

export const LATEST_PRODUCTS_LIMIT = Number(
  process.env.LATEST_PRODUCTS_LIMIT || 4
)

export const signInDefaultValue = {
  email: ' ',
  password: '',
}

export const shippingAddressDefaultValues = {
  fullName: 'John',
  streetAddress: ' 123 st road Venue',
  city: 'Calgary',
  postalCode: 'ABC123',
  country: 'CAD',
}
```

- create create getSinlgeUSerByIdAction as we will need it in the new shipping page
-

```ts
'use server'

import { prisma } from '@/lib/sample-data/db/prisma'

export async function getSingleUserByIdAction(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  })
  if (!user) throw new Error('User Not found')
  //if user oes not exist or password does not match
  return user
}
```

- create shipping page

```ts
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getMyCartAction } from '@/actions/cart/getMyCartAction'

export const metadata: Metadata = {
  title: `Shopping Cart`,
  description: 'A modern ecommerce store built with next js',
}

export default function shippingAddressPage() {
  return <>Address page</>
}
```

- and we continue working on it

```ts
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getMyCartAction } from '@/actions/cart/getMyCartAction'
import { getSingleUserByIdAction } from '@/actions/users/getSingleUserById'

export const metadata: Metadata = {
  title: `Shipping Address`,
}

export default async function shippingAddressPage() {
  const cart = await getMyCartAction()
  if (!cart || cart.items.length === 0) redirect('/cart')

  const session = await auth()

  if (!session) const userId = session?.user?.id
  if (!userId) throw new Error('Not user Id') // Now if we leave it like this we will get a big error if we are not looged in, so for not I iwll replce this error for a redirect to sign-in form the session

  const user = await getSingleUserByIdAction(userId)
  console.log(user)

  return <>Address page</>
}
```

- so like this now,, just for now until we deal with the error properly, more likely by protecting routes, so the user wont even make it hre if not authenticated

```ts
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getMyCartAction } from '@/actions/cart/getMyCartAction'
import { getSingleUserByIdAction } from '@/actions/users/getSingleUserById'

export const metadata: Metadata = {
  title: `Shipping Address`,
}

export default async function shippingAddressPage() {
  const cart = await getMyCartAction()
  if (!cart || cart.items.length === 0) redirect('/cart')

  const session = await auth()
  if (!session) redirect('/sign-in')

  const userId = session?.user?.id
  if (!userId) throw new Error('Not user Id')

  const user = await getSingleUserByIdAction(userId)
  console.log(user)

  return <>Address page</>
}
```

- ShippingAddressForm

```ts
'use client'

import { ShippingAddressType } from '@/types'
import { Form } from 'react-hook-form'

export default function ShippingAddressForm({
  address,
}: {
  address: ShippingAddressType
}) {
  return <div>form</div>
}
```

- continue on page, mbut firat, i realized we dont have an address, it returns null, it works now cuz we enforce the type as you can see. but what i did what to place an if, so that i know i hav to create that address

```ts
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getMyCartAction } from '@/actions/cart/getMyCartAction'
import { getSingleUserByIdAction } from '@/actions/users/getSingleUserById'
import ShippingAddressForm from './ShippingAddressForm'
import { ShippingAddressType } from '@/types'

export const metadata: Metadata = {
  title: `Shipping Address`,
}

export default async function shippingAddressPage() {
  const cart = await getMyCartAction()
  if (!cart || cart.items.length === 0) redirect('/cart')

  const session = await auth()
  if (!session) redirect('/sign-in')

  const userId = session?.user?.id
  if (!userId) throw new Error('Not user Id')

  const user = await getSingleUserByIdAction(userId)

  if (user.address === null) {
    return <h1>Frank you gotta creat its addres firt!!</h1>
  } else {
    return (
      <>
        {/* as ShippingAddressType is weird ciz we are passign null in this case as
      user has no address, yet its valid if we say as ShippingAddressType?  i mean its weird because the type enfoeer an actual address yet null is ok :) */}
        <ShippingAddressForm address={user.address as ShippingAddressType} />
      </>
    )
  }
}
```

#### React Hook Form (pakages)

- React-hook-form: helps manage forms in react. Takes care of managing state, submissions, validating and error messages. It integrates well with ShadCN form components and zod

- @hookform/resolvers: Provides integration betweeb react-hook-form and validation libtaries lioke Zod. We can levarage the Zod schemas to work with our forms!

- From Docs `ts "https://ui.shadcn.com/docs/components/form"`

```ts
'use client'

import { shippingAddressDefaultValues } from '@/lib/contants'
import { ShippingAddressType } from '@/types'
import { shippingAddressSchema } from '@/zod-schema-validator/shippingAddressSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function ShippingAddressForm({
  address,
}: {
  address: ShippingAddressType
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof shippingAddressSchema>) {
    console.log(values)
  }
}
```

- and follows as this

```ts
'use client'

import { shippingAddressDefaultValues } from '@/lib/contants'
import { ShippingAddressType } from '@/types'
import { shippingAddressSchema } from '@/zod-schema-validator/shippingAddressSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'

export function ShippingAddressForm({
  address,
}: {
  address: ShippingAddressType
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof shippingAddressSchema>) {
    console.log(values)
  }

  const [isPending, startTransition] = useTransition()

  return (
    <>
      <div className='max-w-md mx-a space-y-4'>
        <h1 className='h2-bold mt-4'>Shipping Address</h1>
        <p className='text-sm text-muted-foreground '>
          Please neter an address to ship to
        </p>
        <Form {...form}></Form>
      </div>
    </>
  )
}
```

- and then like this :)

```ts
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}> mehtode</form>
</Form>
```

- keep going !!

```ts
<Form {...form}>
  <form method='post' onSubmit={form.handleSubmit(onSubmit)}>
    <div className='flex flex-col md:flex-row gap-5'>
      <FormField
        control={form.control}
        name='fullName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder='shadcn' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </form>
</Form>
```

- Add type to the fields, and this is how you apply the types, through the ControllerRenderProps

```ts
render={({...
    field,
  }: {
    field: ControllerRenderProps<
      z.infer<typeof shippingAddressSchema>,
      'fullName'
    >
  }

```

- and finally here we have all the formFields

```ts
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

export function ShippingAddressForm({
  address,
}: {
  address: ShippingAddressType
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof shippingAddressSchema>) {
    console.log(values)
  }

  const [isPending, startTransition] = useTransition()

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
                  <Loader className='h-4 w-4' animate-spin></Loader>
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
```

- Now lets, work on our form.handleSubmit(onSubmit)
  -lets console.log and see what we get

```ts
function onSubmit(values: z.infer<typeof shippingAddressSchema>) {
  console.log(values)
}
```

- it gives us what we need

```ts
city: 'Calgary'
country: 'CAD'
fullName: 'John'
postalCode: 'ABC123'
streetAddress: ' 123 St Road Avenue'
```

- create updateUserAddressAction

```ts
'use server'
import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'
import { ShippingAddressType } from '@/types'
import { shippingAddressSchema } from './shippingAddressSchema'

export async function updateUserAddressAction(data: ShippingAddressType) {
  try {
    const session = await auth()
    const address = shippingAddressSchema.parse(data)

    const updateUser = await prisma.user.update({
      where: { id: session?.user?.id },
      data: { address },
    })
    return {
      success: true,
      message: 'User address has been updated',
    }
  } catch (error) {
    return { success: false, message: 'We coudnt update address' }
  }
}
```

-reset defaultValues to empty strings

### Paynment page set up

- create checkoutSteps

```ts
import { cn } from '@/lib/utils'
import React from 'react'

export default function CheckoutSteps({ current = 0 }) {
  return (
    <div className='flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10'>
      {['user Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, i) => (
          <React.Fragment key={i}>
            <div
              className={cn(
                'p-2 w-56 rounded-full text-centertext-sm ',
                i === current ? 'bg-secondary' : ''
              )}>
              {step}
            </div>
            {step !== 'Place order' && (
              <hr className='w-16 border-t border-gray-300 mx-2' />
            )}
          </React.Fragment>
        )
      )}
    </div>
  )
}
```

- And then bring it to the pages like shipping address,
- In shipping address page

```ts
  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddressType} />
    </>
  )
}
```

- fix the login to make sure we get the right cookie and we are redirected preperly

```ts
 async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to the token
      if (user) {
        token.id = user.id // <= new
        token.role = user.role
```

-seems like i was missing this code ?

```ts
 if (user.name === 'NO_NAME') {
          //same
          token.name = user.email!.split('@')[0]
          // update database to reflec the token name, so basically if the person signedup with a social credential, then it has no name, no"NO_NAME"  will be created as a naem. the idea is that as soon as that happens, we fired but updating the name with the fisrt part of the enail
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          })
        }
      }
      //handle session updates
      if (session?.user.name && trigger === 'update') { // <= new
        token.name = session.user.name // <= new
      }
```

- so here is the code to remove cart and replace with new cart in cse user has a cart or cart session.

```ts
'auth.ts'
// new new new  new => this one, i htnk will just delte the cart if the user is adding a bew cart without sighin. like its posible there is one cart when signed in already, so this way no conflit
if (trigger === 'signIn' || trigger === 'signUp') {
  const cookiesObject = await cookies()
  const sessionCartId = cookiesObject.get('sessionCartId')?.value

  if (sessionCartId) {
    const sessionCart = await prisma.cart.findFirst({
      where: { sessionCartId },
    })
    if (sessionCart) {
      //delete current userCart
      await prisma.cart.deleteMany({
        where: { userId: user.id },
      })
      //assign new cart
      await prisma.cart.update({
        where: { id: sessionCart.id },
        data: {
          userId: user.id,
        },
      })
    }
  }
}
// new new new  new
```

## Protecting paths

```ts
export const authConfig = {
  providers: [], // Required by NextAuthConfig type
  callbacks: {
    authorized({ request, auth }: any) {
      // Array of regex patterns of paths we want to protect
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ]

      // Get pathname from the req URL object
      const { pathname } = request.nextUrl

      // Check if user is not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false
```

## PAYMENT MEthos & ORDER PAGE

- Payment method select
- order / ordeItem schema
- Create order action
- place order page
- order details page
- format utility fucntion

### Payment method select

- create contants

```ts
export const PAYMENT_METHODS = process.env.PAYMENT_METHODS?.split(', ')
export const DEFAULT_PAYMENT_METHODS = process.env.DEFAULT_PAYMENT_METHODS
```

### schema for payment

```ts
'use server'

import { paymentMethodSchema } from '@/zod-schema-validator/paymentMethodSchema'

import { z } from 'zod'

import { getUserBySessionAction } from './getUserBySessionAction'
import { prisma } from '@/lib/sample-data/db/prisma'
import { auth } from '@/auth'

export async function updateUserPaymentMethodAction(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    // const currentUser = await getUserBySessionAction()
    const session = await auth()
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    })
    if (!currentUser) throw new Error('User Not found')

    const paymentMethod = paymentMethodSchema.parse(data)

    await prisma.user.update({
      where: { id: currentUser?.id },
      data: { paymentMethod: paymentMethod.type },
    })
    return {
      success: true,
      message: 'User Uopdated successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Invalid email or password',
    }
  }
}
```

### Page (Payment-method)

```ts
import { Metadata } from 'next'
import { getMyCartAction } from '@/actions/cart/getMyCartAction'
import { redirect } from 'next/navigation'
import CheckoutSteps from '@/components/shared/CheckoutSteps'
import { getUserBySessionAction } from '@/actions/users/getUserBySessionAction'

import PaymentForm from './PaymentForm'
import { updateUserPaymentMethodAction } from '@/actions/users/updateUserPaymentMethod'
import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'

export const metadata: Metadata = {
  title: `Select Payment Method`,
}

export default async function paymentMethodPage() {
  const cart = await getMyCartAction()
  // const currentUser = await getUserBySessionAction()// I still dont understand why in situation like this i cant use an action to preocess the getUser logi, i keep having  type error, same idea in updateUserPaymentmethodAction, i just cant get the user just like that.so have to bring the logic in.
  const session = await auth()
  const currentUser = await prisma.user.findFirst({
    where: { id: session?.user?.id },
  })
  if (!currentUser) throw new Error('User Not found')
  // const updateMethod = await updateUserPaymentMethod({ type: 'Paypal' })
  // const updateMethod = await updateUserPaymentMethodAction({ type: 'Paypal' })

  if (!cart || cart.items.length === 0) redirect('/cart')

  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentForm preferredPaymentmethod={currentUser?.paymentMethod} />
    </>
  )
}
```

### Payment Form

```ts
'use client'

import { preferredPaymentMethodType } from '@/types'

export default function PaymentForm({
  preferredPaymentmethod,
}: {
  preferredPaymentmethod: string | null
}) {
  return <div>Form , payments</div>
}
```

- more work, actually copied and pasted the one from shipping and fixed a bit,

```ts
'use client'

import { paymentMethodSchema } from '@/zod-schema-validator/paymentMethodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useTransition } from 'react'
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
import { DEFAULT_PAYMENT_METHOD } from '@/lib/contants'
import { updateUserPaymentMethodAction } from '@/actions/users/updateUserPaymentMethod'
import { ArrowRight, Loader } from 'lucide-react'

export default function PaymentForm({
  preferredPaymentmethod,
}: {
  preferredPaymentmethod: string | null
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentmethod || DEFAULT_PAYMENT_METHOD,
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
      router.push('/payment-method')
    })
  }
  return (
    <>
      <div className='max-w-md mx-a space-y-4'>
        <h1 className='h2-bold mt-4'>Payment Method</h1>
        <p className='text-sm text-muted-foreground '>
          Please enter an address to ship to
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
                render={({ field }) => <FormItem className='w-full'></FormItem>}
              />
            </div>

            <div className='flex pag-2 '>
              <Button type='submit' disabled={isPending}>
                {isPending ? (
                  <Loader className='h-4 w-4' animate-spin></Loader>
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
```

### Order model

```ts
model Order {
  id              String      @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId          String      @db.Uuid //this userId shoudnt be optionl, just make sure of it
  shippingAddress Json        @db.Json
  paymentMethod   String
  paymentResult   Json?       @db.Json
  itemsPrice      Decimal     @db.Decimal(12, 2)
  shippingPrice   Decimal     @db.Decimal(12, 2)
  taxPrice        Decimal     @db.Decimal(12, 2)
  totalPrice      Decimal     @db.Decimal(12, 2)
  isPaid          Boolean     @default(false)
  paidAt          DateTime?   @db.Timestamp(6)
  isDelivered     Boolean     @default(false)
  deliveredAt     DateTime?   @db.Timestamp(6)
  updatedAt       DateTime    @default(now()) @db.Timestamp(6)
  user            User        @relation(fields: [userId], references: [id], onDelete: Cascade) // no optional for this one, as its not about the cart but payment already!
  OrderItem       OrderItem[]
}

model OrderItem {
  orderId   String   @db.Uuid
  productId String   @db.Uuid
  qty       Int
  price     Decimal  @db.Decimal(12, 2)
  name      String
  slug      String
  image     String
  order     Order?   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product? @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@id([orderId, productId], map: "orderitems_orderId_productId_pk") //im still not 100% sure on how this combination works, like we creat an id using two ids? anyways it seems we can add a name too after the barket. it also seems that when done this way the id is at the bototm
}

```

- dont forget to generate and migrate

```ts
npx prisma generate
npx prisma migrate dev --name order
```

### Zod order schemas

```ts
import { z } from 'zod'
import { currencySchema } from './currencySchema'
import { PAYMENT_METHODS } from '@/lib/contants'
import { shippingAddressSchema } from './shippingAddressSchema'

export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  itemsPrice: currencySchema,
  shippingPrice: currencySchema,
  taxPrice: currencySchema,
  totalPrice: currencySchema,
  paymentmethod: z
    .string()
    .refine((papaya) => PAYMENT_METHODS?.includes(papaya), {
      message: 'Invalid payment method',
    }),
  shippingAddress: shippingAddressSchema,
})

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currencySchema,
  qty: z.number(),
})
```

### types

```ts
export type OrderItemType = z.infer<typeof insertOrderSchema>
export type OrderType = z.infer<typeof insertOrderItemSchema> & {
  // remeber, this works as an extender. it infers or grbs the stuff from the schema, and here we add th rest, beacuse the rest is not being added via form! :)
  id: string
  createdAt: Date
  isPaid: Boolean
  paidAt: Date | null
  isDelivered: Boolean
  deliveredAt: Date | null
  orderItems: OrderItemType[]
  user: { name: string; email: string }
}
```

### place order page

```ts
import { getMyCartAction } from '@/actions/cart/getMyCartAction'
import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'
import { ShippingAddressType } from '@/types'
import { redirect } from 'next/navigation'

export default async function page() {
  const cart = await getMyCartAction() //honestly, all tis logic is rpetive, we could probably just place this ogoc in a layout and avoid the ectr requests
  if (!cart || cart.items.length === 0) redirect('/cart')
  console.log('CCart: ', cart)

  const session = await auth()
  const user = await prisma.user.findFirst({
    where: { id: session?.user?.id },
  })
  if (!user) throw new Error('User Not found')
  if (!user.address) redirect('/shipping-address')
  if (!user.paymentMethod) redirect('?payment-method')
  const userAddress = user.address as ShippingAddressType

  return <div>place page</div>
}
```

### createOrderAction

```ts
'use server'
import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { getMyCartAction } from '../cart/getMyCartAction'
import { insertOrderSchema } from '@/zod-schema-validator/OrderSChema'

export async function createOrderAction() {
  try {
    const session = await auth()
    if (!session) throw new Error('User is not authenticated')

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    })
    if (!currentUser) throw new Error('User Not found')

    const cart = await getMyCartAction()

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        mesage: 'Your cart is empty',
        redirectTo: '/cart',
      }
    }
    if (!currentUser.address) {
      return {
        success: false,
        mesage: 'Not shipping Adddress',
        redirectTo: '/shipping-address',
      }
    }
    if (!currentUser.paymentMethod) {
      return {
        success: false,
        mesage: 'Not payment method selected',
        redirectTo: '/payment-method',
      }
    }

    //create /setuporder object
    const order = insertOrderSchema.parse({
      userId: currentUser.id,
      shippingAddress: currentUser.address,
      paymentmethod: currentUser.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingprice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    })

    //create a transation frist to be able to create  the order and order items in database
  } catch (error) {
    if (isRedirectError(error)) throw error
    return {
      success: false,
      message: 'error',
    }
  }
}
```

#### create a transation first to be able to cret an order

-Before Prisma ORM version 4.4.0, you could not set isolation levels on transactions. The isolation level in your database configuration always applied.

```ts
'https://www.prisma.io/docs/orm/prisma-client/queries/transactions'
//create a transation frist to be able to create  the order and order items in database
prisma.$transaction(async (tx) => {})
```

```ts
'use server'
import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { getMyCartAction } from '../cart/getMyCartAction'
import { insertOrderSchema } from '@/zod-schema-validator/OrderSChema'
import { CartItemType } from '@/types'

export async function createOrderAction() {
  try {
    const session = await auth()
    if (!session) throw new Error('User is not authenticated')

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    })
    if (!currentUser) throw new Error('User Not found')

    const cart = await getMyCartAction()

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        mesage: 'Your cart is empty',
        redirectTo: '/cart',
      }
    }
    if (!currentUser.address) {
      return {
        success: false,
        mesage: 'Not shipping Adddress',
        redirectTo: '/shipping-address',
      }
    }
    if (!currentUser.paymentMethod) {
      return {
        success: false,
        mesage: 'Not payment method selected',
        redirectTo: '/payment-method',
      }
    }

    //create /setuporder object
    const order = insertOrderSchema.parse({
      userId: currentUser.id,
      shippingAddress: currentUser.address,
      paymentmethod: currentUser.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingprice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    })

    //create a transation frist to be able to create  the order and order items in database
    const insertedOrderId = prisma.$transaction(async (tx) => {
      //ceate order
      const insertedOrder = await tx.order.create({ data: order })
      //create order items from the cartItems
      for (const item of cart.items as CartItemType[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: insertedOrder.id,
          },
        })
      }
      //crea cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
        },
      })
      return insertedOrder.id
    })
    if (!insertedOrderId) throw new Error('Order not created')
    return {
      success: true,
      message: 'Order created succesfuuly',
      redirecTo: `/order/${insertedOrderId}`,
    }
  } catch (error) {
    if (isRedirectError(error)) throw error
    return {
      success: false,
      message: 'error',
    }
  }
}
```

### create order form

```ts
'use client'

import { useRouter } from 'next/navigation'
import PlaceOrderButton from './PlaceOrderButton'
import { createOrderAction } from '@/actions/orders/createOrderAction'
import { toast } from 'sonner'

export default function PlaceOrderForm() {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await createOrderAction()

    if (res.redirectTo) {
      router.push(res.redirectTo)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <PlaceOrderButton />
    </form>
  )
}
```

### Order page and action to grab orders

- Action

```ts
'use server'

import { converToPlainObject } from '@/helperFuntions/convertPrismaToRegularJsObject'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getOrderByIdAction(orderId: string) {
  const data = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      // becasue these guys are thir own modl, so this way we can also grab that data in one request! :)
      OrderItem: true,
      user: { select: { name: true, email: true } },
    },
  })
  return converToPlainObject(data)
}
```

- order page

```ts
import { getOrderByIdAction } from '@/actions/orders/getOrderByIdAction'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: `Home`,
  description: 'A modern ecommerce store built with next js',
}

export default async function page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const order = await getOrderByIdAction(id)
  console.log(order)

  if (!order) notFound()

  return <div>{id}</div>
}
```

#### Format utility fucntions

- In prista.ts

```ts
"/lib/sample-data/db/prisma.ts"
order: {
      itemsPrice: {
        needs: { itemsPrice: true }, // not too sure about this, but after reasearch it seems like we have manually make it available in the compute
        compute(cart) {
          return cart.itemsPrice.toString()
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true }, // not too sure about this
        compute(cart) {
          return cart.shippingPrice.toString()
        },
      },
      taxPrice: {
        needs: { taxPrice: true }, // not too sure about this
        compute(cart) {
          return cart.taxPrice.toString()
        },
      },
      totalPrice: {
        needs: { totalPrice: true }, // not too sure about this
        compute(cart) {
          return cart.totalPrice.toString()
        },
      },
    },
```

- fsdfs
-

```ts
'/helperFucntions'
export function formattUUID(id: string) {
  const sortentedString = `..${id.substring(id.length - 6)}` // so what substring does, it take one argument, and shorten the struing from that moment to the end. like here we minus 6 to the length, so it goe s from total -6 to final, which ius 6 digits really
  console.log('sortentedString :', sortentedString)

  return sortentedString
}
```

### Order Page - details table

```ts
'use client'

import { OrderType } from '@/types'

export default function OrderDetailsTable({ order }: { order: OrderType }) {
  return <div>Form</div>
}
```

- Now bring componet from page

```ts
export default async function page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const order = await getOrderByIdAction(id)
  // console.log(order)

  if (!order) notFound()

  return (
    <div>
      <OrderDetailsTable order={order}/> // but we will get a type error here beucase the way we are sending the order does not mtach the type, we we gotta fix that a bit.
```

- becaseuse as you can see, its not just the order we are addign a bunch of imfp there

```ts
'use server'

import { converToPlainObject } from '@/helperFuntions/convertPrismaToRegularJsObject'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getOrderByIdAction(orderId: string) {
  const data = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      //extra stuff
      OrderItem: true,
      user: { select: { name: true, email: true } },
    },
  })
  return converToPlainObject(data)
}
```

- Order Details table

```ts
'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import { formattUUID } from '@/helperFuntions/formatUUID'
import { OrderType } from '@/types'

export default function OrderDetailsTable({ order }: { order: OrderType }) {
  const {
    shippingAddress,
    OrderItems,
    shippingPrice,
    itemsPrice,
    taxPrice,
    paymentMethod,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  } = order
  const orderId = formattUUID(order.id)
  return (
    <>
      <h1 className='py-4 text-2xl'>Order {orderId}</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='col-span-2 space-y-4 overflow-x-auto '>
          <Card>
            <CardContent className='p-4 '>
              <h2 className='text-xl pb-4'>Paid at</h2>
              <p className=''>{paymentMethod}</p>
              {isPaid ? (
                <Badge className=' ' variant={'secondary'}>
                  {/* PAid at {formatDateTime(paidAt!).dateTime} */}
                  Paid at {formatDateTime(paidAt).dateTime}
                </Badge>
              ) : (
                <Badge className=' ' variant={'destructive'}>
                  Not paid
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Shipping Address</h2>
              <p className=''>{shippingAddress.fullName}</p>
              <p className=''>
                {shippingAddress.streetAddress}, {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge className=' ' variant={'secondary'}>
                  Delevered at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge className=' ' variant={'destructive'}>
                  Not delivered
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
```

- Now add the actual table, which is hte same one from place-order page

```ts
'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import { formattUUID } from '@/helperFuntions/formatUUID'
import { OrderType } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import Image from 'next/image'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'
import PlaceOrderForm from '../../place-order/PlaceOrderForm'

export default function OrderDetailsTable({ order }: { order: OrderType }) {
  const {
    shippingAddress,
    OrderItems,
    shippingPrice,
    itemsPrice,
    taxPrice,
    paymentMethod,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  } = order
  const orderId = formattUUID(order.id)
  return (
    <>
      <h1 className='py-4 text-2xl'>Order {orderId}</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='col-span-2 space-y-4 overflow-x-auto '>
          <Card>
            <CardContent className='p-4 '>
              <h2 className='text-xl pb-4'>Paid at</h2>

              <p className=''>{paymentMethod}</p>
              {isPaid ? (
                <Badge className=' ' variant={'secondary'}>
                  {/* PAid at {formatDateTime(paidAt!).dateTime} */}
                  Paid at {formatDateTime(paidAt).dateTime}
                </Badge>
              ) : (
                <Badge className=' ' variant={'destructive'}>
                  Not paid
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Shipping Address</h2>
              <p className=''>{shippingAddress.fullName}</p>
              <p className=''>
                {shippingAddress.streetAddress}, {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge className=' ' variant={'secondary'}>
                  Delevered at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge className=' ' variant={'destructive'}>
                  Not delivered
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
        <div className=''>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className='flex justify-between'>
                <div className=''>Items</div>
                <div className=''>{formatCurrencyHelper(itemsPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div className=''>Tax</div>
                <div className=''>{formatCurrencyHelper(taxPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div className=''>Shipping</div>
                <div className=''>{formatCurrencyHelper(shippingPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div className='font-bold'>Total</div>
                <div className='font-bold'>
                  {formatCurrencyHelper(taxPrice)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='mt-4 md:mt-0'>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <h2 className='text-xl pb-4'>Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {OrderItems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flex items-center'>
                          <Image
                            src={item.image}
                            alt=''
                            width={50}
                            height={50}
                          />
                          <span className='px-2'>{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className='px-2'>{item.qty}</span>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <span className='px-2'>${item.price}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
```

## paypal payments

- Paypal sanbox Setup
- Paypal Api file
- Generate Access Token
- Creat Order
- Capture payment
- Jest Testing
- paypal action
- paypal Buttons

### Open a paypal account / Paypal sandbox set up

- once opened, go to dashboard>testing tools> sandbox accounts
<!-- "https://developer.paypal.com/dashboard/accounts" -->
- here you can see a personla and business acct we can use to play with or test, build our app
- next, hit create account
- create personal fisrt
- so you should end up with one for personal, one for business, and both default
- go to add apps and credentials
<!-- https://developer.paypal.com/dashboard/applications/sandbox -->
- go create app, the businees acount should show, select it. and merchant option btw.
- creat app
- Add keys, but just remeber that we wont use the `https://sandbox.paypal.com`
- `https://sandbox.paypal.com` but this one `"https://api-m.sandbox.paypal"`

### Generate Access token

- creat paypal file in /lib/paypal.ts

```ts
const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'

export const paypal = {}

// Generate paypal  Acces Token

async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env
  // explanation  => /docs/bufferfrom.md
  // const buf = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}}`) // this encodes
  // const auth = buf.toString('base64')

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`).toString(
    'base64'
  )
  // more explanation hre
  // explanation  => /docs/bufferfrom2.md
  //const reversed = Buffer.from(auth, 'base64').toString('utf-8'); this if i wanted to get back what i inserted , when encoding.  so yeah this would be the decoder lol
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',

    //explantion on when to use headers, even via actions => /docs/headers.md
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (response.ok) {
    const jsonData = await response.json()
    return jsonData.access_token
  } else {
    const errorMesage = await response.text()
    throw new Error(errorMesage)
  }
}

export { generateAccessToken }
```

### Jest Testing For Access Token

- the idea is to check if our paypal response is correct
- install: `npm i -D jest ts-jest ts-node @types/jest @types/node dotenv --legacy-peer-deps` // why all thse installs, especially dotenv? well beucase we wont have acces to nextjs really
- After initlaize jest with `npm init jest@latest`
- answer to questions: The following questions will help Jest to create a suitable configuration for your project

√ Would you like to use Jest when running "test" script in "package.json"? ... yes
√ Would you like to use Typescript for the configuration file? ... yes
√ Choose the test environment that will be used for testing » node
√ Do you want Jest to add coverage reports? ... no
√ Which provider should be used to instrument code for coverage? » v8
√ Automatically clear mock calls, instances, contexts and results before every test? ... yes

- so the previous will crea a jest.config file
- go to the file and amnd things
- A preset that is used as a base for Jest's configuration `preset: "test-jest"`
- in packgae.json
- make sure these are there, the test:watch is optional, but nice to have

```ts
"test": "jest",
"test:watch": "jest --watch"
```

- enable the .env stuff; creat a `jest-setup.ts` file in the root
- Add this ther, thast all we need, remeber it doesnt run in next.js but like their own backend kin of thing `require('dotenv').config()`
- Now tell the jest.config() where that is
- `setupFiles: ['<rootDir>/jest.setup.ts'],`
- Run the test now!1

- export async function generateAccessToken() deom paypal file
- import it in paypal.test.ts
-

#### paypal.test.ts

```ts
// import { generateAccessToken } from '@/lib/paypal'

import { generateAccessToken } from '../lib/paypal' //seems like we cant use the alis here, cuz its not next js!

///Tte to generate access token from paypal
test('generates token from paypal', async () => {
  const tokenResponse = await generateAccessToken()
  console.log(tokenResponse)
  console.log(typeof tokenResponse)

  // so its basically testing 3 throwForMissingRequestStore, logginh ther responseCookiesToRequestCookies, making sure is  a string , and alos making sure the string is more than zero
  console.log(tokenResponse)
  expect(typeof tokenResponse).toBe('string')
  expect(tokenResponse.length).toBeGreaterThan(0)
})
```

- Run `npm test`

### Create Order & Capture Payment Request

- Now that we can grab the payment access token, we can add a ayment to the order!
- we ned to make a request to this api end ppoint: `https://api-m.sandbox.paypal.com/v2/checkout/orders` which means `${base}/v2/checkout/orders`

- in `paypal.ts`

```ts
export const paypal = {
  createOrder: async function createOrder(price: number) {
    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: price,
            },
          },
        ],
      }),
    })
    if (response.ok) {
      return await response.json()
    } else {
      const errorMesage = await response.text()
      throw new Error(errorMesage)
    }
  },
  capturePayment: async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders/${orderId}/capture`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (response.ok) {
      return await response.json()
    } else {
      const errorMesage = await response.text()
      throw new Error(errorMesage)
    }
  },
}
```

### Jest testing for order

- in `paypal.test.ts`

```ts
test('create a paypal order', async () => {
  const token = await generateAccessToken()
  const price = 10.0
  const orderResponse = await paypal.createOrder(price)
  console.log('orderResponse: ', orderResponse)
  expect(orderResponse).toHaveProperty('id')
  expect(orderResponse).toHaveProperty('status')
  expect(orderResponse.status).toBe('CREATED')
})
```

### Test Capture Payment with a mock order

- we are gonna simulate an order.
- we wil do that with something call spy.

```ts
test('Simulate capturing a payment from a ordder', async () => {
  const orderId = '100'
  // we pass the capturePayment function
  const mockCapturePayment = jest
    .spyOn(paypal, 'capturePayment')
    .mockResolvedValue({
      // so we are manually setting to completed instead of manually sending ina  payment
      status: 'COMPLETED',
    })

  const captureResponse = await paypal.capturePayment(orderId)
  expect(captureResponse).toHaveProperty('status', 'COMPLETED') // so here we did it in one line vs 2 lines on above

  //CLEAN UP THE MOCK
  mockCapturePayment.mockRestore()
})
```

### Create paypal Order Action

- create schema first

```ts
import { z } from 'zod'

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string().email('Invalid Email address '),
  pricePaid: z.string(),
})
```

- now the type

  ```ts
  export type PaymentResultType = z.infer<typeof paymentResultSchema>
  ```

- action

```ts
import { formatError } from '@/helperFuntions/FormatErrors'
import { paypal } from '@/lib/paypal'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function createPaypalOrder(orderId: string) {
  // remember, we dont need the orderId, we need the paymentResult and there is an id There.  thats means we paid or not!!
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    })

    if (order) {
      // if order in db then Create paypal order
      const paypalOrder = await paypal.createOrder(Number(order.totalPrice))
      // update order with paypal order id (payment result)
      //So this is similar to the cart thing, we are just creating th eplace holder or payment result object. once paid the the staus should change to paid or ture or sothing like that
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentResult: {
            id: paypalOrder.id,
            email_address: '',
            status: '',
            pricePaid: 0,
          },
        },
      })
      return {
        success: true,
        massage: 'Item Order ceated successfully',
        data: paypalOrder.id,
      }
    } else {
      throw new Error('order not foud from createPaypalOrderAction')
    }
  } catch (error) {
    return `${formatError(error)}`
  }
}
```

### Approve and Update Order

- Approve and Update Order, and this action is whast gonna call capturePyment. So once the order gets paid in paypal(capturepayment return true, then we upsadate order in bd ispaid=true)- and we then have to update paymentResult with satus paid and lal of that

```ts
import { formatError } from '@/helperFuntions/FormatErrors'
import { paypal } from '@/lib/paypal'
import { prisma } from '@/lib/sample-data/db/prisma'
import { PaymentResultType } from '@/types'
import { revalidatePath } from 'next/cache'
import { updateOrderToPaid } from './updateOrderToPaidAction'

export async function approvePaypalOrderAction(
  orderId: string,
  data: { paypalOrderId: string }
) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    })
    if (!order) throw new Error('order not found')
    // so after getting the order we call the capturePaymetn form paypal
    const captureData = await paypal.capturePayment(data.paypalOrderId)
    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResultType).id ||
      captureData.status !== 'COMPLETED'
    ) {
      throw new Error('Error in paypal payment')
    }
    //update order in db (isPaid); so lets creat an action for that
    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
      },
    })

    //revalidate
    revalidatePath(`/order/${orderId}`)
    return {
      success: true,
      message: 'Your order has been paid',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
```

- and the updateOrderToPaid action

```ts
import { prisma } from '@/lib/sample-data/db/prisma'
import { OrderItemType, PaymentResultType } from '@/types'

export async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string
  paymentResult?: PaymentResultType
}) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      OrderItems: true,
    },
  })
  if (!order) throw new Error('order not found')
  if (order.isPaid) throw new Error('Order has been paid  for already') // as we dont want to pay twice

  //transasction; it will not only udate the order, but also the stock
  await prisma.$transaction(async (tx) => {
    //iterate over products and update stock
    for (const item of order.OrderItems as OrderItemType[]) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { increment: -item.qty }, //this is how we incease or decreate quantities in prisma
        },
      })
    }

    // set the order to paid
    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult: paymentResult,
      },
    })
  })
}
```

- and getUpdatedOrderAfterTransactionAction

```ts
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getUpdatedOrderAfterTransactionAction(
  orderId: string,
  data: { paypalOrderId: string }
) {
  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      OrderItems: true,
      user: {
        // we dont wann select the whole user object, as you know iot return a=everything including the hashed password
        select: { name: true, email: true },
      },
    },
  })
  if (!updatedOrder) throw new Error('Updated order not found')
}
```

### Inplement paypal Button

#### react paypal js

- it provides a solution to devs to abstract away complexities around loading the js SDK
- `npm i @paypal/react-paypal-js`
- instead of pulling the processs.env from OrdrDetailTable, which is client, we get it from the page and the drop it down via prosp. but why not? security issue

```ts
export default function OrderDetailsTable({
  order,
  paypalClientId,
}: {
  order: OrderType
  paypalClientId: string
}) {...
```

- in page

```ts
{
  ;<OrderDetailsTable
    order={{
      ...order,
      shippingAddress: order.shippingAddress as ShippingAddressType,
    }}
    paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'} //sb, identifier for sando account
  />
}
```

- on component

```ts
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'

 const PrintLoadingState = () => {}
  const handleCreatePayPalOrder = () => {}
  const handleApprovePayPalOrder = () => {}


{formatCurrencyHelper(taxPrice)}
  </div>
    </div>
    {/* paypal payment  */}
    {isPaid && paymentMethod === 'paypal' && (
      <div>
        <PayPalScriptProvider
          options={{
            clientId: paypalClientId,
          }}>
          <PrinLoadingState />
          <PayPalButtons
            createOrder={handleCreatePayPalOrder}
            onApprove={handleApprovePayPalOrder}
          />
        </PayPalScriptProvider>
      </div>
    )}
</CardContent>
```

- setting up the functions

```ts
const PrintLoadingState = () => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer()
  let status = ''

  if (isPending) {
    status = 'Loading PayPal'
  } else if (isRejected) {
    status = 'Loading Paypal...'
  }
  return status
}

const handleCreatePayPalOrder = async () => {
  const res = await createPaypalOrderAction(order.id)
  if (!res.success) {
    toast.error(res.message)
  }
  return res.data
}

const handleApprovePayPalOrder = async (data: { orderID: string }) => {
  // looks like for paypal we have to apss an object => data: { orderID: string }
  const res = await approvePaypalOrderAction(order.id, data)
  if (res.success === true) {
    toast.success(res.message)
  }
  if (res.success === false) {
    toast.error(res.message)
  }
}
```

## Order History & User Profile

- User Layout & Menu
- Get user orders
- Orders pagination
- Update profileaction
- User profile form

### USers Layout

```ts
import { APP_NAME } from '@/lib/contants'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60 * 60 * 24 * 30 // ✅ revalidate every 30 days

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='flex flex-col'>
        <div className='border-b container mx-auto'>
          <div className='flex items-center h-16 px-4'>
            <Link href={'/'} className='w-22'>
              <Image
                src='/images/logo.svg'
                height={48}
                width={48}
                alt={APP_NAME}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
```

### MainNav

```ts
'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const links = [
  { title: 'Profile', href: '/user/profile' },
  { title: 'Orders', href: '/user/orders' },
]

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  return (
    <nav
      className={cn(className, 'flex items-cneter space-x-4 lf:space-x-6')}
      //so we just grab th rest of the props like this
      {...props}>
      {links.map((link, i) => (
        <Link
          href={link.href}
          key={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname.includes(link.href) && 'text-muted-foreground'
          )}>
          {link.title}
        </Link>
      ))}
    </nav>
  )
}
```

### Get my Orders Action

- lets add the pagination first
