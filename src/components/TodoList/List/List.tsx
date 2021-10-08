import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Title from './Title'

const useStyle = makeStyles(theme => ({
  root: {
    minWidth: '300px',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(1),
  },
  cardContainer: {
    marginTop: theme.spacing(4),
  },
}))

const List = () => {
  const classes = useStyle()
  return (
    <div>
      <Paper className={classes.root}>
        <Title />
      </Paper>
    </div>
  )
}

export default List
