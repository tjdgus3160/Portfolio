import {
  alpha,
  Collapse,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import InputBox from './InputBox'

const useStyle = makeStyles(theme => ({
  root: {
    width: '300px',
    marginTop: theme.spacing(1),
  },
  addTodo: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    backgroundColor: '#EBECF0',
    '&:hover': {
      backgroundColor: alpha('#000', 0.25),
    },
  },
}))

interface Props {
  listId?: string
  type: string
}

const AddButton = ({ listId, type }: Props) => {
  const classes = useStyle()
  const [open, setOpen] = useState(false)
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <InputBox setOpen={setOpen} listId={listId || ''} type={type} />
      </Collapse>
      <Collapse in={!open}>
        <Paper
          className={classes.addTodo}
          elevation={0}
          onClick={() => setOpen(prev => !prev)}
        >
          <Typography>
            + Add {type === 'list' ? 'another List' : 'a Todo'}
          </Typography>
        </Paper>
      </Collapse>
    </div>
  )
}

export default AddButton
