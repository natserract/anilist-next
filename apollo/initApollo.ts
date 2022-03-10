import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import ErrorHandler from "./errorHandler"
import { initCache } from "./caching"
import fetch from "isomorphic-unfetch"
import merge from "deepmerge"
import isEqual from "lodash/isEqual"
import { useMemo } from "react"
import { API_URL } from "constants/endpoint"

let globalApolloClient: ApolloClient<NormalizedCacheObject> | null = null
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__"

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
export default function initApolloClient(
  initialState?: any
): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return _createApolloClient(initialState)
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = _createApolloClient(initialState)
  }

  return globalApolloClient
}

function _makeClientSideLink(API_URL: string) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const httpLink = new HttpLink({
    uri: `${API_URL}/graphql`,
    credentials: "same-origin",
    fetch,
  })

  return httpLink
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function _createApolloClient(initialState = {}) {
  const ssrMode = typeof window === "undefined"

  let cache = initCache(initialState)

  const MAIN_URL = API_URL
  if (!MAIN_URL) {
    throw new Error("API_URL envvar is not set")
  }

  // Check out https://github.com/vercel/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode,
    link: ApolloLink.from([ErrorHandler(), _makeClientSideLink(API_URL)]),
    cache,
  })
}

export function initializeApollo(
  initialState = null
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = globalApolloClient ?? _createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient
  // Create the Apollo Client once in the client
  if (!globalApolloClient) globalApolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: { cache: { extract: () => any } },
  pageProps: {
    props: { [x: string]: any },
    [k: string]: any
  }
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: { [x: string]: any }) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
