import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextApp from "next/app"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createTheme, responsiveFontSizes } from "@material-ui/core"
import Themes from '../themes'
import { ApolloProvider } from "@apollo/client"
import {useApollo} from '@/apollo/initApollo'
import { ThemeProvider } from "@material-ui/core/styles"

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
App.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(ctx)

  // Pass the data to our page via props
  return { ...appProps }
}

export default App
