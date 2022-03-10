import { InMemoryCache, gql } from "@apollo/client"

export interface InitialStateI {
  initialState: {
    theme: "dark" | "light"
    author: string
    counter: number
  }
}

export const GET_LOCALSTATE_QUERY = gql`
  query GetLocalState {
    initialState @client
  }
`

const _initialState: InitialStateI = {
  initialState: {
    theme: "dark",
    author: "Alfin Surya",
    counter: 0,
  },
}

export function initCache(initialState = {}): InMemoryCache {
  let cache = new InMemoryCache().restore(initialState)
  cache.writeQuery({
    data: _initialState,
    query: GET_LOCALSTATE_QUERY,
  })

  return cache
}
