import { createStyles, Theme } from '@material-ui/core/styles'

const styles = (theme: Theme) =>
  createStyles({
    paperRoot: {
      width: "100%",

      [theme.breakpoints.down('xs')]: {
        paddingBottom: 30
      }
    },
    article: {
      fontSize: 16,
      paddingTop: 20,
    },
    asideContent: {
      paddingLeft: "35px !important",
      paddingRight: "35px !important",

      [theme.breakpoints.up('sm')]: {
        paddingTop: "30px !important"
      }
    },
    metaArticle: {
      marginTop: 20,

      "& .meta-article-item:not(:last-child)": {
        marginBottom: 15,
      }
    }
  })

export default styles