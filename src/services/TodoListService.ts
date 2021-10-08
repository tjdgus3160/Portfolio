import axios from 'axios'
import { ITodoList } from '../interface/todolist'
import SampleTodoList from '../utils/sample/todolist'

const API_KEY = '?key=tjdgus0'
const ROOT_URL = 'http://reduxblog.herokuapp.com/api'

interface Req {
  id: number
  title: string
  categories: string
  content: string
}

export default class TodoListService {
  public static async getTodoList(): Promise<ITodoList | null> {
    const response = await axios.get<Req[]>(`${ROOT_URL}/posts${API_KEY}`)
    if (response.data.length === 0) {
      return null
    }
    return JSON.parse(response.data[0].content)
  }
  public static async addList(): Promise<void> {
    const data = {
      title: 'todoList',
      categories: 'todoList',
      content: JSON.stringify(SampleTodoList),
    }
    await axios.post(`${ROOT_URL}/posts${API_KEY}`, data)
  }
}
