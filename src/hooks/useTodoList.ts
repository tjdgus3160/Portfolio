import { useSelector } from 'react-redux'
import { ITodoList } from '../interface/todolist'
import { RootState } from '../redux/modules/rootReducer'

const useTodoList = () => {
  return useSelector((state: RootState) => state.todoList.todoList) as ITodoList
}

export default useTodoList
