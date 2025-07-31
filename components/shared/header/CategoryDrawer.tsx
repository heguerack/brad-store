import { getAllCategoriesAction } from '@/actions/products/getAllCategoriesAction'
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
