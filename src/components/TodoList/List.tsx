import { Collapse, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Title from './Title'
import InputBox from './InputBox'
import { IList } from '../../interface/todolist'
import Todo from './Todo'

const useStyle = makeStyles(theme => ({
  root: {
    width: '300px',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(1),
  },
  todoContainer: {
    marginTop: theme.spacing(4),
  },
  addTodo: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(2, 1, 1, 1),
    backgroundColor: '#EBECF0',
    '&:hover': {
      backgroundColor: alpha('#000', 0.25),
    },
  },
}))

interface Props {
  list: IList | null
}

const List = ({ list }: Props) => {
  const classes = useStyle()
  const [open, setOpen] = useState(false)
  if (!list) {
    return <div>Loading...</div>
  }
  const renderCard = list.todos.map(todo => <Todo key={todo.id} todo={todo} />)

  return (
    <div>
      <Paper className={classes.root}>
        <Title title={list.title} />
        {renderCard}
        <Collapse in={!open}>
          <Paper
            className={classes.addTodo}
            elevation={0}
            onClick={() => setOpen(true)}
          >
            <Typography>+ Add a Todo</Typography>
          </Paper>
        </Collapse>
        <Collapse in={open}>
          <InputBox setOpen={setOpen} listId={list.id} />
        </Collapse>
      </Paper>
    </div>
  )
}

export default List
