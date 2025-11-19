'use client'

import { useState, useEffect } from 'react'
import { fetchBooks, addBook } from '@/lib/api/books'
import { Book, defaultBook } from '@/interfaces/book'

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [newBook, setNewBook] = useState<Book>(defaultBook)
  
  useEffect(() => {
    async function loadBooks() {
      const data = await fetchBooks()
      if (data)
        setBooks(data)
    }
    loadBooks().catch(err => console.error(err))
  }, [])

  
  async function handleAddBook() {
    if (!newBook.title.trim())
      return

    const book = await addBook(newBook.title, newBook.author) 
    if (book) {
      setBooks(prev => [book, ...prev])
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={e => setNewBook(prev => ({ ...prev, title: e.target.value }))}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author || ''}
          onChange={e => setNewBook(prev => ({ ...prev, author: e.target.value }))}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddBook}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Book
        </button>
      </div>

      <ul>
        {books.map(book => (
          <li key={book.id} className="mb-2 border-b pb-2">
            <strong>{book.title}</strong> {book.author ? `by ${book.author}` : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}
