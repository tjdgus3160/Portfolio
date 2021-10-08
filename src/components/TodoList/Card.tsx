import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles(theme => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
}))

const Card = () => {
  const classes = useStyle()
  return <Paper className={classes.card}>todo 1</Paper>
}

export default Card
