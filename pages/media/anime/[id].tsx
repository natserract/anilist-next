import { NextPage } from 'next';
import { Media } from 'types/media';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import styles from './styles'

import { initializeApollo } from '@/apollo/initApollo';
import { MEDIALIST_QUERY } from '@/graphql/query/mediaList';
import Seo from '@/components/seo'
import Content from '@/components/content';
import Image from '@/components/image'
import { parseDate } from '@/utils/date';

const apolloClient = initializeApollo();

type MediaDetailProps = {
  data: {
    media: Media
  },
}

const useStyles = makeStyles(styles)

const MediaDetail: NextPage<MediaDetailProps, unknown> = ({ data }) => {
  const classes = useStyles()

  const startDate = new Date(
    data.media.startDate.year,
    data.media.startDate.month,
    +data.media.startDate.day
  );

  const charactes = data.media.characters.nodes
  const lastCharacters = charactes[charactes.length - 1]

  return (
    <>
      <Seo
        contentType="content"
        images={[
          {
            url: data.media.coverImage.large
          }
        ]}
        metaDescription="Anilist Anime"
        metaTitle={data.media.title.romaji}
      />

      <Content>
        <Paper classes={{
          root: classes.paperRoot
        }}>
          <Grid spacing={2} container>
            <Grid md={6} xs={12} item>
              <Image
                height={444}
                imgSrc={data.media.coverImage.extraLarge}
                layout="responsive"
                objectFit="cover"
                width={444}
              />
            </Grid>
            <Grid className={classes.asideContent} md={6} xs={12} item>
              <Typography component="h1" variant='h2'>
                {data.media.title.romaji}
              </Typography>

              <article
                className={classes.article}
                dangerouslySetInnerHTML={{
                  __html: data.media.description
                }}
              />

              <div className={classes.metaArticle}>
                <div className='meta-article-item'>
                  <Typography component="h3" variant='h5'>
                    Character
                  </Typography>

                  <Typography component="p" variant="body2">
                    {charactes.length ? charactes.map((char) => (
                      <span key={char.id}>
                        <i>{char.name.full}</i>
                        {lastCharacters.id !== char.id && ', '}
                      </span>
                    )) : (
                      <span>-</span>
                    )}
                  </Typography>
                </div>

                <div className='meta-article-item'>
                  <Typography component="h3" variant='h5'>
                    Status
                  </Typography>

                  <Typography component="p" variant="body2">
                    {data.media.status}
                  </Typography>
                </div>

                <div className='meta-article-item'>
                  <Typography component="h3" variant='h5'>
                    Start Date
                  </Typography>

                  <Typography component="p" variant="body2">
                    {parseDate(startDate)}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>

      </Content>
    </>
  )
};

export async function getStaticPaths() {
  const responses = await apolloClient.query({
    query: MEDIALIST_QUERY,
  });

  const limitPage = 50
  const medias =
    Array.from<Media>(responses.data.Page.media)
      .filter((_, i) => i > 0 && i <= limitPage)

  return {
    paths: medias.map(media => ({
      params: {
        id: String(media.id)
      }
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { data } = await apolloClient.query({
    query: MEDIALIST_QUERY,
    variables: {
      id: +params.id
    }
  })

  return {
    props: {
      data: {
        media: data.Page.media[0] || {}
      },
    },
    revalidate: 1
  }
}

export default MediaDetail;
