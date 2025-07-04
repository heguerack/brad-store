const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'

export const paypal = {
  createOrder: async function createOrder(price: number) {
    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: price,
            },
          },
        ],
      }),
    })
    if (response.ok) {
      return await response.json()
    } else {
      const errorMesage = await response.text()
      throw new Error(errorMesage)
    }
  },
  capturePayment: async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders/${orderId}/capture`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (response.ok) {
      return await response.json()
    } else {
      const errorMesage = await response.text()
      throw new Error(errorMesage)
    }
  },
}

// Generate paypal  Acces Token

async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env
  // explanation  => /docs/bufferfrom.md
  // const buf = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}}`) // this encodes
  // const auth = buf.toString('base64')

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`).toString(
    'base64'
  )
  // more explanation hre
  // explanation  => /docs/bufferfrom2.md
  //const reversed = Buffer.from(auth, 'base64').toString('utf-8'); this if i wanted to get back what i inserted , when encoding.  so yeah this would be the decoder lol
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',

    //explantion on when to use headers, even via actions => /docs/headers.md
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (response.ok) {
    const jsonData = await response.json()
    return jsonData.access_token
  } else {
    const errorMesage = await response.text()
    throw new Error(errorMesage)
  }
}

export { generateAccessToken }
