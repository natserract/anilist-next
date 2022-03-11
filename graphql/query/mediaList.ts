import gql from "graphql-tag";

import { MEDIA_FRAGMENT } from "@/graphql/fragment/mediaFragment"

export const MEDIALIST_QUERY = gql`
  query MediaListQuery ($page: Int, $perPage: Int, $search: String){
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }

      media(search: $search, type: ANIME, sort: FORMAT_DESC) {
       ...MediaFragment
      }
    }
  }
  ${MEDIA_FRAGMENT}
`