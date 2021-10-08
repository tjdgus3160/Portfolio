import { CssBaseline } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '../components/TodoList/List'
import { RootState } from '../redux/modules/rootReducer'
import { getTodoList } from '../redux/modules/todoList'

const TodoListContainer = () => {
  const data = useSelector((state: RootState) => state.todoList.todoList)
  const renderList = data?.listIds.map(listId => (
    <List key={listId} list={data.lists[listId]} />
  ))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodoList())
  }, [dispatch])

  return (
    <div>
      <CssBaseline />
      {renderList}
    </div>
  )
}

export default TodoListContainer
