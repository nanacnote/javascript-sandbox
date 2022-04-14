import Head from 'next/head'
import { AppProps } from 'next/app'
import { MyProvider } from '../my_components'
import '../public/stylesheet/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Owusu K. | Fullstack Web Developer | Norwich - UK</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
      </Head>
      <MyProvider>
        <Component {...pageProps} />
      </MyProvider>
    </>
  )
}

export default MyApp
