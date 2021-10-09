import {
  IList,
  IListForm,
  IListUpdateForm,
  ITodo,
  ITodoForm,
  ITodoList,
} from '../interface/todolist'
import { v4 as uuid } from 'uuid'
import { DropResult } from 'react-beautiful-dnd'

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
    if (!todoList) {
      const newState: ITodoList = {
        listIds: [newList.id],
        lists: {
          [newList.id]: newList,
        },
      }
      TodoListService.setTodoList(newState)
      return
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
  public static reorder(
    { destination, source, draggableId, type }: DropResult,
    todoList: ITodoList
  ) {
    if (type === 'list') {
      const newListIds = todoList.listIds
      newListIds.splice(source.index, 1)
      newListIds.splice(destination!.index, 0, draggableId)
      const newState: ITodoList = {
        ...todoList,
        listIds: newListIds,
      }
      TodoListService.setTodoList(newState)
    } else {
      const sourceList = todoList.lists[source.droppableId]
      const destinationList = todoList.lists[destination!.droppableId]
      const draggingTodo = sourceList.todos.find(
        todo => todo.id === draggableId
      ) as ITodo
      sourceList.todos.splice(source.index, 1)
      destinationList.todos.splice(destination!.index, 0, draggingTodo)
      const newState = {
        ...todoList,
        lists: {
          ...todoList.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      }
      TodoListService.setTodoList(newState)
    }
  }
}
