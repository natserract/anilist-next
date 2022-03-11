import React from 'react'
import HeaderLayout from '../header'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import styles from './styles'

const useStyles = makeStyles(styles)

const ContainerLayout: React.FC = (props) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <HeaderLayout />
      <Container maxWidth="md" className={classes.layout}>
        {props.children}
      </Container>
    </React.Fragment>
  )
}

export default ContainerLayout