import '../styles/globals.css'
import '../src/config/firebase.config.ts'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
