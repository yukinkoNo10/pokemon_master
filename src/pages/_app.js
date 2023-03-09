import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  )
}
