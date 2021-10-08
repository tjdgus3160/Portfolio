import { Collapse, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Title from './Title'
import Card from './Card'
import InputCard from './InputCard'
import { IList } from '../../interface/todolist'

const useStyle = makeStyles(theme => ({
  root: {
    width: '300px',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(1),
  },
  cardContainer: {
    marginTop: theme.spacing(4),
  },
  addCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(2, 1, 1, 1),
    backgroundColor: '#EBECF0',
    '&:hover': {
      backgroundColor: alpha('#000', 0.25),
    },
  },
}))

interface Props {
  list: IList
}

const List = ({ list }: Props) => {
  const classes = useStyle()
  const [open, setOpen] = useState(false)

  const renderCard = list.cards.map(card => <Card key={card.id} card={card} />)

  return (
    <div>
      <Paper className={classes.root}>
        <Title title={list.title} />
        {renderCard}
        <Collapse in={!open}>
          <Paper
            className={classes.addCard}
            elevation={0}
            onClick={() => setOpen(true)}
          >
            <Typography>+ Add a Card</Typography>
          </Paper>
        </Collapse>
        <Collapse in={open}>
          <InputCard setOpen={setOpen} />
        </Collapse>
      </Paper>
    </div>
  )
}

export default List
