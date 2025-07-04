// import { generateAccessToken } from '@/lib/paypal'

import { generateAccessToken, paypal } from '../lib/paypal' //seems like we cant use the alis here, cuz its not next js!

///Tte to generate access token from paypal
test('generates token from paypal', async () => {
  const tokenResponse = await generateAccessToken()
  console.log('tokenResponse :', tokenResponse)

  // so its basically testing 3 throwForMissingRequestStore, logginh ther responseCookiesToRequestCookies, making sure is  a string , and alos making sure the string is more than zero

  expect(typeof tokenResponse).toBe('string')
  expect(tokenResponse.length).toBeGreaterThan(0)
})

test('create a paypal order', async () => {
  const token = await generateAccessToken()
  const price = 10.0
  const orderResponse = await paypal.createOrder(price)
  console.log('orderResponse: ', orderResponse)
  expect(orderResponse).toHaveProperty('id')
  expect(orderResponse).toHaveProperty('status')
  expect(orderResponse.status).toBe('CREATED')
})

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
