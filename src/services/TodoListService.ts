import {
  IList,
  IListForm,
  IListUpdateForm,
  ITodo,
  ITodoForm,
  ITodoList,
} from '../interface/todolist'
import { v4 as uuid } from 'uuid'

const LOCALSTORAGE_KEY = 'todolist'
export default class TodoListService {
  public static getTodoList(): ITodoList | null {
    const data = localStorage.getItem(LOCALSTORAGE_KEY)
    return data ? JSON.parse(data) : null
  }

  public static setTodoList(data: ITodoList): void {
    localStorage.removeItem(LOCALSTORAGE_KEY)
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data))
  }

  public static addTodo({ content, listId }: ITodoForm, todoList: ITodoList) {
    const newTodo: ITodo = {
      id: uuid(),
      content,
    }
    const list = todoList.lists[listId]
    list.todos = [...list.todos, newTodo]
    const newState: ITodoList = {
      ...todoList,
      lists: {
        ...todoList.lists,
        [listId]: list,
      },
    }
    TodoListService.setTodoList(newState)
  }

  public static addList({ title }: IListForm, todoList: ITodoList) {
    const newList: IList = {
      id: uuid(),
      title,
      todos: [],
    }
    const newState: ITodoList = {
      listIds: [...todoList.listIds, newList.id],
      lists: {
        ...todoList.lists,
        [newList.id]: newList,
      },
    }
    TodoListService.setTodoList(newState)
  }

  public static updateList(
    { title, listId }: IListUpdateForm,
    todoList: ITodoList
  ) {
    const list = todoList.lists[listId]
    list.title = title
    const newState: ITodoList = {
      ...todoList,
      lists: {
        ...todoList.lists,
        [listId]: list,
      },
    }
    TodoListService.setTodoList(newState)
  }
  public static deleteList() {
    const newState = {}
    // const data = makeReq(newState)
    // TodoListService.postTodoList(data)
  }
}
