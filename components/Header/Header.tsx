import React from 'react'
import { signOut, signIn, useSession } from 'next-auth/react'

import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline/'

import { Image, Link } from '@common'
import { imgLoader } from '@utils'
import { useAppSelector } from '@hooks'
import { selectBasketItemsTotalCount } from '@reduxStore'

export const Header = () => {
  const itemsTotalCount = useAppSelector(selectBasketItemsTotalCount)
  const {data: session} = useSession()
  console.log(session)

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#e7ecee] p-4">
      <div className="md: flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-5 w-10 cursor-pointer opacity-75 transition  hover:opacity-100">
            <Image
              alt='apple'
              src={'https://rb.gy/vsvv2o'}
              layout={'fill'}
              objectFit={'contain'}
            />
          </div>
        </Link>
      </div>

      <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
        <Link href="/">
          <a className="headerLink">Product</a>
        </Link>
        <Link href="/">
          <a className="headerLink">Explore</a>
        </Link>
        <Link href="/">
          <a className="headerLink">Support</a>
        </Link>
        <Link href="/">
          <a className="headerLink">Business</a>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4 md:w-1/5">
        <MagnifyingGlassIcon className="headerIcon" />
        <Link href={'/checkout'}>
          <div className="relative cursor-pointer">
            {!!itemsTotalCount && (
              <span
                className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center
             rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white"
              >
                {itemsTotalCount}
              </span>
            )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>
        {session ? (
          <Image
            alt='avatart'
            loader={imgLoader}
            src={session.user?.image || "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=1200"}
            className="cursor-pointer rounded-full"
            width={24}
            height={24}
            onClick={() => signOut()}
          />
        ) : (
          <UserIcon className="headerIcon" onClick={() => signIn('google', {callbackUrl: '/'})} />
        )}
      </div>
    </header>
  )
}
