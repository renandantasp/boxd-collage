import '@/styles/globals.css'
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { Roboto_Slab } from 'next/font/google'
 
const roboto = Roboto_Slab({
  weight: ['200','300','400','500', '600', '700', '800', '900'],
  style: ['normal',],
  subsets: ['latin'],
})
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Head>
        <link rel="shortcut icon" href="/boxd.svg" />
        <title>Letterboxd Collage</title>
      </Head>
      <Component {...pageProps} />
    </main>
  )
  
}
