import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import TodoList from './pages/TodoList'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/todolist" component={TodoList} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
