import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, makeStyles, useTheme } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import { useRouter } from 'next/router'
import GitHubIcon from '@material-ui/icons/GitHub';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from './styles'

const useStyles = makeStyles(styles)

const forceFlex = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center"
}

const SearchComponent = () => {
  const classes = useStyles()
  const router = useRouter()

  const [isSearchOpen, setSearchOpen] = useState(true)
  const isSearchPage = router.pathname.includes('search')

  if (isSearchPage) return <React.Fragment />

  return (
    <div
      className={classNames(classes.search, {
        [classes.searchFocused]: isSearchOpen,
      })}
      onClick={() => router.push('/media/search')}
    >
      <div
        className={classNames(classes.searchIcon, {
          [classes.searchIconOpened]: isSearchOpen,
        })}
        onClick={() => setSearchOpen(!isSearchOpen)}
      >
        <SearchIcon classes={{ root: classes.headerIcon }} />
      </div>
      <InputBase
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        placeholder="Search…"
        readOnly
      />
    </div>
  )
}

const HeaderLayout: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()

  const theme = useTheme()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const matchXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <AppBar position="static">
      <Toolbar classes={{
        root: classes.toolbar
      }}>
        <Container maxWidth="md">
          <Grid alignItems="center" justifyContent="space-between" container>
            <Grid md={4} xs={6} item>
              <button
                className={classes.title}
                onClick={() => router.push('/media/list/page/1')}
              >
                <Typography component="h1" variant="h3">
                  Anilist
                </Typography>
              </button>
            </Grid>


            <Grid md={7} style={{ ...forceFlex }} xs={6} item>
              <Grid md={7} xs={12} item>
                <SearchComponent />
              </Grid>

              <Grid md={1} xs={2} item>
                <IconButton color='inherit' component='a' href='https://github.com/natserract/anilist-next' target="_blank">
                  <GitHubIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderLayout