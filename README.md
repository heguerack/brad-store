# Frank Notes

## Imporgtant lessons

### leant hopw to pass action as props lol

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

- so this funtion witl, fail cuz of the type, but if i remove the try catch , life is good... not sure why this is happening, have to dig into it.

```ts
'use server'

import { auth } from '@/auth'
import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getMyOrdersAction({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number
  page: number
}) {
  try {
    const session = await auth()
    if (!session) throw new Error('User is not authorized')

    const data = await prisma.order.findMany({
      where: { userId: session?.user?.id! }, // this means is not null , so dont bother
      orderBy: { createdAt: 'desc' },
      take: limit,
      // so the skip , what it does it removes the number of pages times the limit. say we are in page 5, so we will show 6, but remove the fist (5-1)*limit, that way we show the current ones
      skip: (page - 1) * limit,
    })

    const dataCount = await prisma.order.count({
      where: { userId: session?.user?.id! },
    })

    const totalPages = Math.ceil(dataCount / limit)

    return {
      data,
      totalPages,
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Something went wrong',
    }
  }
}
```

### ORders page

```ts
import { getMyOrdersAction } from '@/actions/orders/getMyOrdersAction'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import { formattUUID } from '@/helperFuntions/formatUUID'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `My Orders`,
  description: 'A modern ecommerce store built with next js',
}

export default async function ordersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  const { page } = await props.searchParams
  const orders = await getMyOrdersAction({
    page: Number(page) || 1,
  })

  return (
    <div className='space-y-2 text-black'>
      <h2 className='h2-bold'></h2>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.data?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formattUUID(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{formatCurrencyHelper(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : 'Not Paid'}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : 'Not Delivered'}
                </TableCell>
                <TableCell>
                  <Link href={`/order/${order.id}`}>
                    <span className='px-2'>Details</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
```

#### Add go to user/orders page to the user button

```ts
<DropdownMenuItem>
    <Link href='/user/profile' className='w-full'>
      User Profile
    </Link>
  </DropdownMenuItem>
  <DropdownMenuItem>
    <Link href='/user/orders' className='w-full'>
      Order History{' '}
    </Link>
</DropdownMenuItem>

```

### Orders Pagination

- `/user/orders/page`

```ts
</TableBody>
  {orders.totalPages && (
    <Pagination
      page={Number(page) || 1}
      totalPages={orders.totalPages}
    />
  )}
```

- Pagination component

```ts
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

type paginationPros = {
  page: number | string
  totalPages: number
  urlParamName?: string
}

export default function Pagination({
  page,
  totalPages,
  urlParamName,
}: paginationPros) {
  const router = useRouter()
  const searchParams = useSearchParams()

  return <div>Page: {page}</div>
}
```

#### Prev and Next Buttons

```ts
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'

type paginationPros = {
  page: number | string
  totalPages: number
  urlParamName?: string
}

export default function Pagination({
  page,
  totalPages,
  urlParamName,
}: paginationPros) {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <div className='flex gap-2 '>
      <Button
        className='w-28'
        disabled={Number(page) <= 1}
        variant={'outline'}
        size={'lg'}>
        Previous
      </Button>
      <Button
        className='w-28'
        disabled={Number(page) >= totalPages}
        variant={'outline'}
        size={'lg'}>
        Next
      </Button>
    </div>
  )
}
```

#### Add functionality

- We need to build the url via buttons to ocntrol the page number.
- For that we will use the query-string npm library. its basically a formatter so that we dont buil the logic ourselves.
- `npm i query-string`
-

### Profile Page

```ts
import { updateUserProfileAction } from '@/actions/users/updateUserProfileAction'
import { auth } from '@/auth'
import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: `Custommer Profile`,
  description: 'A modern ecommerce store built with next js',
}
// beucase its a client componet we cant pull the sesion just like that we have to passit via the SessionProvider wrapper
export default async function profilePage() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <div className='max-w-md mx-auto space-y-4'>
        <h2 className='h2-bold'>{session?.user?.name}</h2>
      </div>
    </SessionProvider>
  )
}
```

- Schema for updatiung the user

```ts
import z from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(3, 'must be at least 3 characters'),
  email: z.string().min(3, 'Email must be at least 3 characters'),
})
```

### ProfileForm

```ts
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
```

### Profile page so far

```ts
import { updateUserProfileAction } from '@/actions/users/updateUserProfileAction'
import { auth } from '@/auth'
import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import ProfileForm from './ProfileForm'

export const metadata: Metadata = {
  title: `Custommer Profile`,
  description: 'A modern ecommerce store built with next js',
}
// beucase its a client componet we cant pull the sesion just like that we have to passit via the SessionProvider wrapper
export default async function profilePage() {
  const session = await auth()
  console.log('session :', session)

  return (
    <SessionProvider session={session}>
      <div className='max-w-md mx-auto space-y-4'>
        <h2 className='h2-bold'>Profile</h2>
        <ProfileForm />
      </div>
    </SessionProvider>
  )
}
```

## Admin Overview and Orders

- Admin layout & Menu
- Adminoverview and menu
- Asles Cahrt (Recharts)
- Admin Orders Page
- Delete Orders
- Update orders

### Admin Layout and Main Nav

- the layout is pretty much the same as the profile layout

```ts
import Menu from '@/components/shared/header/Menu'
import { APP_NAME } from '@/lib/contants'
import Image from 'next/image'
import Link from 'next/link'
import MainNav from './MainNav'
import { Input } from '@/components/ui/input'

export default async function AdminLayout({
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
            {/* Main Nav  */}
            <MainNav className='mx-6 text-red-950' />
            <div className='ml-auto items-center flex spacae-x-4'>
              <div className=''>
                //new in this page
                <Input //new in this page
                  type='search' //new in this page
                  placeholder='Search...' //new in this page
                  placeholder='Search...' //new in this page
                  className='md:w-[100px] lg:w-[300px]'
                />
              </div>
              <Menu />
            </div>
          </div>
        </div>
        <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto '>
          {children}
        </div>
      </div>
    </>
  )
}
```

- in User button

```ts
//however the role will be complaining as thast not in type
{
  session?.user?.role === 'admin' && (
    <DropdownMenuItem>
      <Link href='/admin/overview' className='w-full'>
        User Profile
      </Link>
    </DropdownMenuItem>
  )
}
```

- so the solition is to createa next-auth.d.ts in types folder
- its in the docs
- `https://next-auth.js.org/getting-started/typescript`

```ts
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role: string
    } & DefaultSession['user'] // so by adding the dafualt we are saying we want to build on it, nbot to replace the whole object
  }
}
```

### GEt Order Summary Action

```ts
import { prisma } from '@/lib/sample-data/db/prisma'
import { Prisma } from '@prisma/client'

type SalesDataType = {
  month: string
  totalSales: number
}[]

export async function getOrderSummaryAction() {
  // get counts for each resource
  const ordersCount = await prisma.order.count()
  const productsCount = await prisma.product.count()
  const usersCount = await prisma.user.count()

  // calculate the total sales
  const totalSales = await prisma.order.aggregate({
    _sum: { totalPrice: true }, // so this is just gonna add this result for us , that way we dont pull the whpole thing to do the math hree :)
  })

  // get monthly sales
  // the reason why we do this is bacuase the totalSales is gonna be in the formatt of prismaDeciimal but we want a number. so we goota deal with regular raw data
  const salesDataRaw = await prisma.$queryRaw<
    Array<{ month: string; totalSales: Prisma.Decimal }>
  >`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`

  const salesData: SalesDataType = salesDataRaw.map((entry) => ({
    month: entry.month,
    totalSales: Number(entry.totalSales),
  }))

  // get the latest orders
  const latestSales = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    take: 6,
  })
  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    latestSales,
    salesData,
  }
}
```

### Overview Page

```ts
import { getOrderSummaryAction } from '@/actions/orders/getOrderSummaryAction'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import { formatNumber } from '@/helperFuntions/formatNumber'
import { BadgeDollarSign, Barcode, CreditCard, Users } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

export default async function adminPage() {
  const session = await auth()
  // if (session?.user?.role !== 'admin') throw new Error('User is not authorized')

  const summary = await getOrderSummaryAction()

  console.log('summary :', summary)

  return (
    <div className='spcace-y-2'>
      <h1 className='h2-bold'>Dashboard</h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-mendium'>
              Total Revenue
            </CardTitle>
            <BadgeDollarSign />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatCurrencyHelper(
                summary.totalSales._sum.totalPrice?.toString() || 0 //cero so that it deosnt show an error in no sales
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-mendium'>Sales</CardTitle>
            <CreditCard />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatNumber(summary.ordersCount)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-mendium'>Customers</CardTitle>
            <Users />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatNumber(summary.usersCount)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-mendium'>Products</CardTitle>
            <Barcode />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatNumber(summary.productsCount)}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>{/* CHART HERE  */}</CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.latestSales.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {order?.user?.name ? order.user.name : 'Deleted User'}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(order.createdAt).dateOnly}
                    </TableCell>
                    <TableCell>
                      {formatCurrencyHelper(order.totalPrice)}
                    </TableCell>
                    <TableCell>
                      <Button asChild>
                        <Link href={`/order/${order.id}`}>
                          <span className='px-2'>Details</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### Monthly sales Chart

- We will be using a packge called rechart
- `https://www.npmjs.com/package/recharts`
- `npm i recharts`

```ts
'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

type salesDataType = {
  month: string
  totalSales: number
}[]

export default function Charts({ salesData }: { salesData: salesDataType }) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      {}
      <BarChart data={salesData}>
        <XAxis
          dataKey='month'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          // dataKey='month'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey='totalSales'
          fill='current' // fills the current color
          radius={[4, 4, 4, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

### Protecting Admin Routes

- create a guard helperfuntion

```ts
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export async function authGuard() {
  const session = await auth()

  if (session?.user?.role !== 'admin') {
    redirect('/anauhtorized')
  }

  return session
}
```

- create anAuthorized page

```ts

```

### admin/orders.tsx page and action

- Action

```ts
import { auth } from '@/auth'
import { formatError } from '@/helperFuntions/FormatErrors'
import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getOrdersAction({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number
  page: number
}) {
  try {
    const session = await auth()
    if (!session) throw new Error('Auauthorized from get order session')
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })
    const ordersCount = await prisma.order.count()

    return {
      data: orders,
      totalPages: Math.ceil(ordersCount),
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
```

- Page `/admin/orders/page.tsx`

```ts
import { getOrdersAction } from '@/actions/orders/getOrdersAction'
import { authGuard } from '@/helperFuntions/authGuard'
import { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Admin Orders',
}

export default async function adminOrdersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  await authGuard()

  const { page = '1' } = await props.searchParams // so we destrcture page from props, but laso assign a dafault of 1 at the same time

  const orders = await getOrdersAction({
    limit: 2,
    page: Number(page),
  })
  console.log('orders in admin orders page: ', orders)

  return <div>admin orders</div>
}
```

- Now grab the table from /user/orders/page.tsx, paste it in this page, its pretty similar!

```ts
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getOrdersAction } from '@/actions/orders/getOrdersAction'
import { authGuard } from '@/helperFuntions/authGuard'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import { formattUUID } from '@/helperFuntions/formatUUID'
import { Metadata } from 'next'
import Link from 'next/link'
import Pagination from '@/components/shared/Pagination'
import { Button } from '@/components/ui/button'

const metadata: Metadata = {
  title: 'Admin Orders',
}

export default async function adminOrdersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  await authGuard()

  const { page = '1' } = await props.searchParams // so we destrcture page from props, but laso assign a dafault of 1 at the same time

  const orders = await getOrdersAction({
    limit: 2,
    page: Number(page),
  })
  console.log('orders in admin orders page: ', orders)

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>TOTAL</TableHead>
            <TableHead>PAID</TableHead>
            <TableHead>DELIVERED</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.data?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{formattUUID(order.id)}</TableCell>
              <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
              <TableCell>{formatCurrencyHelper(order.totalPrice)}</TableCell>
              <TableCell>
                {order.isPaid && order.paidAt
                  ? formatDateTime(order.paidAt).dateTime
                  : 'Not Paid'}
              </TableCell>
              <TableCell>
                {order.isDelivered && order.deliveredAt
                  ? formatDateTime(order.deliveredAt).dateTime
                  : 'Not Delivered'}
              </TableCell>
              <TableCell>
                <Button asChild>
                  <Link href={`/order/${order.id}`}>Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {orders.totalPages && (
        <Pagination page={Number(page) || 1} totalPages={orders.totalPages} />
      )}
    </div>
  )
}
```

### Delete Orders

- create deleteOrderAction

```ts
'use server'

import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteOrderAction(id: string) {
  try {
    await prisma.order.delete({
      where: {
        id: id,
      },
    })
    revalidatePath('/admin/orders')
    return {
      success: true,
      message: 'Order deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError,
    }
  }
}
```

- Add delete button to the table in `/admin/orders/page.tsx`
- But build a deleteDialag component first

```ts
'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { deleteOrderAction } from '@/actions/orders/deleteOrderAction'

export default function DeleteDialog({
  //   id,
  //   action,
  // }: {
  //   id: string
  //   action: (id: string) => Promise<{ success: boolean; message: string }>
  id,
}: {
  id: string
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async function () {
      const res = await deleteOrderAction(id)
      if (!res.success) {
        toast.error(res?.message)
      } else {
        setOpen(false)
        toast.success(res?.message)
      }
    })
  }

  return (
    <AlertDialog onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className='ml-2' size={'sm'} variant={'destructive'}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            THis Action Can Not be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button size={'sm'} variant={'destructive'} onClick={handleDelete}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
      {/* </Form> */}
    </AlertDialog>
  )
}
```

### Update OrdersAction (COD) - CAsh on delivery

```ts
import { revalidatePath } from 'next/cache'
import { updateOrderToPaid } from './updateOrderToPaidAction'
import { formatError } from '@/helperFuntions/FormatErrors'

export async function updateOrderToDeliveredCashAction(orderId: string) {
  try {
    await updateOrderToPaid({ orderId })
    revalidatePath(`{/order/${orderId}}`)
    return {
      success: true,
      message: 'cash order marked as paid',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
```

### Update order to delivered

- It doesnt matter what method of payment, it has to be delirverd., hm maybe in the future we can add the option to pick up and pay with any mehtod in pick up, here we might have to use a machine to collect payment and update the systems too, dig into that fRank!

```ts
'use server'

import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { revalidatePath } from 'next/cache'

export async function updateOrderToDelivered(orderId: string) {
  try {
    const orderToUpdate = await prisma.order.update({
      where: { id: orderId },
      data: {},
    })
    if (!orderToUpdate)
      throw new Error('Order not found, updateOrderToDeliveredAction')

    if (!orderToUpdate.isPaid)
      throw new Error(
        'Order has not been paid yet, at updateOrderToDeliveredAction'
      )

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    })

    revalidatePath(`/order/${orderId}`)

    return {
      success: true,
      message: 'Order has been marked as delivered',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
```

### Update order buttons (Cash On Delivery )

- in `/(root)/order/[id]`

```ts
import { getOrderByIdAction } from '@/actions/orders/getOrderByIdAction'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OrderDetailsTable from './OrderDetailsTable'
import { ShippingAddressType } from '@/types'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: `Home`,
  description: 'A modern ecommerce store built with next js',
}

export default async function page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const order = await getOrderByIdAction(id) // but remeber we added extra stuff, so we get order, orderItem, and user. lets spread that!! actually the stuff that we added via auth is included in the type, like when we extended tha. so the issue that we have here is beucase the shipping adesstype has lat nad lgn. so we gatte fixt the retur a bit before we pass it
  // console.log(order)
  console.log('order :', order)

  if (!order) notFound()

  const session = await auth()

  return (
    <div>
      {
        <OrderDetailsTable
          order={{
            ...order,
            shippingAddress: order.shippingAddress as ShippingAddressType,
          }}
          paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'} //sb, identifier for sando account
          isAdmin={session?.user?.role === 'admin'}
          // the fist one was brought by Brad, but is too muc redundant, same with the second one iprepared.  so the above version is the cleanesst and more clear in my opnion
          // isAdmin={session?.user?.role === 'admin' || false} // what this is saying if adminf hen tr otherwise false
          // isAdmin={session?.user?.role === 'admin' ? true : false}
        />
      }
    </div>
  )
}
```

- in `orderDetailstable.tsx`

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

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { createPaypalOrderAction } from '@/actions/orders/createPaypalOrderAction'
import { toast } from 'sonner'
import { approvePaypalOrderAction } from '@/actions/orders/approvePaypalOrderAction'
import { startTransition, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { updateOrderToPaidCashAction } from '@/actions/orders/updateOrderToPaidCashAction'
import { updateOrderToDeliveredCashAction } from '@/actions/orders/updateOrderToDeliveredCashAction'
import { updateOrderToDelivered } from '@/actions/orders/updateOrderToDelivered'

export default function OrderDetailsTable({
  order,
  paypalClientId,
  isAdmin,
}: {
  order: OrderType
  paypalClientId: string
  isAdmin: boolean
}) {
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
  const totalPrice =
    Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)

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

  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition()
    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCashAction(order.id)
            if (res.success) {
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
          })
        }>
        {isPending ? 'Processing...' : 'Mark As Paid'}
      </Button>
    )
  }

  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition()
    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToDelivered(order.id)
            if (res.success) {
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
          })
        }>
        {isPending ? 'Processing...' : 'Mark as Delivered'}
      </Button>
    )
  }

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
                  {formatCurrencyHelper(totalPrice)}
                </div>
              </div>
              {/* paypal payment  */}
              {!isPaid && paymentMethod === 'Paypal' && (
                <div>
                  <PayPalScriptProvider
                    options={{
                      clientId: paypalClientId,
                    }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePayPalOrder}
                      onApprove={handleApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
              {/* CASH ON DELIVERY */}
              {/* CASH ON DELIVERY */}
              {/* CASH ON DELIVERY */}
              {isAdmin && !isPaid && paymentMethod === 'cashOnDelivery' && (
                <MarkAsPaidButton />
              )}
              {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
              {/* CASH ON DELIVERY */}
              {/* CASH ON DELIVERY */}
              {/* CASH ON DELIVERY */}
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

## Admin Products and Image upload

- Get and display products
- Delete products
- Create products
- Uploadthing product confi
- uplod product image
- is feature banner
- update products

### getAllProductsAction for admin page

```ts
'use server'

import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getAllProductsAction({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query: string
  limit?: number
  page: number
  category?: string
}) {
  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  })
  const dataCount = await prisma.product.count()
  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  }
}
```

### Get products for Admin Page

```ts
import { getAllProductsAction } from '@/actions/products/getAllProductsAction'
import { authGuard } from '@/helperFuntions/authGuard'

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

  console.log('allProducts :', allProducts)

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <h1 className='h2-bold'>Products</h1>
      </div>
    </div>
  )
}
```

### Display Products

```ts
import { getAllProductsAction } from '@/actions/products/getAllProductsAction'
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

  console.log('allProducts :', allProducts)

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <h1 className='h2-bold'>Products</h1>
        <Button asChild>
          <Link href={'/admin/products/create'}>Create Product</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead className='text-right'>PRICE</TableHead>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {allProducts.totalPages && allProducts.totalPages > 1 && (
        <Pagination page={page} totalPages={allProducts.totalPages} />
      )}
    </div>
  )
}
```

### Delete a product

- Action

```ts
import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteSingleProductAction(id: string) {
  try {
    const productExits = await prisma.product.findFirst({
      where: { id },
    })
    if (!productExits) throw new Error('Product to delete does not exist')

    const productDeleted = await prisma.product.delete({
      where: { id },
    })
    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
```

### Super Important!

- so a while back i ignored the action being passed from page t the DeleteDialog component, i htought i was i could jut grab the action I needed in thta compnt , without thinking of the reusability. so here is the fix

```ts
'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
// import { deleteOrderAction } from '@/actions/orders/deleteOrderAction'

export default function DeleteDialog({
  id,
  action,
}: {
  id: string
  action: (id: string) => Promise<{ success: boolean; message: string }>
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async function () {
      const res = await action(id)
      if (!res.success) {
        toast.error(res?.message)
      } else {
        setOpen(false)
        toast.success(res?.message)
      }
    })
  }

  return (
    <AlertDialog onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className='ml-2' size={'sm'} variant={'destructive'}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            THis Action Can Not be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button size={'sm'} variant={'destructive'} onClick={handleDelete}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

- an example of an action being paseed

```ts
<DeleteDialog id={order.id} action={deleteOrderAction} />
```

### Create new Product, without the image first

- create schemaValidator fisrt, notice we can extend the schema!
- but creat deafukt values in contants frist lol

```ts
export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: '0',
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null,
}
```

- create product action

```ts
import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { InsertProductSchema } from '@/zod-schema-validator/productSchemas'
import { revalidatePath } from 'next/cache'
import z from 'zod'

export async function createSingleProductAction(
  data: z.infer<typeof InsertProductSchema> // this is weird, this is not how we usually do it, so if this way maybe we avoiud setting the type on the page? compare to create order or user
) {
  try {
    const product = InsertProductSchema.parse(data)
    await prisma.product.create({ data: product })
    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product created successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
```

- update product action

```ts
import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { InsertProductSchema } from '@/zod-schema-validator/productSchemas'
import { updateProductSchema } from '@/zod-schema-validator/updateProductSchema'
import { revalidatePath } from 'next/cache'
import z from 'zod'

export async function updateSingleProductAction(
  data: z.infer<typeof updateProductSchema>
) {
  try {
    const product = updateProductSchema.parse(data)
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    })
    if (!productExists)
      throw new Error('Product does not exists therefore it cant be updated')

    await prisma.product.update({
      where: { id: product.id },
      data: product, // so i guess htis means we replce the whole thing!
    })

    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product created successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
```

### Create Product page and form

- `/admin/products/create`

```ts
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
          <ProductForm type='create' />
        </div>
      </h2>
    </>
  )
}
```

- Product form, brads way

```ts
const form = useForm<z.infer<typeof InsertProductSchema>>({
  resolver:
    type === 'Update'
      ? zodResolver(updateProductSchema)
      : zodResolver(InsertProductSchema),
  defaultValues: product && type === 'Update' ? product : productDefaultValues,
})
```

- chat gpts way

  ```ts
  const schema = type === 'Update' ? updateProductSchema : InsertProductSchema

  type FormData = typeof schema extends typeof updateProductSchema
    ? z.infer<typeof updateProductSchema>
    : z.infer<typeof InsertProductSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  })
  ```

- product form coninuation

```ts
'use client'
import { productDefaultValues } from '@/lib/contants'
import { ProductType } from '@/types'
import { InsertProductSchema } from '@/zod-schema-validator/productSchemas'
import { updateProductSchema } from '@/zod-schema-validator/updateProductSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Form, useForm } from 'react-hook-form'
import z from 'zod'

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

  return (
    <Form {...form}>
      <h1>Create form</h1>
      <form className='space-y-8'>
        <div className='flex felx-col md:flex-row gap-5'>
          {/* name  */}
          {/* slug */}
        </div>
        <div className='flex felx-col md:flex-row gap-5'>
          {/* brand*/}
          {/*category */}
        </div>
        <div className='flex felx-col md:flex-row gap-5'>
          {/* price  */}
          {/* stock    */}
        </div>
        <div className='upload-field'>{/*isfeatured*/}</div>
        <div className=''>?{/* description  */}</div>
        <div className=''>{/* submit  */}</div>
      </form>
    </Form>
  )
}
```

### Form fields and slugify

- `npm i slugify`

```ts
react - hook - form
```

### Create product for submisiion (Submit the product)

```ts

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

  return (
    <Form {...form}>
      <h1>Create form</h1>
      {/* <form className='space-y-8' onSubmit={form.handleSubmit(onsubmit)}> */}
      <form
        className='space-y-8'
        onSubmit={form.handleSubmit(
          //so i decided to do the whole logic here :)
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
```

### remove oem items from the insertProductSchema

- as they are not coming in the form yet, and will trhow an error

```ts
import { z } from 'zod'
import { currencySchema } from './currencySchema'

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
  price: currencySchema,
})
```

### UploadThing Configuration

- `https://uploadthing.com/` ; `npm i uploadthing @uploadthing/react`
- sign in create a new app
- get token and poaste to .env
- get secret too
- UPLOADTHING_APP_ID `https://uploadthing.com/dashboard/heguerack-personal-team/gggggggg/api-keys` => gggggggg ; so i got this from th url lol
- docs `https://docs.uploadthing.com/getting-started/appdir`
- create a file `app/api/uploadthing/core.ts`
-

```ts
import { auth } from '@/auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      // maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await auth()
      if (!session) throw new UploadThingError('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session?.user?.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.ufsUrl)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
```

- create the actula route now `app/api/uploadthing/core.ts`

```ts
import { createRouteHandler } from 'uploadthing/next'
import { ourFileRouter } from './core'

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  //apply an optional custom configuration
})
```

- Note that we can creat our own components to use in that library. here is how its doen
- `/src/utils/uploadthing.ts`

```ts
import {
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react'

import { OurFileRouter } from '@/app/api/uploadthing/core'

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
```

- set next config images url or domain

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ufs.sh',
        port: '',
      },
    ],
  },
}

export default nextConfig
```

### Add image uploads

- dont forget to uncoment the stuff in the insertProductSchema, what we did just a little while ago to be able to create a product without an image

- go to product form

```ts
// just above the return
const images = form.watch('images')
```

- add the FormField for images

```ts
<div className='upload-field flex flex-col md:flex-row gap-5'>
  <FormField
    control={form.control}
    name='images'
    render={() => (
      //lets remove this filed and type as we dont need it here, it will actually thorw an error if qe keep it.
      //   {
      //   field,
      // }: {
      //   field: ControllerRenderProps<
      //     z.infer<typeof InsertProductSchema>,
      //     'images'
      //   >
      // }
      <FormItem>
        <FormLabel>Images</FormLabel>
        <FormControl>
          <Input placeholder='Enter Product images' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>
```

- continuation

```ts
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
```

### isFeaturedbanner

- go to productForm again, above the return

```ts
const images = form.watch('images')
const isFeatured = form.watch('isFeatured')
const banner = form.watch('banner')

  <div className='upload-field'>
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
                    <FormLabel>isFeatured</FormLabel>
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
            </CardContent>
          </Card>
        </div>
```

- Show banner uoload image if it is featured

```ts
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
```

### Product Update form

- getProductById action

```ts
'use server'

import { converToPlainObject } from '@/helperFuntions/convertPrismaToRegularJsObject'
import { prisma } from '@/lib/sample-data/db/prisma'

// actually i could jut use one component if slu or i lol
export async function getSingleproductByIdAction(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  })
  return converToPlainObject(data)
}
```

- create `/admin/products/id page, to update!`

```ts
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
```

## ADMIN USERS AND SEARCH

- Get display Users
- DeleteUsers
- Edit User Page
- Admin Search Form
- Orders Search
- Users Search

### Get and display users

#### get all users action

```ts
'use server'

import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getAllUsersAction({
  page,
  limit = PAGE_SIZE,
}: {
  limit?: number
  page: number
}) {
  const data = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
  })
  const dataCount = await prisma.user.count()
  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  }
}
```

### create users page

```ts
import { getAllUsersAction } from '@/actions/users/getAllUsersAction'
import { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Admin Users',
}

export default async function adminUsersPage() {
  const users = await getAllUsersAction({ page: 1 })
  console.log(users)

  return <div>page</div>
}
```

- Display users, copy table from oreders as pretty similar, modify it :)

```ts
import { getAllUsersAction } from '@/actions/users/getAllUsersAction'
import { Metadata } from 'next'
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
import DeleteDialog from '@/components/shared/DeleteDialog'
import Pagination from '@/components/shared/Pagination'
import { Button } from '@/components/ui/button'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import { deleteSingleUserAction } from '@/actions/users/deleteSingleUserAction'
import { Badge } from '@/components/ui/badge'

const metadata: Metadata = {
  title: 'Admin Users',
}

export default async function adminUsersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  await authGuard()
  const { page = 1 } = await props.searchParams
  const users = await getAllUsersAction({ page: Number(page) })
  console.log(users)

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>ROLE</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{formattUUID(user.id)}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.role === 'user' ? (
                  <Badge variant={'secondary'}>User</Badge>
                ) : (
                  <Badge variant={'destructive'}>Admin</Badge>
                )}
              </TableCell>

              <TableCell>
                <Button asChild size={'sm'}>
                  <Link href={`/user/${user.id}`}>Details</Link>
                </Button>
                <DeleteDialog id={user.id} action={deleteSingleUserAction} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.totalPages && (
        <Pagination page={Number(page) || 1} totalPages={users.totalPages} />
      )}
    </div>
  )
}
```

### Delete user Action

```ts
'use server'
import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteSingleUserAction(id: string) {
  try {
    const userExits = await prisma.user.findFirst({
      where: { id },
    })
    if (!userExits) throw new Error('User to delete does not exist')

    const userDeleted = await prisma.user.delete({
      where: { id },
    })
    revalidatePath('/admin/users')
    return {
      success: true,
      message: 'User deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
```

### Update User

- create update user schema

```ts
import z from 'zod'
import { updateProfileSchema } from './updateProfileSchema'

export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, 'Id is required'),
  role: z.string().min(1, 'Role is required'),
})
```

- creat a constan variables for roles

```ts
export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user']
```

- start page

```ts
import { getSingleUserByIdAction } from '@/actions/users/getSingleUserById'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Update User',
}

export default async function adminUserUpdatePage(props: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await props.params
  const user = await getSingleUserByIdAction(id)
  if (!user) notFound()
  return (
    <div className='space-y-8 max-w-lg mx-auto'>
      <h2 className='he-bold'>Update User</h2>
    </div>
  )
}
```

### Update User Form

```ts
'use client'

import { updateUserSchema } from '@/zod-schema-validator/updateUserSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { ArrowRight, Loader } from 'lucide-react'
import { updateUserProfileAction } from '@/actions/users/updateUserProfileAction'
export default function UpdateUserForm({
  user,
}: {
  user: z.infer<typeof updateUserSchema>
}) {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  })

  async function onSubmit(values: z.infer<typeof updateUserSchema>) {}

  return (
    <Form {...form}>
      <form method='POST' onSubmit={form.handleSubmit(onsubmit)}>
        {/* Email  */}
        {/* Name  */}
        {/* Role  */}
      </form>
    </Form>
  )
}
```

- just copy/paste form from `/admin/productForm/tsx`, get a FormField

```ts
'use client'

import { updateUserSchema } from '@/zod-schema-validator/updateUserSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import z from 'zod'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { ArrowRight, Loader } from 'lucide-react'
import { updateUserProfileAction } from '@/actions/users/updateUserProfileAction'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { USER_ROLES } from '@/lib/contants'
export default function UpdateUserForm({
  user,
}: {
  user: z.infer<typeof updateUserSchema>
}) {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  })

  async function onSubmit(values: z.infer<typeof updateUserSchema>) {}

  return (
    <Form {...form}>
      <form method='POST' onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email  */}
        <div className=''>
          <FormField
            control={form.control}
            name='email'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                'email'
              >
            }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter User email' {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Name  */}
        <div className=''>
          <FormField
            control={form.control}
            name='name'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                'name'
              >
            }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter User name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Role  */}
        <div className=''>
          <FormField
            control={form.control}
            name='role'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                'role'
              >
            }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={'Select a role'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {USER_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex-between mt-4'>
          <Button className='w-full' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : `Update User`}
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

### update user action

```ts
'use server'

import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { updateUserSchema } from '@/zod-schema-validator/updateUserSchema'
import { revalidatePath } from 'next/cache'
import z from 'zod'

export async function updateUserAction(user: z.infer<typeof updateUserSchema>) {
  try {
    console.log('Data to Update in user:', user)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        role: user.role,
      },
    })
    revalidatePath('/admin/users')
    return {
      success: true,
      message: 'User updated successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
```

- and in Form

```ts
   async function onSubmit(values: z.infer<typeof updateUserSchema>) {
    try {
      const res = await updateUserAction(values)
      if (!res.success) {
        return toast.error(res.message)
      }
      toast.success(res.message)
      form.reset()
      router.push('/admin/users')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <Form {...form}>
      <form method='POST' onSubmit={form.handleSubmit(onSubmit)}>
```

### Admin Search Form

- Create an AdminSearch Cmmponent in `/components/admin/`
- bring it to layout, as that will be the same for products, orders, users.
-

```ts
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function AdminSearch() {
  const pathname = usePathname()

  // so we do this to know which action to handle
  const formActionUrl = pathname.includes('/admin/orders')
    ? '/admin/orders'
    : pathname.includes('/admin/users')
    ? '/admin/users'
    : '/admin/products'

  const searchParams = useSearchParams()

  const [queryValue, setQueryValue] = useState(searchParams.get('query') || '')

  useEffect(() => {
    // we could have made a variable for the query
    // something like searchQuery = (searchParams.get('query') || ''
    setQueryValue(searchParams.get('query') || '')
  }, [searchParams])

  return (
    <form action={formActionUrl} method='GET'>
      <Input
        type='seacrh'
        placeholder='Search...'
        name='query'
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className='md:w-[100px] lg:w-[300px]'
      />
      <Button className='sr-only'>Search</Button>
    </form>
  )
}
```

- create button top clear the filter, rather than reload, do i tin all 3 pages as that wont be in layout?
  -in `/products/page` , replace h1, with:

```ts
{
  searchText && (
    <div className=''>
      Filterered by <i className=''>&quot;{searchText}&quot;</i>{' '}
      <Link href={'/admin/products'}>
        <Button size='sm'>Remove Filter</Button>
      </Link>
    </div>
  )
}
```

### Admin Order Search

- Add a buyers cell in `/admin/orders/page.tsx` table
- Add query to the getorder actions

```ts
'use server'

import { auth } from '@/auth'
import { formatError } from '@/helperFuntions/FormatErrors'
import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'
import { Prisma } from '@prisma/client'

export async function getOrdersAction({
  limit = PAGE_SIZE,
  page,
  query, //new
}: {
  limit?: number
  page: number
  query: string //new
}) {
  try {
    const session = await auth()
    if (!session) throw new Error('Auauthorized from get order session')

    const queryFilter: Prisma.OrderWhereInput = //new
      query && query !== 'all' //new
        ? {
            //new
            user: {
              //new
              name: {
                //new
                contains: query, //new
                mode: 'insensitive', //new
              } as Prisma.StringFilter, //new
            },
          }
        : {}

    const orders = await prisma.order.findMany({
      where: {
        //new
        ...queryFilter, //new
      }, //new
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })
    const ordersCount = await prisma.order.count()

    return {
      data: orders,
      totalPages: Math.ceil(ordersCount),
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
```

- copy the remove filterButton from products page and aste itin orders page

```ts
  <div className='flex items-center gap-3'>
  <h1 className='h2-bold'>Orders</h1>
  {searchText && (
    <div className=''>
      Filterered by <i className=''>&quot;{searchText}&quot;</i>{' '}
      <Link href={'/admin/products'}>
        <Button size='sm'>Remove Filter</Button>
      </Link>
    </div>
  )}
```

### Admin User Search

- Pretty much the sameas the orderAction, changes

```ts
'use server'

import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'
import { Prisma } from '@prisma/client'

export async function getAllUsersAction({
  page,
  limit = PAGE_SIZE,
  query,
}: {
  limit?: number
  page: number
  query: string
}) {
  // const queryFilter: Prisma.OrderWhereInput =
  const queryFilter: Prisma.UserWhereInput =
    query && query !== 'all'
      ? {
          // user: {
          name: {
            contains: query,
            mode: 'insensitive',
          } as Prisma.StringFilter,
          // },
        }
      : {}
  const data = await prisma.user.findMany({
    where: {
      ...queryFilter,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
  })
  const dataCount = await prisma.user.count()
  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  }
}
```

- Make changes in page too

```ts
export default async function adminUsersPage(props: {
  searchParams: Promise<{ page: string; query: string }>
}) {
  await authGuard()
  const { page = 1, query: searchText } = await props.searchParams
  const users = await getAllUsersAction({
    page: Number(page),
    query: searchText,
  })
  // console.log(users)

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-3'>
        <h1 className='h2-bold'>Users</h1>
        {searchText && (
          <div className=''>
            Filterered by <i className=''>&quot;{searchText}&quot;</i>{' '}
            <Link href={'/admin/users'}>
              <Button size='sm'>Remove Filter</Button>
            </Link>
          </div>
        )}
      </div>

```

## SEARCH FILTERING

- Category Drawer
- Featured Product
- Search Component
- Search Page
- Get Filters And Appply
- Add filter link
- Sorting

### Category Drawer

- Create a getAllCategoriesAction (Products)
- check the action, we can filter categoirs by goruping, directly wuht th ORM

```ts
'use server'

import { prisma } from '@/lib/sample-data/db/prisma'

export async function getAllCategoriesAction() {
  const data = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  })
}
```

- Create Component (Drawer) in shared, header folder

```ts
export default async function CategoryDrawer() {
  return <div>CategoryDrawer</div>
}
```

- bring it to header `/shared/header/index.tsx`

```ts

export default function Header() {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <CategoryDrawer />...
```

- Back to component

```ts
import { getAllCategoriesAction } from '@/actions/orders/getAllCategoriesAction'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

export default async function CategoryDrawer() {
  const data = await getAllCategoriesAction()
  return (
    <Drawer direction='left'>
      <DrawerTrigger asChild>
        <Button variant='outline'>
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='whfull max-w-sm'>
        <DrawerHeader>
          <DrawerTitle>Select The category</DrawerTitle>
          <div className='space-y-1 mt-4'>
            {data.map((obj) => (
              <Button
                asChild // becasue we are gonna place a drawerclose copmponent
                key={obj.category}
                variant={'ghost'}
                className='w-full justify-start'>
                {/* becasue  */}
                <DrawerClose asChild>
                  <Link
                    key={obj.category}
                    href={`/search/category/${obj.category}`}>
                    {obj.category}({obj._count})
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}
```

### Featured Products Carousel

- `npm i embla-carousel-react `

```ts
'use client'

import { ProductType } from '@/types'

export default function ProductCarousel({ data }: { data: ProductType[] }) {
  return <div>ProductCarousel</div>
}
```

- bring it to home page

```ts
import getFeaturedProductsAction from '@/actions/products/getFeaturedProductsAction'
import { getLatestProductsAction } from '@/actions/products/getLatestProductsAction'
import ProductCarousel from '@/components/shared/header/ProductCarousel'
import ProductList from '@/components/shared/product/ProductList'
import { ProductType } from '@/types'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Home`,
  description: 'A modern ecommerce store built with next js',
}

export default async function page() {
  // const products: ProductType[] = await getLatestProductsAction()
  const products = await getLatestProductsAction()
  const featuredProducts = await getFeaturedProductsAction()
  console.log('featuredProducts :', featuredProducts)

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={products} title='Newest Arrivals' limit={6} />
      <h1>hello </h1>
    </>
  )
}
```

- back to component

```ts
'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ProductType } from '@/types'
import AutoPlay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCarousel({ data }: { data: ProductType[] }) {
  return (
    <Carousel
      className='w-full mb-12'
      opts={{ loop: true }}
      plugins={[
        AutoPlay({
          delay: 4000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}>
      <CarouselContent>
        {data.map((product: ProductType) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className='relative max-auto'>
                <Image
                  src={product.banner!} // so again, here , we are saying, I promise there will be an image
                  alt={product.name}
                  height={0}
                  width={0}
                  sizes='100vw'
                  className='w-full h-auto'
                />
                <div className='absolute inset-0 flex items-end justify-center'>
                  <h2 className='bg-gray-900 bg-opacity-50 text-2xl font-bold px-2'></h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### Search Component to the the home page (for filtering really)

- create a a Search.tsx component, in` /heade/shared`

```ts
import { getAllCategoriesAction } from '@/actions/products/getAllCategoriesAction'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'

export default async function Search() {
  const categories = await getAllCategoriesAction()
  return (
    <form action='/search' method='GET'>
      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Select name='category'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='all' />
          </SelectTrigger>
        </Select>
      </div>
    </form>
  )
}
```

- Bring it to the page (but not really to the page, header , layout)

```ts
...<div className='hidden md:block'>
      <Search />
    </div>
    <Menu />
  </div>
</header>
```

- back to component

```ts
import { getAllCategoriesAction } from '@/actions/products/getAllCategoriesAction'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SearchIcon } from 'lucide-react'

export default async function Search() {
  const data = await getAllCategoriesAction()
  return (
    // remeber , this is how we inject the data!!
    <form action='/search' method='GET'>
      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Select name='category'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key='All' value='All'>
              All
            </SelectItem>
            {data.map((cat) => (
              <SelectItem key={cat.category} value={cat.category}>
                {cat.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name='q'
          type='text'
          placeholder='Search...'
          className='md:w-[100px] lg:w-[300px]'
        />
        <Button>
          <SearchIcon />
        </Button>
      </div>
    </form>
  )
}
```

- create a serachPage in (root) folder

```ts
// so this page will be used to grab filters and redirect to a serach page, lieka  filter page
import { getAllProductsAction } from '@/actions/products/getAllProductsAction'

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
  } = await props.searchParams // so se set q="all" default, imn case nothing gets passed then we take all as a value

  // console.log('searchParams:', q, category, price, rating, page, sort)
  const products = await getAllProductsAction({
    query: q,
    category,
    price,
    rating,
    page: Number(page),
    sort,
  })

  return <div> search page</div>
}
```

- fix/add the rest of the stuff to the getAllProductsAction

```ts
'use server'

import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getAllProductsAction({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string
  limit?: number
  page: number
  category?: string
  price?: string
  rating?: string
  sort?: string
}) {
  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  })
  const dataCount = await prisma.product.count()
  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  }
}
```

- continue on page

```ts
import { getAllProductsAction } from '@/actions/products/getAllProductsAction'
import ProductCard from '@/components/shared/product/ProductCard'

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
  } = await props.searchParams // so se set q="all" default, imn case nothing gets passed then we take all as a value

  // console.log('searchParams:', q, category, price, rating, page, sort)
  const products = await getAllProductsAction({
    query: q,
    category,
    price,
    rating,
    page: Number(page),
    sort,
  })

  return (
    <div className='grid  md:grid-cols-5 md:gap-5'>
      {/* Filters  */}
      <div className='filter-links'></div>
      <div className='md:col-span-4 space-y-4 gap-4 md:grid-cols-3'>
        {products.data.length === 0 && <div>Not products Found</div>}
        {products.data.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}
```

- create a button to see all products, it will link to the search page, then bring it into the home page

```ts
import Link from 'next/link'
import { Button } from '../ui/button'

export default function ViewAllProductsButton() {
  return (
    <div className='flex justify-center items-center my-8'>
      <Button asChild className='px-8 py-4 text-lg font-semibold'>
        <Link href={'/search'}>View All Products</Link>
      </Button>
    </div>
  )
}
```

- Add the actual filter to the getProductsAction, right now we are just passing the query as "all", plus we need tlo add all the other stuff that we are passing for filterinmg into the action
- if you compera to the getAllOrdersAction yuo will see its the same, just extra filteres

### Search

```ts
'use server'

import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getAllProductsAction({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string
  limit?: number
  page: number
  category?: string
  price?: string
  rating?: string
  sort?: string
}) {
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query, // this means it doesnt have to be the exact work but part of it (in the name) like po for polo
            mode: 'insensitive',
          } as Prisma.StringFilter,
        }
      : {}

  const categoryFilter = category && category !== 'all' ? { category } : {}

  const priceFilter: Prisma.ProductWhereInput =
    price && price !== 'all'
      ? {
          price: {
            gte: Number(price.split('-')[0]),
            lte: Number(price.split('-')[1]),
          },
        }
      : {}

  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {}

  const data = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    skip: (page - 1) * limit,
    take: limit,
  })
  const dataCount = await prisma.product.count()
  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  }
}
```

### Get Filter Url Function

- we basically need to create the url, like now we are passing query and category via form in the layout heade/search
- seems like we wil, do this directly on the search page

```ts
import { getAllProductsAction } from '@/actions/products/getAllProductsAction'
import ProductCard from '@/components/shared/product/ProductCard'

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
  } = await props.searchParams // so se set q="all" default, imn case nothing gets passed then we take all as a value, but if something is set it stays, and we can just modify item by item though the same function

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

  return (
    <div className='grid  md:grid-cols-5 md:gap-5'>
      {/* Filters  */}
      <div className='filter-links'>
        URL:
        {getFilterUrl({
          c: 'Mens Sweatshirts',
        })}
      </div>
      <div className='md:col-span-4 space-y-4 gap-4 md:grid-cols-3'>
        {products.data.length === 0 && <div>Not products Found</div>}
        {products.data.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}
```

### Category and Price UI Filter

- Bring All categories to the page so that we can create the little forms/tables to selsc stuff

```ts
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
    name: '$51 to $1000',
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
          <div className=''>{/* SORT  */}</div>
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
```

### Sorting Products

- go to products action, so yeah we can do this directly from the action with the help of the ORM, so far its ordered byCreated At,

```ts
  // orderBy: { createdAt: 'desc' },
  orderBy:
    sort === 'lowest'
      ? { price: 'asc' }
      : sort === 'highest'
      ? { price: 'desc' }
      : sort === 'rating'
      ? { rating: 'desc' }
      : { createdAt: 'desc' },
  skip: (page - 1) * limit,
  take: limit,
```

- we need to send the sort value now from the page into the action

```ts

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
```

### Dynamic metadata

- go to search page

```ts
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
```

## RATINGS AND EVIEWS

- Prisma Schema Model
- Review List omponent
- Review Form Dialog
- Create Update Action
- Display Reviews
- Pre-Fill Review Form

### Reviews: Prisma model, Zod Schema , & Type

#### Review model

```ts
model Review {
  id                 String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId             String   @db.Uuid
  productId          String   @db.Uuid
  rating             Int
  title              String
  description        String
  isVerifiedPurshase Boolean  @default(true)
  createdAt          DateTime @default(now()) @db.Timestamp(6)
  product            Product? @relation(fields: [productId], references: [id], onDelete: Cascade)
  user               User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

- do the migartion `npx prisma generate` `npx prisma migrate dev --name add-review-model`

#### insertReviewsSchema

```ts
import { z } from 'zod'

export const insertReviewSChema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  productId: z.string().min(1, 'Product is required'),
  userId: z.string().min(1, 'User is required'),
  rating: z.coerce
    .number()
    .int()
    .min(1, 'Rating must be at least 1')
    .max(1, 'Rating must be at most 5'),
})
```

#### Type

```ts
export type ReviewType = z.infer<
  typeof insertReviewSChema & {
    id: string
    createdAt: string
    user?: { name: string }
  }
>
```

#### Add default values in the contants file

```ts
export const reviewFormDafaultValues = {
  title: '',
  comment: '',
  rating: 0,
}
```

### Review List componet

- creat a reviewList componet in the product/slug file

```ts
'use client'

export default function ReviewList({
  userId,
  productId,
  productSlug,
}: {
  userId: string
  productId: string
  productSlug: string
}) {
  console.log(userId, productId, productSlug)

  return <div>ReviewList</div>
}
```

- Add component to slug page

```ts
 const session = await auth()
  const userId = session?.user?.id


   <section className='mt-10'>
          <h2 className='h2-bold'>Customer Reviews</h2>
          <ReviewList
            userId={userId || ''}
            productId={singleproduct.id}
            productSlug={singleproduct.slug}
          />
        </section>
      </>
```

- back to component

```ts
'use client'

import { ReviewType } from '@/types'
import Link from 'next/link'
import { useState } from 'react'

export default function ReviewList({
  userId,
  productId,
  productSlug,
}: {
  userId: string
  productId: string
  productSlug: string
}) {
  // console.log(userId, productId, productSlug)
  const [reviews, setReviews] = useState<ReviewType[]>([])

  return (
    <div className='space-y-4'>
      {reviews.length === 0 && <div> No Reviews Yet</div>}
      {userId ? (
        <>{/* Review Form  */}</>
      ) : (
        <div>
          Please{' '}
          <Link
            //remember the callback Url is built in next js, we have to do things like this manually if using express
            href={`/sign-in?callbackUrl=product/${productSlug}`}
            className='text-blue-700 px-2 href'>
            Sign In
          </Link>
          to write a review
        </div>
      )}
      <div className='flex flex-col gap-3'></div>
    </div>
  )
}
```

### Review Form Dialog

- create a ReviewForm.tsx in product/slug folder, and bring it into the REviewList component

```ts
'use client'

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
import { useForm } from 'react-hook-form'
import z from 'zod'

export default function ReviewForm({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string
  productId: string
  onReviewSubmitted?: () => any
}) {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof insertReviewSChema>>({
    resolver: zodResolver(insertReviewSChema),
    defaultValues: reviewFormDafaultValues,
  })

  const handleOpenForm = () => {
    setOpen(true)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button type='button' onClick={handleOpenForm}>
        Write a Review
      </Button>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form method='post'>
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
                      value={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a rating' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* no need to map here as array.from is a built in js, that maps already :) so it would be innefivient and redundant  */}
                        {Array.from({ length: 5 }, (_, i) => (
                          <SelectItem key={i} value={(i + 1).toString()}>
                            {i + 1} {'  '}
                            <StarIcon className='inline h-4 w-4' />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
```

### Create And Update review Action

```ts
'use server'

import { auth } from '@/auth'
import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { insertReviewSChema } from '@/zod-schema-validator/reviewsSchema'
import z from 'zod'

// CREATE AND UPDATER REVIEW
export async function reviewsAction(data: z.infer<typeof insertReviewSChema>) {
  try {
    const session = await auth()
    if (!session) throw new Error('User is not authenticated')

    //validate and store the review (put in in variable)
    const review = insertReviewSChema.parse({
      ...data,
      userId: session.user.id,
    })

    // get product thats being reviewed
    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    })
    if (!product) throw new Error('Product not found')

    //check if user reviewd that product already
    const reviewExists = await prisma.reviews.findFirst({
      where: { productId: review.productId, userId: review.userId },
    })

    //transaction ==> remember how tbis works Frank?? rememeber that if one thing fails then the whole thing fails
    //
    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        //update review
        await tx.reviews.update({
          where: { id: reviewExists.id },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        })
      } else {
        //create review
        await tx.reviews.create({
          data: review,
        })
      }
      // weather it was updated or created, get the avg rating
      const averageRating = await tx.reviews.aggregate({
        //remember we did somthing similar but it was sum, now avg
        _avg: { rating: true },
        where: { productId: review.productId },
      })
      // get number of reviews
      const numReviews = await tx.reviews.count({
        where: { productId: review.productId },
      })
      //update the rating and numEviews in product table
      await tx.product.update({
        where: {
          id: review.productId,
        },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews,
        },
      })
    })
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
```

### Connect reviewForm to Action

```ts
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
}...

... <Form {...form}>
      <form method='post' onSubmit={form.handleSubmit(onsubmit)}>
```

- Now from RevieList we are passing onReviewSubmitted

```ts
//reload the reviews
  console.log('Review Submitted')


return (
  <div className='space-y-4'>
    {reviews.length === 0 && <div> No Reviews Yet</div>}
    {userId ? (
      <ReviewForm
        userId={userId}
        productId={productId}
        onReviewSubmitted={reload}
      />
```

- So if try to sumbit the review now, we cant becasue we are not passing the userId and productId
- So in my opinion, we could create a couple hiden inputs, to pass those values, but instead we will use the useForm...form.setvalue()!
- so the way to inject htose values are trhough the handleOpenForm

```ts
'use client'

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
  const handleOpenForm = () => {
    form.setValue('productId', productId)
    form.setValue('userId', userId)
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
```

### Get All Reviews Action

```ts
'use server'

import { prisma } from '@/lib/sample-data/db/prisma'

export async function getAllReviewsAction({
  productId,
}: {
  productId: string
}) {
  const data = await prisma.review.findMany({
    where: { productId: productId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return { data }
}
```

### getReviewByProductIdWrittenByCurrentUser

```ts
import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getReviewByProductIdWrittenByCurrentUser({
  productId,
}: {
  productId: string
}) {
  const session = await auth()
  if (!session) throw new Error('User is not authenticated')
  return await prisma.review.findFirst({
    where: {
      productId: productId,
      userId: session?.user?.id,
    },
  })
}
```

### Display Reviews

- but before we do that , lest go to the types files and ad numReviews

```ts
export type ProductType = z.infer<typeof InsertProductSchema> & {
  id: string
  rating: string
  createdAt: Date
  numReviews: number
}
```

- Lets also create the rating componet(Actually pasted from the course :)

```ts
const Rating = ({ value, caption }: { value: number; caption?: string }) => {
  const Full = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-yellow-500 w-5 h-auto fill-current'
      viewBox='0 0 16 16'>
      <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
    </svg>
  )
  const Half = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-yellow-500 w-5 h-auto fill-current'
      viewBox='0 0 16 16'>
      <path d='M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z' />
    </svg>
  )
  const Empty = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-yellow-500 w-5 h-auto fill-current'
      viewBox='0 0 16 16'>
      <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
    </svg>
  )

  return (
    <div className='flex gap-2'>
      <div className='flex gap-1'>
        {value >= 1 ? <Full /> : value >= 0.5 ? <Half /> : <Empty />}
        {value >= 2 ? <Full /> : value >= 1.5 ? <Half /> : <Empty />}
        {value >= 3 ? <Full /> : value >= 2.5 ? <Half /> : <Empty />}
        {value >= 4 ? <Full /> : value >= 3.5 ? <Half /> : <Empty />}
        {value >= 5 ? <Full /> : value >= 4.5 ? <Half /> : <Empty />}
      </div>

      {caption && <span className='text-sm'>{caption}</span>}
    </div>
  )
}
export default Rating
```

- back to reviewList

```ts
'use client'

import { ReviewType } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReviewForm from './ReviewForm'
import { getAllReviewsAction } from '@/actions/reviews/getAllReviewsAction'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar, User, UserIcon } from 'lucide-react'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import Rating from '@/components/shared/product/Rating'

export default function ReviewList({
  userId,
  productId,
  productSlug,
}: {
  userId: string
  productId: string
  productSlug: string
}) {
  // console.log(userId, productId, productSlug)
  const [reviews, setReviews] = useState<ReviewType[]>([])

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getAllReviewsAction({ productId })
      setReviews(res.data)
    }
    loadReviews()
  }, [productId])

  //reload the reviews
  const reload = () => {
    console.log('Review Submitted')
  }

  return (
    <div className='space-y-4'>
      {reviews.length === 0 && <div> No Reviews Yet</div>}
      {userId ? (
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={reload}
        />
      ) : (
        <div>
          Please{' '}
          <Link
            //remember the callback Url is built in next js, we have to do things like this manually if using express
            href={`/sign-in?callbackUrl=product/${productSlug}`}
            className='text-blue-700 px-2 href'>
            Sign In
          </Link>
          to write a review
        </div>
      )}
      <div className='flex flex-col gap-3'>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className='flex-between'>
                <CardTitle>{review.title}</CardTitle>
              </div>
              <CardDescription>{review.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex space-x-4 text-sm text-muted-underground'>
                {/* Rating  */}
                <Rating value={review.rating} />
                <div className='flex items-center'>
                  <UserIcon className='mr-1 h-3 w-3' />
                  {/* keep in mind that if we delete the user then the review wont be there as it will be deleted, but just in case */}
                  {review.user ? review.user.name : 'Deleted User or User lol'}
                </div>
                <div className='flex items-center'>
                  <Calendar className='mr-1 h-3 w-3' />
                  {formatDateTime(review.createdAt).dateTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

- Also in `product/splug/page.tsx`

```ts
{
  /* <p className=''>
      {singleproduct.rating} of {singleproduct.numReviews} Reviews
    </p> */
}
;<Rating value={Number(singleproduct.rating)} />
```

- Also in the card `components/shared/product/card`

```ts
/* <p className=''>{product.rating} Stars</p> */
;<Rating value={Number(product.rating)} />
```

### Update & reload Reviews

- Go to Review form

```ts
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
```

- But this wont reload, so lest reload from the update ction!! :), actually, not, cuz its just a compont we can reload that componet, the reviewList in fact

```ts
//reload the reviews fater created or updated
const reload = async () => {
  const res = await getAllReviewsAction({ productId })
  setReviews([...res.data])
}
```

- so the previous is cool, cuz the reload fuction is passed, and exectued on creat or update reviews. it will do it right at componetn level in reviewList, it will just use the the setreviews, via useState. pretty simple and cool

## STRIPE PAYMENTS

- Stripe Account Setup
- Payment Intent
- Stripe Form Component
- Payment Success Page
- Webhook for Payment

### Stripe Set Up

- so the beauty of stripe is that we donbt really have to take any credicard numbers ourselves, everyhting is taken care of bby stripe
- ok, open an account, and set it to test mode for now, or development. Actually it seems its on test mode as soon as one opens the account. there is a button to go the the actual live account.
- go to cevelopers, bottom left.
- GRAB keys into .env file
- `npm i stripe @stripe/stripe-js @stripe/react-stripe-js`
- stripe = main stripe package
- @stripe/stripe-js = stripe js library to interact with stripe
- @stripe/react-stripe-js = a react library for hooks and stuff, to make live easier.

### Order Form Payment Intent

- lets add some products to the cart, try to pay with credicard(Stripe)
- hit place order `order/[id]/page.tsx`
- A Payment intent :Represents a specific transaction for collectiong payment froma customer. its as atempt to collect money conatining the info for a payment, trackits status and hand any authentication.
- OVERALL STEPS:
  - Create a payment intent
  - Confirm payment on client
  - Check payment status
  - Handle success/failure
- INTENT STAUTS UPDATES
  - Requires Payment Mewthod
  - Requires confirmation
  - Requires actiona
  - Processing
  - Succeeded
  - Canceled or Failed

```ts
import { getOrderByIdAction } from '@/actions/orders/getOrderByIdAction'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OrderDetailsTable from './OrderDetailsTable'
import { ShippingAddressType } from '@/types'
import { auth } from '@/auth'
import Stripe from 'stripe'

export const metadata: Metadata = {
  title: `Home`,
  description: 'A modern ecommerce store built with next js',
}

export default async function page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const order = await getOrderByIdAction(id) // but remeber we added extra stuff, so we get order, orderItem, and user. lets spread that!! actually the stuff that we added via auth is included in the type, like when we extended tha. so the issue that we have here is beucase the shipping adesstype has lat nad lgn. so we gatte fixt the retur a bit before we pass it
  // console.log(order)
  console.log('order :', order)

  if (!order) notFound()

  const session = await auth()

  let client_secret = null

  //check if is not paid and using stripe
  if (order.paymentMethod === 'stripe' && !order.isPaid) {
    //init stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
    //Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: 'USD',
      metadata: { orderId: order.id },
    })
    client_secret = paymentIntent.client_secret
  }

  return (
    <div>
      {
        <OrderDetailsTable
          order={{
            ...order,
            shippingAddress: order.shippingAddress as ShippingAddressType,
          }}
          stripeClientSecret={client_secret}
          paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'} //sb, identifier for sando account
          isAdmin={session?.user?.role === 'admin'}
          // the fist one was brought by Brad, but is too muc redundant, same with the second one iprepared.  so the above version is the cleanesst and more clear in my opnion
          // isAdmin={session?.user?.role === 'admin' || false} // what this is saying if adminf hen tr otherwise false
          // isAdmin={session?.user?.role === 'admin' ? true : false}
        />
      }
    </div>
  )
}
```

- Make sure to receive the pro in OrderDetailsTable

```ts
  export default function OrderDetailsTable({
  order,
  paypalClientId,
  isAdmin,
  stripeClientSecret,
  }: {
  order: OrderType
  paypalClientId: string
  isAdmin: boolean
  stripeClientSecret: string | null
```

- Create a StripePayment.tsx in `order/[id]/page.tsx`

```ts
export default function StripePayment({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: Number
  orderId: string
  clientSecret: string
}) {
  return <div>Stripe Form</div>
}
```

- bring it to the order details table

```ts
{
  isPaid && paymentMethod === 'stripe' && stripeClientSecret && (
    <StripePayment
      priceInCents={Number(order.totalPrice) * 100} // to have it in cents
      orderId={order.id}
      clientSecret={stripeClientSecret}
    />
  )
}
```

### Back Stripe Payment Component

- `https://www.npmjs.com/package/@stripe/react-stripe-js`
- so just to recapitulate. pretty much the whole deal is getting the clientSecret and pasing that as prop.

```ts
import { loadStripe } from '@stripe/stripe-js'
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'

export default function StripePayment({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: Number
  orderId: string
  clientSecret: string
}) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  )

  const { theme, systemTheme } = useTheme()

  //stripe form
  const StripeForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    return (
      <form className='space-y-4'>
        <div className='text-xl'>Stripe Checkout</div>
        {errorMessage && <div className='text-destructive'>{errorMessage}</div>}
        <PaymentElement />
        {/* SECURE LINK  , this is=f they select the stripe link , so this email will help recognize returning customers*/}
        {/* SECURE LINK   */}
        <div className=''>
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
          />
        </div>
        {/* SECURE LINK   */}
        {/* SECURE LINK   */}
        <Button
          className='w-full'
          size={'lg'}
          disabled={stripe == null || elements == null || isLoading}>
          {isLoading
            ? 'Purchasing...'
            : `Purshase ${formatCurrencyHelper(Number(priceInCents) / 100)}`}
        </Button>
      </form>
    )
  }

  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme:
            theme === 'dark'
              ? 'night'
              : theme === 'light'
              ? 'stripe'
              : systemTheme === 'light'
              ? 'stripe'
              : 'night',
        },
      }}
      stripe={stripePromise}>
      <StripeForm />
    </Elements>
  )
}
```

- Go back to the stripForm component, and do the submisson part (Logic)

```ts
import { loadStripe } from '@stripe/stripe-js'
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js'
import { useTheme } from 'next-themes'
import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'
import { SERVER_URL } from '@/lib/contants'

export default function StripePayment({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: Number
  orderId: string
  clientSecret: string
}) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  )

  const { theme, systemTheme } = useTheme()

  //stripe form
  const StripeForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      if (stripe === null || elements == null || email == null) return
      setIsLoading(true)
      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            // dont forget that:  SERVER_URL => come from constatnt and this is whatever our serve url is,
            return_url: `${SERVER_URL}`,
          },
        })
        .then(({ error }) => {
          if (
            error?.type === 'card_error' ||
            error?.type === 'validation_error'
          ) {
            // error.message ?? 'An unknowun error occured' = error mesage but if not then  'An unknowun error occured'
            setErrorMessage(error.message ?? 'An unknowun error occured')
          } else if (error) {
            setErrorMessage('An unknown error at stripe payment has occurred')
          }
          // the finally will run no matter what
        })
        .finally(() => setIsLoading(false))
    }
    return (
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div className='text-xl'>Stripe Checkout</div>
        {errorMessage && <div className='text-destructive'>{errorMessage}</div>}
        <PaymentElement />
        {/* SECURE LINK  , this is=f they select the stripe link , so this email will help recognize returning customers*/}
        {/* SECURE LINK   */}
        <div className=''>
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
          />
        </div>
        {/* SECURE LINK   */}
        {/* SECURE LINK   */}
        <Button
          className='w-full'
          size={'lg'}
          disabled={stripe == null || elements == null || isLoading}>
          {isLoading
            ? 'Purchasing...'
            : `Purshase ${formatCurrencyHelper(Number(priceInCents) / 100)}`}
        </Button>
      </form>
    )
  }

  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme:
            theme === 'dark'
              ? 'night'
              : theme === 'light'
              ? 'stripe'
              : systemTheme === 'light'
              ? 'stripe'
              : 'night',
        },
      }}
      stripe={stripePromise}>
      <StripeForm />
    </Elements>
  )
}
```

- now try to pay use `4242 4242 4242 4242` as a dummy credicard
- experiration date `12/34`
- Security Code `123`
- zipcode `12345`
- Email `test@test.com`
  so it should eb redirected , with succedd in url, it wont reflect on db hyet, nut one can check the stripe console

### Stripe Sucess page

```ts
import { getOrderByIdAction } from '@/actions/orders/getOrderByIdAction'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function stripePaymentSuccessPage(props: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ payment_intent: string }>
}) {
  const { id } = await props.params
  const { payment_intent: paymentIntentId } = await props.searchParams

  //Fetch order
  const order = await getOrderByIdAction(id)
  if (!order) notFound()

  // Retrieve paymentIntent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  // Check if paymentIntent is valid
  // remember we added orderId in metadata in [id]/page.tsx; to the paymentIntent
  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order.id.toString()
  ) {
    return notFound()
  }

  // Check if payment is successfull
  const isSuccess = paymentIntent.status === 'succeeded'
  if (!isSuccess) return redirect(`/order/${id}`)

  return (
    <div className='max-w-4xl w-full mx-auto space-y-8'>
      <div className='flex felx-col gap-6 items-center'>
        <h1 className='h1-bold'>Thanks for your purchase</h1>
        <div className=''>We are processing your order.</div>
        <Button asChild>
          <Link href={`/order/${id}`}>View Order</Link>
        </Button>
      </div>
    </div>
  )
}
```

- Now here is the deal, if we go to the order page, it shows upaid, and we can even see the stripe fomr thre. so what we need to do is make sure the app is uptodate in vercel , then we will use a webhook, to update from stripe inti the website.

## DEPLOYMENT TIME

- We should have done this long time ago! naywways, lets make sure everyhting is nice and tight. after deploymenty donbt forget to change the BASEURL manually, but hm, ima guessing there must be a better way, like setting a automatic BASEURL || local. impretty sure we can do that so that we dont have to deal with those manually. anyways for now lets leave it like ti is and retype those URLS m,anually
