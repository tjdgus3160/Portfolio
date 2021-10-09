import { IListForm, ITodoForm, ITodoList } from '../../interface/todolist'
import { createActions, handleActions } from 'redux-actions'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import TodoListService from '../../services/TodoListService'
import { AnyAction } from 'redux'
import { RootState } from './rootReducer'

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
export const { addTodo, addList, getTodoList, deleteList } = createActions(
  {
    ADD_TODO: (content: string, listId: string) => ({
      content,
      listId,
    }),
    ADD_LIST: (content: string) => ({
      content,
    }),
  },
  'GET_TODO_LIST',
  'DELETE_LIST',

  {
    prefix,
  }
)

export function* todoListSaga() {
  yield takeLatest(`${prefix}/GET_TODO_LIST`, getTodoListSaga)
  yield takeLatest(`${prefix}/ADD_LIST`, addListSaga)
  yield takeLatest(`${prefix}/DELETE_LIST`, deleteListSaga)
  yield takeLatest(`${prefix}/ADD_TODO`, addTodoSaga)
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

function* deleteListSaga() {
  try {
    yield put(pending())
    // yield call(TodoListService.)
    yield put(getTodoList())
  } catch (error) {
    yield put(
      fail(new Error((error as any)?.response?.data?.error || 'UNKNOWN_ERROR'))
    )
  }
}

interface addTodoSagaAction extends AnyAction {
  payload: ITodoForm
}

function* addTodoSaga(action: addTodoSagaAction) {
  try {
    yield put(pending())
    const todoList: ITodoList = yield select(
      (state: RootState) => state.todoList.todoList
    )
    yield call(TodoListService.addTodo, action.payload, todoList)
    const newTodoList: ITodoList = yield call(TodoListService.getTodoList)
    yield put(success(newTodoList))
  } catch (error) {
    yield put(
      fail(new Error((error as any)?.response?.data?.error || 'UNKNOWN_ERROR'))
    )
  }
}

interface addListSagaAction extends AnyAction {
  payload: IListForm
}

function* addListSaga(action: addListSagaAction) {
  try {
    yield put(pending())
    const todoList: ITodoList = yield select(
      (state: RootState) => state.todoList.todoList
    )
    yield call(TodoListService.addList, action.payload, todoList)
    yield put(getTodoList())
  } catch (error) {
    yield put(
      fail(new Error((error as any)?.response?.data?.error || 'UNKNOWN_ERROR'))
    )
  }
}
