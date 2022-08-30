import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Currency from 'react-currency-formatter'
import { Stripe } from 'stripe'

import { ChevronDownIcon } from '@heroicons/react/24/outline/'

import { selectBasketItems, selectBasketItemsTotalCount } from '@reduxStore'
import { Button, CheckoutProduct, Header } from '@components'
import { fetchPostJSON, getStripe } from '@lib'
import { useAppSelector } from '@hooks'

const Checkout = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const items = useAppSelector(selectBasketItems)
  const itemsTotalCount = useAppSelector(selectBasketItemsTotalCount)

  const products = Object.values(items)

  const totalPrice = products.reduce(
    (result, product) => result + product.count * product.price,
    0
  )

  const handleContinueShopping = () => router.push('/')

  const handleSubmit = async () => {
    setLoading(true)

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      '/api/checkout_session',
      products
    )

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message)
      return
    }

    const stripe = await getStripe()

    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    })
    console.warn(error)
  }

  // const obj: { [key: string]: number[] } = {}
  // ;(obj.one = obj.one || []).push(1)
  // ;(obj.one = obj.one || []).push(2)

  return (
    <div className="min-h-screen overflow-hidden bg-[#e7ecee]">
      <Head>
        <title>Cart - Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="mx-auto max-w-5xl pb-24 ">
        <div className="px-5">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {itemsTotalCount ? 'Review your bag' : 'Your bag is empty'}
          </h1>
          <p className="my-4">Free delivery and returns</p>

          {!itemsTotalCount && (
            <Button
              title="Continue Shopping"
              onClick={handleContinueShopping}
            />
          )}

          {!!itemsTotalCount && (
            <div className="mx-5 md:mx-8">
              {products.map((product) => (
                <CheckoutProduct key={product._id} product={product} />
              ))}

              <div className="my-12 mt-6 ml-auto max-w-3xl">
                <div className={'divide-y divide-gray-300'}>
                  <div className="pb-4">
                    <div className="flex justify-between ">
                      <p>Subtotal</p>
                      <p>
                        <Currency currency={'usd'} quantity={totalPrice} />
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>Shipping</p>
                      <p>FREE</p>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col gap-x-1 lg:flex-row">
                        Estimated text for:
                        <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                          Enter zip code
                          <ChevronDownIcon className="h-6 w-6" />
                        </p>
                      </div>

                      <p>$ -</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 text-xl font-semibold">
                    <h4>Total</h4>
                    <h4>
                      <Currency currency={'usd'} quantity={totalPrice} />
                    </h4>
                  </div>
                </div>

                <div className="my-14 space-y-4">
                  <h4 className="text-xl font-semibold">
                    How would you like to checkout?
                  </h4>

                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 px-8 py-12 text-center">
                      <h4 className="mb-4 flex flex-col text-xl font-semibold">
                        <span>Pay Monthly</span>
                        <span>With Apple card</span>
                        <span>
                          $200.00/mo at 0% APR<sup className="-top-1">◊</sup>
                        </span>
                      </h4>
                      <Button
                        title={'Check out with Apple Pay Monthly Installments'}
                      />
                      <p className="mt-4 max-w-[240p] text-[13px] ">
                        $0.00 due today, which includes applicable full-price
                        items, down payments, shipping and taxes.
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col items-center rounded-xl bg-gray-200 px-8 py-12 text-center md:order-2">
                      <h4 className="mb-4 flex flex-col text-xl font-semibold">
                        Pay in full
                        <span>
                          <Currency currency={'usd'} quantity={totalPrice} />
                        </span>
                      </h4>

                      <Button title="Check out" withIcon width={'w-full'} onClick={handleSubmit}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Checkout
