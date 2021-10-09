import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { ITodo } from '../../interface/todolist'

const useStyle = makeStyles(theme => ({
  todo: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
}))

interface Props {
  todo: ITodo
}

const Todo = ({ todo }: Props) => {
  const classes = useStyle()
  return <Paper className={classes.todo}>{todo.content}</Paper>
}

export default Todo
