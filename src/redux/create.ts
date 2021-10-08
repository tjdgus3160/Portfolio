import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import { createBrowserHistory } from 'history'
import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const create = () => {
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware)
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}

export default create
