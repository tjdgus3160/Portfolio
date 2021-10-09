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
  content: string
}
export interface ITodoForm extends IListForm {
  listId: string
}
