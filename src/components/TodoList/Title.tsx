import { InputBase, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import clsx from 'clsx'

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
  title: string
}

const Title = ({ title }: Props) => {
  const classes = useStyle()
  const [open, setOpen] = useState(false)
  return (
    <div className={classes.root}>
      {open ? (
        <InputBase
          value={title}
          inputProps={{
            className: clsx(classes.input, classes.title),
          }}
          autoFocus
          fullWidth
          onBlur={() => setOpen(false)}
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
