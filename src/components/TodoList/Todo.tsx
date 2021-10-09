import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { ITodo } from '../../interface/todolist'

const useStyle = makeStyles(theme => ({
  todo: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
}))

interface Props {
  todo: ITodo
  index: number
}

const Todo = ({ todo, index }: Props) => {
  const classes = useStyle()
  return (
    <Draggable draggableId={todo.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.todo}>{todo.content}</Paper>
        </div>
      )}
    </Draggable>
  )
}

export default Todo
