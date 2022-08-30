import React from 'react'

import { Image } from '@common'
import { Button } from '@components/Button'

export const Landing = () => {
  return (
    <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
      <div className={'space-y-8'}>
        <h1 className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Powered
          </span>
          <span className={'block '}>Be Intellect</span>
          <span className={'block '}>Driven by values</span>
        </h1>

        <div className='flex items-center gap-8'>
          <Button title="By now" withIcon/>
          <a className={'link'}>Learn more</a>
        </div>
      </div>

      <div className='relative hidden transition-all duration-500 h-[450px] w-[450px] lg:h-[650px] lg:w-[650px] md:inline'>
        <Image alt='phone' src="/iphone.png" layout={'fill'} objectFit={'contain'} />
      </div>
    </section>
  )
}