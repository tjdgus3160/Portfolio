import { InputBase, makeStyles, Paper } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import useInput from '../../hooks/useInput'
import { ITodo } from '../../interface/todolist'
import { updateTodo } from '../../redux/modules/todoList'

const useStyle = makeStyles(theme => ({
  todo: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
  input: {
    '&:focus': {
      background: '#ddd',
    },
  },
}))

interface Props {
  todo: ITodo
  index: number
  listId: string
}

const Todo = ({ todo, index, listId }: Props) => {
  const classes = useStyle()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [content, onChangeContent] = useInput(todo.content)

  const onInputBlur = useCallback(() => {
    dispatch(updateTodo(content, todo.id, listId))
    setOpen(false)
  }, [dispatch, content, todo, listId])

  return (
    <Draggable draggableId={todo.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.todo} onClick={() => setOpen(true)}>
            {open ? (
              <InputBase
                value={content}
                onChange={onChangeContent}
                inputProps={{
                  className: classes.input,
                }}
                autoFocus
                fullWidth
                onBlur={onInputBlur}
              />
            ) : (
              <>{content}</>
            )}
          </Paper>
        </div>
      )}
    </Draggable>
  )
}

export default Todo
