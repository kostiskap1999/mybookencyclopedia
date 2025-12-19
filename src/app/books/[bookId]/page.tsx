'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { fetchBooks } from '@/lib/api/books'
import { Book } from '@/interfaces/book'

export default function BookDetailPage() {
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const bookId = params.bookId as string

  useEffect(() => {
    async function loadBook() {
      const books = await fetchBooks()
      if (books) {
        const foundBook = books.find(b => b.id === parseInt(bookId))
        setBook(foundBook || null)
      }
      setLoading(false)
    }
    loadBook()
  }, [bookId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading book...
          </p>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Book Not Found
          </h1>
          <button
            onClick={() => router.push('/books')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Books
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/books')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              ← Back to Books
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {book.title}
              </h1>
              {book.author && <p className="text-lg text-gray-600 mt-1">
                by {book.author}
              </p>}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm rounded-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <Link
                href={`/books/${bookId}`}
                className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium"
              >
                Overview
              </Link>
              <Link
                href={`/books/${bookId}/characters`}
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium"
              >
                Characters
              </Link>
              <Link
                href={`/books/${bookId}/notes`}
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium"
              >
                Notes
              </Link>
            </nav>
          </div>

          {/* Book Overview Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Book Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Title:</span>
                    <span className="ml-2 text-gray-900">{book.title}</span>
                  </div>
                  {book.author && (
                    <div>
                      <span className="font-medium text-gray-700">Author:</span>
                      <span className="ml-2 text-gray-900">{book.author}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">ID:</span>
                    <span className="ml-2 text-gray-900">{book.id}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Link
                    href={`/books/${bookId}/characters`}
                    className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center transition-colors"
                  >
                    View Characters
                  </Link>
                  <Link
                    href={`/books/${bookId}/notes`}
                    className="block w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-center transition-colors"
                  >
                    View Notes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}