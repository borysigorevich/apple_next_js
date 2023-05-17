import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'
import { urlFor } from '@lib'

console.log(process.env.STRIPE_SECRET, '***')

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: '2022-08-01',
})

type ItemsType = ProductType & { count: number }

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const items: ItemsType[] = req.body

    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        line_items: items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              images: [urlFor(item.image[0]).url()],
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.count,
        })),
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          images: JSON.stringify(items.map((item) => item.image[0].asset.url)),
        },
      }
      const session = await stripe.checkout.sessions.create(params)
      res.status(200).json(session)
    } catch (error) {
      let errorMessage = error instanceof Error ? error.message : error

      res.status(500).json(errorMessage)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}

export default handler
