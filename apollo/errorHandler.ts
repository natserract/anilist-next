import { ApolloLink } from "@apollo/client"
import { onError } from "@apollo/client/link/error"

export default function errorHandler(): ApolloLink {
  const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: message: ${message}, location: ${JSON.stringify(
            locations
          )}, path: ${JSON.stringify(path)}`
        )
      )
    if (networkError) console.error(`[Network error]: ${networkError}`)
  })

  return onErrorLink
}
