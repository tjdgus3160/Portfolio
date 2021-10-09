import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import DeleteIcon from '@material-ui/icons/DeleteOutline'

const useStyle = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: '50px',
    right: '50px',
    width: '100px',
    height: '100px',
    textAlign: 'center',
    lineHeight: '110px',
  },
  icon: {
    color: '#888',
    transform: 'scale(5)',
  },
}))

const DeleteBox = () => {
  const classes = useStyle()
  return (
    <Droppable droppableId="delete" type="list">
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={classes.root}
        >
          <DeleteIcon className={classes.icon} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default DeleteBox
