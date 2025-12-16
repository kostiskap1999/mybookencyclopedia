export interface Character {
  id: number
  name: string
  age?: number | null
  bio?: string | null
  bookId: number
}

export const defaultCharacter: Character = {
  id: 0,
  name: '',
  age: null,
  bio: '',
  bookId: 0
}