import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'
import sampleData from '@/lib/sample-data/db/sample-data'
import { OrderType } from '@/types'
require('dotenv').config()
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Img,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

// we cant do this if we use an arrow function for the main funtion PurchaceReceiptEmail
PurchaceReceiptEmail.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    userId: '123',
    user: {
      name: 'John Doe',
      email: 'test@test.com',
    },
    paymentMethod: 'Stripe',
    shippingAddress: {
      fullName: 'John Doe',
      streetAddress: '123 Main st',
      city: 'New York',
      postalCode: '10001',
      country: 'US',
    },
    createdAt: new Date(),
    totalPrice: '100',
    taxPrice: '10',
    shippingPrice: '10',
    itemsPrice: '80',
    OrderItems: sampleData.products.map((x) => ({
      name: x.name,
      orderId: '123',
      productId: '123',
      slug: x.slug,
      qty: x.stock,
      image: x.images[0],
      price: x.price.toString(),
    })),
    isDelivered: true,
    deliveredAt: new Date(),
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
      id: '123',
      status: 'succeeded',
      pricePaid: '100',
      email_address: 'test@test.com',
    },
  },
} satisfies OrderInformationProps

type OrderInformationProps = {
  order: OrderType
}
const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export default function PurchaceReceiptEmail({ order }: OrderInformationProps) {
  return (
    <Html>
      <Preview>View order receipt</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Heading>Purshase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Order ID
                  </Text>
                  <Text className='mt-0 mr-4'>{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Purshase Date
                  </Text>
                  <Text className='mt-0 mr-4'>
                    {/* interesting */}
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Price Paid
                  </Text>
                  <Text className='mt-0 mr-4'>
                    {formatCurrencyHelper(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className='border border-solid border-gray-500 rounded-lg p-4 md:p-6  my-4'>
              {order.OrderItems.map((item) => (
                <Row key={item.slug} className='mt-8'>
                  <Column className='w-20 '>
                    <Img
                      width='80'
                      alt={item.name}
                      className='rounded'
                      // im not sure about this logic, like i understand the logic but not sure why local images and outside images for emails. because so far the images are part of the product . nd by the way we must have added the fist image of the product images as image for the order
                      src={
                        item.image.startsWith('/')
                          ? `${process.env.NEXT_PUBLIC_SERVER_URL}${item.image}`
                          : item.image
                      }
                    />
                  </Column>
                  <Column className='align-top'>
                    {item.name} x {item.qty}
                  </Column>

                  <Column align='right' className='align-top'>
                    {formatCurrencyHelper(item.price)}
                  </Column>
                </Row>
              ))}
              {[
                { name: 'Items', price: order.itemsPrice },
                { name: 'Tax', price: order.taxPrice },
                { name: 'Shipping', price: order.shippingPrice },
                { name: 'Total', price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row className='py-1' key={name}>
                  <Column align='right'>{name}:</Column>
                  <Column align='right' width={70} className='align-top'>
                    <Text className='m-0'>{formatCurrencyHelper(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
