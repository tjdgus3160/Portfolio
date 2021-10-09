import {
  alpha,
  Button,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
} from '@material-ui/core'
import React, { useCallback } from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { setStateTypes } from '../../types'
import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux'
import { addList, addTodo } from '../../redux/modules/todoList'

const useStyle = makeStyles(theme => ({
  root: {
    width: '280px',
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnWrapper: {
    margin: theme.spacing(0, 1, 1, 1),
  },
  btn: {
    backgroundColor: '#5aac44',
    color: '#fff',
    '&:hover': {
      backgroundColor: alpha('#5aac44', 0.75),
    },
  },
}))

interface Props {
  setOpen: setStateTypes<boolean>
  listId: string
  type: string
}

const InputBox = ({ setOpen, listId, type }: Props) => {
  const classes = useStyle()
  const dispatch = useDispatch()

  const [content, onChangeContent, setContent] = useInput('')

  const onBtnClick = useCallback(() => {
    if (type === 'todo') {
      dispatch(addTodo(content, listId))
    } else {
      dispatch(addList(content))
    }
    setContent('')
    setOpen(false)
  }, [dispatch, content, listId, setContent, setOpen, type])

  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          onChange={onChangeContent}
          multiline
          fullWidth
          inputProps={{ className: classes.input }}
          placeholder={
            type === 'list'
              ? 'Enter a title of this card...'
              : 'Enter list title...'
          }
          onBlur={() => setOpen(false)}
          value={content}
        />
      </Paper>
      <div className={classes.btnWrapper}>
        <Button className={classes.btn} onClick={onBtnClick}>
          Add {type === 'list' ? 'List' : 'Todo'}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </>
  )
}

export default InputBox
