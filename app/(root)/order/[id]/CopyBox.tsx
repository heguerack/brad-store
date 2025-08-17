'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'

export default function CopyBox({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value === 'CVC' ? '123' : value)
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
              className='font-mono text-lg text-green-600'>
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
