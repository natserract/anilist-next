import { InMemoryCache, gql, makeVar } from "@apollo/client"

export const GET_LOCALSTATE_QUERY = gql`
  query GetLocalState {
    initialState @client
  }
`

export const globalVar = makeVar({
  ids: []
})

export function initCache(initialState = {}): InMemoryCache {
  const cache = new InMemoryCache().restore(initialState)
  cache.writeQuery({
    data: globalVar,
    query: GET_LOCALSTATE_QUERY,
  })

  return cache
}
