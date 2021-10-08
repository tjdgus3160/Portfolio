import {
  alpha,
  Button,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
} from '@material-ui/core'
import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { setStateTypes } from '../../types'

const useStyle = makeStyles(theme => ({
  card: {
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
}

const InputCard = ({ setOpen }: Props) => {
  const classes = useStyle()
  return (
    <>
      <Paper className={classes.card}>
        <InputBase
          multiline
          fullWidth
          inputProps={{ className: classes.input }}
          placeholder="Enter a title of this card..."
          onBlur={() => setOpen(false)}
        />
      </Paper>
      <div className={classes.btnWrapper}>
        <Button className={classes.btn} onClick={() => setOpen(false)}>
          Add Card
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </>
  )
}

export default InputCard
