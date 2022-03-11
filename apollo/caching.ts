import { InMemoryCache, gql, makeVar } from "@apollo/client"

export const GET_LOCALSTATE_QUERY = gql`
  query GetLocalState {
    initialState @client
  }
`

export function initCache(initialState = {}): InMemoryCache {
  let cache = new InMemoryCache().restore(initialState)
  cache.writeQuery({
    data: {},
    query: GET_LOCALSTATE_QUERY,
  })

  return cache
}
