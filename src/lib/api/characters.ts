import { Character } from "@/interfaces/character"
import { handleError } from "@/lib/error/handleError"

export async function fetchCharacters(bookId?: number): Promise<Character[] | null> {
  try {
    const url = bookId ? `/api/characters?bookId=${bookId}` : '/api/characters'
    const res = await fetch(url)
    if (!res.ok)
      throw new Error(JSON.stringify(res.status))
    return res.json()
  } catch (error: any) {
    handleError(error)
    return null
  }
}

export async function addCharacter(character: Omit<Character, 'id'>): Promise<Character | null> {
  try {
    const res = await fetch('/api/characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(character),
    })
    if (!res.ok)
      throw new Error(JSON.stringify(res.status))
    return res.json()
  } catch (error: any) {
    handleError(error)
    return null
  }
}