import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import TodoList from './pages/TodoList'
import { history } from './redux/create'
import { ConnectedRouter } from 'connected-react-router'

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/todolist" component={TodoList} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
  )
}

export default App
