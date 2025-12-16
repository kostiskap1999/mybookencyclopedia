'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchBooks, addBook } from '@/lib/api/books'
import { Book, defaultBook } from '@/interfaces/book'

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [newBook, setNewBook] = useState<Book>(defaultBook)
  const router = useRouter()
  
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

    const book = await addBook(newBook) 
    if (book) {
      setBooks(prev => [book, ...prev])
      setNewBook(defaultBook)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Books</h1>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Back to Home
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={e => setNewBook(prev => ({ ...prev, title: e.target.value }))}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author || ''}
            onChange={e => setNewBook(prev => ({ ...prev, author: e.target.value }))}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddBook}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Book
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {books.map(book => (
          <div key={book.id} className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{book.title}</h2>
            {book.author && <p className="text-gray-600 mt-1">by {book.author}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
