import { APP_NAME } from '@/lib/contants'
import { OrderType } from '@/types'
import { Resend } from 'resend'
import PurchaceReceiptEmail from './PurchaceReceiptEmail'
// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY as string)
const senderEmail = process.env.SENDER_EMAIL
const appName = APP_NAME

export const sendPurchaseReceipt = async ({ order }: { order: OrderType }) => {
  console.log('Order passed to resend :', order)

  await resend.emails.send({
    from: `${appName}<${senderEmail}>`,
    to: order.user.email,
    subject: `Order confirmation ${order.id}`,
    react: (
      <>
        <PurchaceReceiptEmail order={order} />
      </>
    ),
  })
}
