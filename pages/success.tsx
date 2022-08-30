import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useMediaQuery } from 'react-responsive'
import Currency from 'react-currency-formatter'
import { Stripe } from 'stripe'
import {useSession} from 'next-auth/react'

import {
  CheckIcon,
  ShoppingCartIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline/'

import { Image, Link } from '@common'
import { Button } from '@components'

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: '2022-08-01',
})

type PropsType = {
  products: StripeProduct[]
}

export const getServerSideProps: GetServerSideProps<PropsType> = async ({
  query,
}) => {
  const { session_id } = query
  console.log(session_id)
  const session = await stripe.checkout.sessions.listLineItems(
    session_id as string
  )

  const products: StripeProduct[] = session.data as StripeProduct[]

  if (!products) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products,
    },
  }
}

const Success = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const { session_id } = router.query
  const {data: session} = useSession()

  const continueShopping = () => router.push('/')
  const handleShowSummary = () => setShowSummary((state) => !state)

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' })
  const showOrderSummaryCondition = isTabletOrMobile ? showSummary : true
  console.log(session)
  const totalAmount =
    products.reduce((result, product) => result + product.amount_total, 0) / 100
  console.log(totalAmount)

  useEffect(() => setIsMounted(true), [])

  console.log(products)

  return (
    <div>
      <Head>
        <title>Thank you - Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mx-auto max-w-xl">
        <Link href={'/'}>
          <div className="relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden">
            <Image
              alt='apple'
              src={'https://rb.gy/vsvv2o'}
              layout={'fill'}
              objectFit={'contain'}
            />
          </div>
        </Link>
      </header>

      <main className='grid grid-cols-1 lg:grid-cols-9'>
        <section className="order-2 mx-auto max-w-xl space-y-4 pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href={'/'}>
            <div className="relative ml-14 hidden h-24 w-12 cursor-pointer transition lg:inline-flex">
              <Image
                alt='apple'
                src={'https://rb.gy/vsvv2o'}
                layout={'fill'}
                objectFit={'contain'}
              />
            </div>
          </Link>

          <div className="my-8 ml-4 flex items-center gap-4 lg:ml-14 xl:ml-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black">
              <CheckIcon className="h-8 w-8" />
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg">Thank you {session?.user?.name}</h4>
            </div>
          </div>

          <div className="mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14">
            <div className="space-y-2 pb-3">
              <p>Your order is confirmed</p>
              <p className="text-sm text-gray-600">
                We&rsquo;ve accepter your order and we&rsquo;re getting it ready. Come back
                to this page for updates on your shipment status.
              </p>
            </div>

            <div className="pt-3 text-sm">
              <p className="font-medium text-gray-600">
                Your tracking number:
              </p>
              <p>CNB21441622</p>
            </div>
          </div>

          <div className="mx-4 rounded-md border border-gray-300 p-4 lg:ml-14">
            <p>Order updates</p>
            <p className="text-sm text-gray-600">
              You will get shipping and delivery updates by email.
            </p>
          </div>

          <div className="mx-4 flex flex-col items-center  gap-4 lg:ml-14 lg:justify-between lg:flex-row ">
            <p className="hidden lg:inline">Need help? Contact us.</p>
            {isMounted && (
              <Button
                title={'Continue shopping'}
                onClick={continueShopping}
                width={isTabletOrMobile ? 'w-full' : undefined}
                padding={'py-4'}
              />
            )}
          </div>
        </section>

        {isMounted && (
          <section className="overflow-y-scroll border-y border-l border-gray-300 bg-[#fafafa] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full ${
                showOrderSummaryCondition && 'border-b'
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6">
                <button
                  onClick={handleShowSummary}
                  className="flex items-center gap-2 "
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <p>Show order summary</p>
                  {showSummary ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>

                <p className={'text-xl font-medium text-black'}>
                  <Currency currency={'usd'} quantity={totalAmount} />
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div
                className={
                  'mx-auto max-w-xl divide-y border-gray-300 py-4 px-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16'
                }
              >
                <div className="mb-4 space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 text-sm font-medium"
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#f1f1f1] text-xs text-white">
                        <div className="relative h-7 w-7 animate-bounce rounded-md">
                          <Image
                            alt='apple'
                            src={'https://rb.gy/vsvv2o'}
                            layout={'fill'}
                            objectFit={'contain'}
                          />
                        </div>

                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
                          {product.quantity}
                        </div>
                      </div>
                      <p className="flex-1">{product.description}</p>
                      <Currency
                        quantity={product.amount_subtotal / 100}
                        currency={'usd'}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-[gray]">{totalAmount}</p>
                    <p className="font-medium">
                      <Currency quantity={totalAmount} currency={'usd'} />
                    </p>
                  </div>

                  <div className={'flex justify-between'}>
                    <p>Discount</p>
                    <p>
                      <Currency quantity={0} currency={'usd'} />
                    </p>
                  </div>

                  <div className={'flex justify-between'}>
                    <p>Shipping</p>
                    <p>
                      <Currency quantity={20} currency={'usd'} />
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <p>Total</p>
                  <p className="flex items-center gap-2 text-xs text-[gray]">
                    USD
                    <span className="text-xl font-medium text-black">
                      <Currency currency={'usd'} quantity={totalAmount + 20} />
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default Success
