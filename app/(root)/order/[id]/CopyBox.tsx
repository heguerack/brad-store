'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CopyBox({
  type,
  value,
}: {
  type: string
  value: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      type === 'cd'
        ? '4242 4242 4242 4242'
        : type === 'date'
          ? '12 / YY'
          : type === 'paypal'
            ? 'sb-4kmv144195043@personal.example.com'
            : '123'
    )
    setCopied(!copied)
    // setTimeout(() => setCopied(false), 5000)
  }

  return (
    <div className='flex items-center justify-between border rounded-xl p-3 mb-2 bg-white shadow-sm'>
      <div>
        <div>{!copied && <p className='text-sm text-gray-500'>{value}</p>}</div>
        <div>
          {copied && (
            <p
              onClick={handleCopy}
              className={cn('font-mono text-lg text-green-600')}>
              {value}
            </p>
          )}
        </div>
      </div>
      <Button
        type='button'
        onClick={handleCopy}
        size='icon'
        variant='ghost'
        aria-label={`Copy ${value}`}>
        {copied ? <Check className='text-green-600' /> : <Copy />}
      </Button>
    </div>
  )
}
