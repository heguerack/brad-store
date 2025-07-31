'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/helperFuntions/formUrlQuery'
// import { formUrlQuery } from '@/helperFuntions/formUrlQuery'

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

  const handleClick = (type: string) => {
    const pageValue = type === 'next' ? Number(page) + 1 : Number(page) - 1

    const newURL = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    })
    router.push(newURL)
  }
  return (
    <div className='flex gap-2 '>
      <Button
        className='w-28'
        disabled={Number(page) <= 1}
        variant={'outline'}
        size={'lg'}
        onClick={() => handleClick('prev')}>
        Previous
      </Button>
      <Button
        className='w-28'
        disabled={Number(page) >= totalPages}
        variant={'outline'}
        size={'lg'}
        onClick={() => handleClick('next')}>
        Next
      </Button>
    </div>
  )
}
