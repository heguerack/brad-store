// components/TestUpdatePaidButton.tsx
'use client'

import { updateOrderToPaid } from '@/actions/orders/updateOrderToPaidAction'

export default function ForcePaymentButton({
  orderId,
  email,
}: {
  orderId: string
  email: string
}) {
  return (
    <button
      className='cursor-pointer'
      type='button'
      onClick={async () =>
        await updateOrderToPaid({
          orderId,
          paymentResult: {
            id: 'manual-test-id',
            status: 'COMPLETED',
            email_address: email,
            pricePaid: '0.00',
          },
        })
      }>
      Update to paid
    </button>
  )
}
