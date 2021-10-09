import { InputBase, makeStyles, Typography } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import clsx from 'clsx'
import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux'
import { updateList } from '../../redux/modules/todoList'
import useTodoList from '../../hooks/useTodoList'

const useStyle = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  input: {
    margin: theme.spacing(1),
    '&:focus': {
      background: '#ddd',
    },
  },
}))

interface Props {
  listId: string
}

const Title = ({ listId }: Props) => {
  const classes = useStyle()
  const todoList = useTodoList()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [title, onChangetitle] = useInput(todoList.lists[listId].title)

  const onInputBlur = useCallback(() => {
    dispatch(updateList(title, listId))
    setOpen(false)
  }, [dispatch, title, listId])

  return (
    <div className={classes.root}>
      {open ? (
        <InputBase
          value={title}
          onChange={onChangetitle}
          inputProps={{
            className: clsx(classes.input, classes.title),
          }}
          autoFocus
          fullWidth
          onBlur={onInputBlur}
        />
      ) : (
        <>
          <Typography className={classes.title} onClick={() => setOpen(true)}>
            {title}
          </Typography>
          <MoreHorizIcon />
        </>
      )}
    </div>
  )
}

export default Title
