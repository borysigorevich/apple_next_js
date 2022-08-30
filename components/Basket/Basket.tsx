import React from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline/'

import { Link } from '@common'
import { useAppSelector } from '@hooks'
import { selectBasketItemsTotalCount } from '@reduxStore'

export const Basket = () => {
  const itemsTotalCount = useAppSelector(selectBasketItemsTotalCount)

  return (
    <Link href={'/checkout'}>
      <div
        className={`fixed bottom-10 ${
          itemsTotalCount ? 'right-10' : '-right-20'
        } z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300 transition-all`}
      >
        <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
          {itemsTotalCount}
        </span>
        <ShoppingBagIcon className="headerIcon h-8 w-8" />
      </div>
    </Link>
  )
}
