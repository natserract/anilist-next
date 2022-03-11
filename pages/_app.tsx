import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextApp from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nProgress from "nprogress";
import "../styles/nprogress.css"

import Themes from '../themes';
import Layout from '../layouts/container';

import { useApollo } from '@/apollo/initApollo';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", nProgress.start);
    router.events.on("routeChangeComplete", nProgress.done);
    router.events.on("routeChangeError", nProgress.done);

    return () => {
      router.events.off("routeChangeStart", nProgress.start);
      router.events.off("routeChangeComplete", nProgress.done);
      router.events.off("routeChangeError", nProgress.done);
    };
  }, [router]);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
App.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(ctx);

  // Pass the data to our page via props
  return { ...appProps };
};

export default App;
