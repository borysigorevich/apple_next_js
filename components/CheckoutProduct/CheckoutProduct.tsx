import React from 'react'

import Currency from 'react-currency-formatter'
import { toast } from 'react-hot-toast'

import { removeFromBasket } from '@reduxStore'
import { imgLoader } from '@utils'
import { Image } from '@common'
import { urlFor } from '@lib'

import { ChevronDownIcon } from '@heroicons/react/24/outline/'
import { useAppDispatch } from '@hooks'

type CheckoutProductType = {
  product: ProductType & { count: number }
}

export const CheckoutProduct = ({ product }: CheckoutProductType) => {
  const dispatch = useAppDispatch()

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket(product._id))
    toast.error(`${product.title} has successfully removed from basket`)
  }

  return (
    <div className='flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center'>
      <div className="relative h-44 w-44">
        <Image
          alt='product img'
          loader={imgLoader}
          src={urlFor(product.image[0]).url()}
          layout={'fill'}
          objectFit={'contain'}
        />
      </div>

      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div
            className={'flex flex-col gap-8 text-xl lg:flex-row lg:text-2xl'}
          >
            <h4 className="font-semibold lg:w-96">{product.title}</h4>
            <p className="flex items-center gap-1 font-semibold">
              {product.count}
              <ChevronDownIcon className="h-6 w-6 text-blue-500" />
            </p>
          </div>

          <p className="flex cursor-pointer items-center text-blue-500 hover:underline max-w-fit">
            Show Products details
            <ChevronDownIcon className="h-6 w-6 text-blue-500" />
          </p>
        </div>

        <div className='flex flex-col items-end gap-4'>
          <h4 className='text-xl font-semibold lg:text-2xl'>
            <Currency
              quantity={product.price * product.count}
              currency={'usd'}
            />
          </h4>

          <button
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={removeItemFromBasket}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
