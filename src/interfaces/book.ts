export interface Book {
  id: number
  title: string
  author?: string | null
}

export const defaultBook: Book = {
  id: 0,
  title: '',
  author: ''
}