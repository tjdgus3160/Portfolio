import { CssBaseline, makeStyles } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import AddButton from '../components/TodoList/AddButton'
import List from '../components/TodoList/List'
import useTodoList from '../hooks/useTodoList'
import { getTodoList, reorder } from '../redux/modules/todoList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { ITodo } from '../interface/todolist'
import TodoListService from '../services/TodoListService'

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 'calc(100vh - 78px)',
    background: 'green',
    width: '100%',
    overflowY: 'auto',
  },
}))

const TodoListContainer = () => {
  const classes = useStyle()
  const todoList = useTodoList()
  const lists = useMemo(
    () =>
      todoList?.listIds.map(listId => (
        <List key={listId} list={todoList.lists[listId]} />
      )),
    [todoList]
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodoList())
  }, [dispatch])

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return
      dispatch(reorder(result))
    },
    [dispatch]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.root}>
        <CssBaseline />
        {lists}
        <AddButton type="list" />
      </div>
    </DragDropContext>
  )
}

export default TodoListContainer
