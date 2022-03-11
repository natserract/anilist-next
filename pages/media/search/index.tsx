import React from 'react'
import { useCallback, useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import { Media } from 'types/media';

import Card from '@/components/card'
import CardLists from '@/components/cardLists'
import { useDebounce } from "@/hooks/useDebounce";
import { MEDIALIST_QUERY } from "@/graphql/query/mediaList";
import { initializeApollo } from "@/apollo/initApollo";
import Seo from '@/components/seo'
import Content from '@/components/content';
import { stringToSlug } from "@/utils/string";


const apolloClient = initializeApollo();

const SearchMedia = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const searchValue = useDebounce(searchQuery)

  const fetchData = useCallback(() => {
    const onFetch = async () => {
      const response = await apolloClient.query({
        query: MEDIALIST_QUERY,
        variables: {
          search: searchValue
        }
      });

      const media = response.data.Page.media
      setData(media)
      setIsLoading(false)
    }

    onFetch()
  }, [searchValue])

  useEffect(fetchData, [fetchData])

  const handleChange = useCallback((event) => {
    setSearchQuery(event.target.value)
    setIsLoading(true)
  }, [])

  return (
    <div>
      <Seo
        contentType="content"
        metaDescription=""
        metaTitle="Search Media"
      />

      <Content>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="search">Search</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label='Search'
            value={searchQuery}
            onChange={handleChange}
          />
        </FormControl>

        <Grid style={{ marginTop: 30 }} container>
          <CardLists<Media>
            Empty={<React.Fragment />}
            isLoading={isLoading}
            items={data}
            render={(media: Media) => (
              <Card
                description={media.description}
                href={`/media/detail/${stringToSlug(media.title.romaji)}`}
                imgHeight={100}
                imgSrc={media.coverImage.medium}
                imgWidth={150}
                subHeader={media.title.native}
                title={media.title.romaji}
              />
            )}
          />
        </Grid>

      </Content>
    </div>
  )
}


export default SearchMedia