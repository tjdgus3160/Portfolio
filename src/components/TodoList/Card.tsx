import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { ICard } from '../../interface/todolist'

const useStyle = makeStyles(theme => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
}))

interface Props {
  card: ICard
}

const Card = ({ card }: Props) => {
  const classes = useStyle()
  return <Paper className={classes.card}>{card.content}</Paper>
}

export default Card
