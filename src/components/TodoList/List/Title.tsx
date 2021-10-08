import { InputBase, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

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

const Title = () => {
  const classes = useStyle()
  const [open, setOpen] = useState(false)
  return (
    <div className={classes.root}>
      {open ? (
        <InputBase
          value="Todo"
          inputProps={{
            className: classes.input,
          }}
          autoFocus
          fullWidth
          onBlur={() => setOpen(false)}
        />
      ) : (
        <>
          <Typography className={classes.title} onClick={() => setOpen(true)}>
            Todo
          </Typography>
          <MoreHorizIcon />
        </>
      )}
    </div>
  )
}

export default Title
