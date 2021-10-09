import { CssBaseline, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '../components/AddButton'
import List from '../components/TodoList/List'
import { RootState } from '../redux/modules/rootReducer'
import {
  addList,
  addTodo,
  deleteList,
  getTodoList,
} from '../redux/modules/todoList'

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 'calc(100vh - 78px)',
    width: '100%',
    overflowY: 'auto',
  },
}))

const TodoListContainer = () => {
  const classes = useStyle()
  const data = useSelector((state: RootState) => state.todoList.todoList)
  const renderList = data?.listIds.map(listId => (
    <List key={listId} list={data.lists[listId]} />
  ))
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(deleteList())
    // dispatch(addList())
    // dispatch(addTodo())
    dispatch(getTodoList())
  }, [dispatch])

  return (
    <div className={classes.root}>
      <CssBaseline />
      {renderList}
      <AddButton type="list" />
    </div>
  )
}

export default TodoListContainer
