import { CssBaseline } from '@material-ui/core'
import React from 'react'
import List from '../components/TodoList/List/List'

const TodoListContainer = () => {
  return (
    <div>
      <CssBaseline />
      <List />
    </div>
  )
}

export default TodoListContainer
