import { Theme, createStyles } from '@material-ui/core/styles'

const styles = (_theme: Theme) =>
  createStyles({
    layout: {
      position: 'relative',
      boxSizing: 'border-box',
      minHeight: 'calc(-60px + 100vh)',
      paddingTop: 30,
      paddingBottom: 30,
    },
    alert: {
      marginBottom: 30,
    },
  })

export default styles