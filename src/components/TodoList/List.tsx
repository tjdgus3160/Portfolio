import { Paper } from '@material-ui/core'
import React, { useMemo } from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Title from './Title'
import { IList } from '../../interface/todolist'
import Todo from './Todo'
import AddButton from './AddButton'
import { Draggable, Droppable } from 'react-beautiful-dnd'

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
  index: number
}

const List = ({ list, index }: Props) => {
  const classes = useStyle()

  const todos = useMemo(
    () =>
      list?.todos.map((todo, index) => (
        <Todo key={todo.id} todo={todo} index={index} listId={list.id} />
      )),
    [list]
  )

  if (!list) {
    return <div>Loading...</div>
  }
  return (
    <Draggable draggableId={list.id} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <Title listId={list.id} />
            <Droppable droppableId={list.id}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.todoContainer}
                >
                  {todos}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <AddButton listId={list.id} type="todo" />
          </Paper>
        </div>
      )}
    </Draggable>
  )
}

export default List
