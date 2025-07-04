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
