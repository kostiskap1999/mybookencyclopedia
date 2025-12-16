import { Note } from "@/interfaces/note"
import { handleError } from "@/lib/error/handleError"

export async function fetchNotes(bookId?: number): Promise<Note[] | null> {
  try {
    const url = bookId ? `/api/notes?bookId=${bookId}` : '/api/notes'
    const res = await fetch(url)
    if (!res.ok)
      throw new Error(JSON.stringify(res.status))
    return res.json()
  } catch (error: any) {
    handleError(error)
    return null
  }
}

export async function addNote(note: Omit<Note, 'id'>): Promise<Note | null> {
  try {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    })
    if (!res.ok)
      throw new Error(JSON.stringify(res.status))
    return res.json()
  } catch (error: any) {
    handleError(error)
    return null
  }
}