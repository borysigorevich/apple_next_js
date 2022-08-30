import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

import '../styles/globals.css'

import { store } from '@reduxStore'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster position={'bottom-center'} reverseOrder={false} />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
