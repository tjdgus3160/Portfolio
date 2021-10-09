export interface ITodo {
  id: string
  content: string
}
export interface IList {
  id: string
  title: string
  todos: ITodo[]
}
export interface ITodoList {
  lists: { [index: string]: IList }
  listIds: string[]
}

export interface IListForm {
  title: string
}
export interface IListUpdateForm extends IListForm {
  listId: string
}
export interface ITodoForm {
  listId: string
  content: string
}

export interface ITodoUpdateForm extends ITodoForm {
  todoId: string
}
