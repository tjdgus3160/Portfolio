import { ITodoList } from '../../interface/todolist'
import { createActions, handleActions } from 'redux-actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import TodoListService from '../../services/TodoListService'

export interface TodoListState {
  loading: boolean
  todoList: ITodoList | null
  error: Error | null
}

const initialState: TodoListState = {
  loading: false,
  todoList: null,
  error: null,
}

const prefix = 'portfolio/todoList'

export const { pending, success, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'FAIL',
  { prefix }
)

const reducer = handleActions<TodoListState, ITodoList>(
  {
    PENDING: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      loading: false,
      todoList: action.payload,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
)

export default reducer

// saga
export const { getTodoList, addTodoList } = createActions(
  'GET_TODO_LIST',
  'ADD_TODO_LIST',
  {
    prefix,
  }
)

export function* todoListSaga() {
  yield takeLatest(`${prefix}/GET_TODO_LIST`, getTodoListSaga)
}

function* getTodoListSaga() {
  try {
    yield put(pending())
    const todoList: ITodoList = yield call(TodoListService.getTodoList)
    yield put(success(todoList))
  } catch (error) {
    yield put(
      fail(new Error((error as any)?.response?.data?.error || 'UNKNOWN_ERROR'))
    )
  }
}
