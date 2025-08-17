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
import CopyBox from './CopyBox'

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
      if (stripe == null || elements == null || email == null) return
      setIsLoading(true)
      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            // dont forget that:  SERVER_URL => come from constatnt and this is whatever our serve url is,
            return_url: `${SERVER_URL}/order/${orderId}/stripe-payment-success`,
          },
        })
        .then(({ error }) => {
          if (
            error?.type === 'card_error' ||
            error?.type === 'validation_error'
          ) {
            // error.message ?? 'An unknowun error occured' = error mesage but if not then  'An unknowun error occured'
            console.log('error :', error)

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
        <CopyBox value='4242 4242 4242 4242' />
        <CopyBox value='12 / 34' />
        <CopyBox value='CVC' />

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
