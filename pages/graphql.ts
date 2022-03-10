import gql from 'graphql-tag'

export const HOMEQUERY = gql`
  query MediaListQuery {
    Page(page: 1, perPage: 3) {
      pageInfo {
        total
        perPage
      }

      # search: "",
      media(type: ANIME, sort: FORMAT_DESC) {
        id
        title {
          romaji
          english
          native
        }
        type
        genres
      }
    }
  }
`