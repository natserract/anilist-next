import gql from "graphql-tag";

export const MEDIA_FRAGMENT = gql`
  fragment MediaFragment on Media {
      id
      title {
        romaji
        english
        native
      }
      description
      status
      startDate {
        year
        month
        day
      }
      endDate {
        day
        month
        year
      }
      coverImage {
        color
        extraLarge
        large
        medium
      }
      type
      genres
  }
`