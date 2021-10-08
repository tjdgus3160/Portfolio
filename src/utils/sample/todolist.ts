import { ICard, ITodoList } from '../../interface/todolist'

const cards: ICard[] = [
  {
    id: 'card-1',
    content: 'Learning how to cook',
  },
  {
    id: 'card-2',
    content: 'Making sandwich',
  },
  {
    id: 'card-3',
    content: 'Taking the trash out',
  },
]

const data: ITodoList = {
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'Todo',
      cards,
    },
    'list-2': {
      id: 'list-2',
      title: 'Doing',
      cards: [],
    },
  },
  listIds: ['list-1', 'list-2'],
}

// categories: "JS"
// content: "This is my post"
// id: 328961
// title: "New JS Post"

export default data
