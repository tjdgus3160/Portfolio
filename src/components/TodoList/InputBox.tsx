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
import { addTodo } from '../../redux/modules/todoList'

const useStyle = makeStyles(theme => ({
  wrapper: {
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
}

const InputBox = ({ setOpen, listId }: Props) => {
  const classes = useStyle()
  const [content, onChangeContent, setContent] = useInput('')

  const dispatch = useDispatch()

  const onBtnClick = useCallback(() => {
    dispatch(addTodo(content, listId))
    setContent('')
    setOpen(false)
  }, [dispatch, content, listId, setContent, setOpen])

  return (
    <>
      <Paper className={classes.wrapper}>
        <InputBase
          onChange={onChangeContent}
          multiline
          fullWidth
          inputProps={{ className: classes.input }}
          placeholder="Enter a title of this card..."
          onBlur={() => setOpen(false)}
          value={content}
        />
      </Paper>
      <div className={classes.btnWrapper}>
        <Button className={classes.btn} onClick={onBtnClick}>
          Add Card
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </>
  )
}

export default InputBox
