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

```ts
git remote add origin https://github.com/heguerack/brad-store.git
git branch -M main
git push -u origin main
```

```ts
git checkout proj_name
git add .
git commit -m "message here"
```
