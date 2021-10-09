import {
  IListForm,
  IListUpdateForm,
  ITodoDeleteForm,
  ITodoForm,
  ITodoList,
  ITodoUpdateForm,
} from '../../interface/todolist'
import { createActions, handleActions } from 'redux-actions'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import TodoListService from '../../services/TodoListService'
import { AnyAction } from 'redux'
import { RootState } from './rootReducer'
import { DropResult } from 'react-beautiful-dnd'

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
export const {
  addTodo,
  addList,
  updateTodo,
  updateList,
  deleteTodo,
  reorder,
  getTodoList,
  deleteList,
} = createActions(
  {
    ADD_TODO: (content: string, listId: string) => ({
      content,
      listId,
    }),
    ADD_LIST: (title: string) => ({
      title,
    }),
    UPDATE_TODO: (content: string, todoId: string, listId: string) => ({
      content,
      todoId,
      listId,
    }),
    UPDATE_LIST: (title: string, listId: string) => ({
      title,
      listId,
    }),
    DELETE_TODO: (todoId: string, listId: string) => ({
      todoId,
      listId,
    }),
    REORDER: (result: DropResult) => ({
      result,
    }),
  },
  'GET_TODO_LIST',
  'DELETE_LIST',

  {
    prefix,
  }
)

export function* todoListSaga() {
  yield takeLatest(`${prefix}/ADD_TODO`, addTodoSaga)
  yield takeLatest(`${prefix}/ADD_LIST`, addListSaga)
  yield takeLatest(`${prefix}/UPDATE_TODO`, updateTodoSaga)
  yield takeLatest(`${prefix}/UPDATE_LIST`, updateListSaga)
  yield takeLatest(`${prefix}/DELETE_TODO`, deleteTodoSaga)
  yield takeLatest(`${prefix}/REORDER`, reorderSaga)
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

interface updateTodoSagaAction extends AnyAction {
  payload: ITodoUpdateForm
}

function* updateTodoSaga(action: updateTodoSagaAction) {
  try {
    yield put(pending())
    const todoList: ITodoList = yield select(
      (state: RootState) => state.todoList.todoList
    )
    yield call(TodoListService.updateTodo, action.payload, todoList)
    yield put(getTodoList())
  } catch (error) {
    yield put(
      fail(new Error((error as any)?.response?.data?.error || 'UNKNOWN_ERROR'))
    )
  }
}

interface updateListSagaAction extends AnyAction {
  payload: IListUpdateForm
}

function* updateListSaga(action: updateListSagaAction) {
  try {
    yield put(pending())
    const todoList: ITodoList = yield select(
      (state: RootState) => state.todoList.todoList
    )
    yield call(TodoListService.updateList, action.payload, todoList)
    yield put(getTodoList())
  } catch (error) {
    yield put(
      fail(new Error((error as any)?.response?.data?.error || 'UNKNOWN_ERROR'))
    )
  }
}

interface deleteTodoSagaAction extends AnyAction {
  payload: ITodoDeleteForm
}

function* deleteTodoSaga(action: deleteTodoSagaAction) {
  try {
    yield put(pending())
    const todoList: ITodoList = yield select(
      (state: RootState) => state.todoList.todoList
    )
    yield call(TodoListService.deleteTodo, action.payload, todoList)
    yield put(getTodoList())
  } catch (error) {
    yield put(
      fail(new Error((error as any)?.response?.data?.error || 'UNKNOWN_ERROR'))
    )
  }
}

interface reorderSagaAction extends AnyAction {
  payload: {
    result: DropResult
  }
}

function* reorderSaga(action: reorderSagaAction) {
  try {
    yield put(pending())
    const todoList: ITodoList = yield select(
      (state: RootState) => state.todoList.todoList
    )
    yield call(TodoListService.reorder, action.payload.result, todoList)
    yield put(getTodoList())
  } catch (error) {
    yield put(
      fail(new Error((error as any)?.response?.data?.error || 'UNKNOWN_ERROR'))
    )
  }
}
