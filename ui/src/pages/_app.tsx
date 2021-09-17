import '../styles/globals.css'
import { Provider } from "next-auth/client"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider options={{ clientMaxAge: 0, keepAlive: 0}} session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
