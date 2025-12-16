export interface Note {
  id: number
  title: string
  content?: string | null
  bookId: number
}

export const defaultNote: Note = {
  id: 0,
  title: '',
  content: '',
  bookId: 0
}