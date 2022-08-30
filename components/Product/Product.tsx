import React, { useEffect } from 'react'

import { Image } from '@common'
import { urlFor } from '@lib'
import { imgLoader } from '@utils'
import { useAppDispatch, useAppSelector } from '@hooks'
import { addToBasket, selectBasketItems, removeFromBasket, selectBasketItemsTotalCount } from '@reduxStore'
import {toast} from 'react-hot-toast'

import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline/'

type ProductProps = {
  product: ProductType
}

export const Product = ({ product }: ProductProps) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectBasketItems)
  const itemsTotalCount = useAppSelector(selectBasketItemsTotalCount)

  const addItemToBasket = () => {
    dispatch(addToBasket(product))
    toast.success(`${product.title} has successfully added to basket`)
  }

  const handleRemoveFromBasket = () => {
    dispatch(removeFromBasket(product._id))
    toast.error(`${product.title} has successfully removed from basket`)
  }

  console.log({ items, itemsTotalCount })
  return (
    <div className="flex h-fit w-full max-w-[400px] select-none flex-col space-y-3 rounded-lg bg-[#35383c] p-8 md:h-[500px] md:p-10">
      <div className={'relative h-64 w-full md:h-72'}>
        <Image
          alt='product img'
          src={urlFor(product.image[0]).url()}
          loader={imgLoader}
          layout={'fill'}
          objectFit={'cover'}
        />
      </div>

      <div className={'flex flex-1 items-center justify-between gap-3'}>
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>

        <button
          className="flex h-16 w-16 flex-shrink-0 cursor-pointer items-center
        justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]"
          onClick={addItemToBasket}
        >
          <ShoppingCartIcon className="h-8 w-8 text-white" />
        </button>
        <button
          type={'button'}
          disabled={!items[product._id]}
          className={`disabled:bg-gray-600 disabled:bg-gradient-none disabled:text-red flex h-16 w-16 flex-shrink-0 cursor-pointer items-center
            justify-center rounded-full ${items[product._id] && 'bg-gradient-to-r'} from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]`}
          onClick={handleRemoveFromBasket}
        >
          <TrashIcon className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  )
}
