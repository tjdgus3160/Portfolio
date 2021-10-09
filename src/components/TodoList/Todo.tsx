import { InputBase, makeStyles, Paper } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import useInput from '../../hooks/useInput'
import { ITodo } from '../../interface/todolist'
import { deleteTodo, updateTodo } from '../../redux/modules/todoList'
import CloseIcon from '@material-ui/icons/Close'

const useStyle = makeStyles(theme => ({
  todo: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    position: 'relative',
  },
  input: {
    '&:focus': {
      background: '#ddd',
    },
  },
  icon: {
    position: 'absolute',
    right: '10px',
    cursor: 'pointer',
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

  const onBtnClick = useCallback(() => {
    dispatch(deleteTodo(todo.id, listId))
  }, [dispatch, todo, listId])

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
              <>
                {content}
                <CloseIcon
                  className={classes.icon}
                  fontSize="small"
                  onClick={onBtnClick}
                />
              </>
            )}
          </Paper>
        </div>
      )}
    </Draggable>
  )
}

export default Todo
