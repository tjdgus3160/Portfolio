import { all } from 'redux-saga/effects'
import { todoListSaga } from './todoList'

export default function* rootSaga() {
  yield all([todoListSaga()])
}
