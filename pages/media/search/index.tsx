import { useRouter } from "next/router";

import { initializeApollo, addApolloState } from "@/apollo/initApollo";
import { MEDIALIST_QUERY } from "@/graphql/query/mediaList";

const apolloClient = initializeApollo();

const SearchMedia = ({ data }) => {
  const router = useRouter()

  return (
    <div>
      Search Media

      {JSON.stringify(data)}
    </div>
  )
}

export async function getStaticProps() {
  const mediaLists = await apolloClient.query({
    query: MEDIALIST_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {
      data: mediaLists.data.Page.media,
      loading: mediaLists.loading,
    },
    revalidate: 1,
  });
}

export default SearchMedia