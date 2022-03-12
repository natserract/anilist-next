import { createStyles } from '@material-ui/core/styles'

const styles = () =>
  createStyles({
    root: {
      maxWidth: 345,
      height: 350
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    cardHeader: {
      "& .MuiCardHeader-subheader": {
        whiteSpace: "nowrap",
        maxWidth: "calc(219px - 50px)",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }
  })

export default styles