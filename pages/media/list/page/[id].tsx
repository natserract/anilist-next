import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { useState } from 'react';
import { MediaData, Media } from 'types/media';
import { makeStyles } from '@material-ui/core';

import styles from './styles'

import { MEDIALIST_QUERY } from '@/graphql/query/mediaList';
import { initializeApollo, addApolloState } from '@/apollo/initApollo';
import Seo from '@/components/seo'
import Content from '@/components/content';
import Card from '@/components/card'
import CardLists from '@/components/cardLists'

const paginationConfig = { perPage: 12, maxLastPage: 50 };
const ogImgUrl = "https://app.gitbook.com/share/space/thumbnail/-LHizcWWtVphqU90YAXO.png?color=%233DB4F2&logo=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fgitbook-28427.appspot.com%2Fo%2Fspaces%252F-LHizcWWtVphqU90YAXO%252Favatar.png%3Fgeneration%3D1531944291782256%26alt%3Dmedia&theme="

const apolloClient = initializeApollo();

const useStyles = makeStyles(styles);

type Data = {
  data: MediaData
}

function Medias({ data }: Data) {
  const classes = useStyles()
  const router = useRouter();

  const [page, setPage] = useState(data.currentPage);

  const handleChange = (event, value) => {
    setPage(value);
    router.replace(`/media/list/page/${value}`)
  }

  return (
    <>
      <Seo
        contentType="content"
        images={[
          {
            url: ogImgUrl
          }
        ]}
        metaDescription=""
        metaTitle="Getting Started"
        site_url="https://anilist-next.vercel.app/"
        isRoot
      />

      <Content>
        <CardLists<Media>
          items={data.media}
          render={(media: Media) => (
            <Card
              description={media.description}
              href={`/media/anime/${media.id}`}
              imgHeight={100}
              imgSrc={media.coverImage.large}
              imgWidth={150}
              subHeader={media.title.native}
              title={media.title.romaji}
            />
          )}
        />

        <Grid className={classes.paginationContainer} justifyContent='center' container>
          <Pagination
            color='primary'
            count={paginationConfig.maxLastPage}
            page={page}
            onChange={handleChange}
          />
        </Grid>
      </Content>
    </>
  );
}

export async function getStaticPaths() {
  const responses = await apolloClient.query({
    query: MEDIALIST_QUERY,
    variables: {
      perPage: paginationConfig.perPage,
    },
  });

  // We set manual, because has issue prerendered
  // Code error 429 (too many requests)
  const limitPage = 50
  const lastPage = responses.data.Page.pageInfo.lastPage;
  const pageIdxs =
    Array(lastPage)
      .fill(0)
      .map((_, i) => i)
      .filter((v) => v > 0 && v <= limitPage);

  return {
    paths: pageIdxs.map((id) => ({
      params: {
        id: String(id),
      },
    })),
    // fallback is set to false because 
    // we already know the slugs ahead of time
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const mediaLists = await apolloClient.query({
    query: MEDIALIST_QUERY,
    variables: {
      page: +params.id,
      perPage: paginationConfig.perPage,
    },
  });

  return addApolloState(apolloClient, {
    props: {
      data: {
        media: mediaLists.data.Page.media,
        total: mediaLists.data.Page.pageInfo.total,
        currentPage: mediaLists.data.Page.pageInfo.currentPage,
        lastPage: mediaLists.data.Page.pageInfo.lastPage,
        hasNextPage: mediaLists.data.Page.pageInfo.hasNextPage
      },
    },
    revalidate: 1,
  });
}

export default Medias;
