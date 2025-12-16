import { Book } from "@/interfaces/book"
import { handleError } from "@/lib/error/handleError"

export async function fetchBooks(): Promise<Book[] | null> {
  try {
    const res = await fetch('/api/books')
    if (!res.ok)
      throw new Error(JSON.stringify(res.status))
    return res.json()
  } catch (error: any) {
    handleError(error)
    return null
  }
}

export async function addBook(book: Omit<Book, 'id'>): Promise<Book | null> {
  try {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })
    if (!res.ok)
      throw new Error(JSON.stringify(res.status))
    return res.json()
  } catch (error: any) {
    handleError(error)
    return null
  }
}
