import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha } from '@material-ui/core/styles/colorManipulator'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      [theme.breakpoints.down('xs')]: {
        height: 55,
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      color: '#fff',
      padding: 0,
      background: 'transparent',
      border: 0,
      cursor: 'pointer',

      '& h1': {
        fontSize: 24,
      },
    },
    headerIcon: {
      fontSize: 28,
      color: 'rgba(255, 255, 255, 0.35)',
      marginRight: 5,
    },
    headerIconCollapse: {
      color: 'white',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
      cursor: "pointer",
    },
    inputInput: {
      cursor: "pointer",
      height: 36,
      padding: 0,
      paddingRight: 36 + theme.spacing(1.25),
      width: '100%',

      [theme.breakpoints.down('xs')]: {
        height: 34,
      }
    },
    search: {
      cursor: "pointer",
      position: 'relative',
      borderRadius: 25,
      paddingLeft: theme.spacing(2.5),
      width: 36,
      backgroundColor: alpha(theme.palette.common.white, 0),
      transition: theme.transitions.create(['background-color', 'width']),
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: alpha(theme.palette.common.white, 0.06),
      },
    },
    searchFocused: {
      backgroundColor: alpha(theme.palette.common.white, 0.06),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 300,
      },
    },
    searchIcon: {
      width: 36,
      right: 0,
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: theme.transitions.create('right'),
      '&:hover': {
        cursor: 'pointer',
      },
    },
    searchIconOpened: {
      right: theme.spacing(1.25),
    },
  })

export default styles