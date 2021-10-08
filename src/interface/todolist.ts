export interface ICard {
  id: string
  content: string
}
export interface IList {
  id: string
  title: string
  cards: ICard[]
}
export interface ITodoList {
  lists: { [index: string]: IList }
  listIds: string[]
}
