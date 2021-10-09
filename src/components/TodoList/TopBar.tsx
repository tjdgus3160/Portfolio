import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import { setStateTypes } from '../../types'

const useStyles = makeStyles(theme => ({
  AppBar: {
    background: 'none',
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    color: '#fff',
    backgroundColor: '#000',
  },
}))

interface Props {
  setOpen: setStateTypes<boolean>
}

const TopBar = ({ setOpen }: Props) => {
  const classes = useStyles()
  return (
    <AppBar position="static" className={classes.AppBar} elevation={0}>
      <Toolbar>
        <h1 className={classes.title}>Daily Todo</h1>
        <Button className={classes.btn} onClick={() => setOpen(true)}>
          Change Background
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
