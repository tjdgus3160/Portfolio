import { connectRouter, RouterState } from 'connected-react-router'
import { AnyAction, combineReducers } from 'redux'
import { History } from 'history'

import todoList, { TodoListState } from './todoList'
import { Reducer } from 'react'

export interface RootState {
  todoList: TodoListState
  router: Reducer<RouterState<unknown>, AnyAction>
}

const rootReducer = (history: History<unknown>) =>
  combineReducers({
    todoList,
    router: connectRouter(history),
  })

export default rootReducer
