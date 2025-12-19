'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { fetchNotes, addNote } from '@/lib/api/notes'
import { fetchBooks } from '@/lib/api/books'
import { Note, defaultNote } from '@/interfaces/note'
import { Book } from '@/interfaces/book'

export default function BookNotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [book, setBook] = useState<Book | null>(null)
  const [newNote, setNewNote] = useState<Note>(defaultNote)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const bookId = parseInt(params.bookId as string)

  useEffect(() => {
    async function loadData() {
      const [notesData, booksData] = await Promise.all([
        fetchNotes(bookId),
        fetchBooks()
      ])

      if (notesData) setNotes(notesData)
      if (booksData) {
        const foundBook = booksData.find(b => b.id === bookId)
        setBook(foundBook || null)
        setNewNote(prev => ({ ...prev, bookId }))
      }
      setLoading(false)
    }
    loadData()
  }, [bookId])

  async function handleAddNote() {
    if (!newNote.title.trim()) return

    const note = await addNote(newNote)
    if (note) {
      setNotes(prev => [note, ...prev])
      setNewNote({ ...defaultNote, bookId })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading notes...
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
              onClick={() => router.push(`/books/${bookId}`)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              ← Back to Book
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Notes
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                from "{book.title}"
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm rounded-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <Link
                href={`/books/${bookId}`}
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium"
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
                className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium"
              >
                Notes
              </Link>
            </nav>
          </div>
        </div>

        {/* Add Note Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add New Note
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Note Title"
              value={newNote.title}
              onChange={e => setNewNote(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              placeholder="Note Content"
              value={newNote.content || ''}
              onChange={e => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
            <button
              onClick={handleAddNote}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add Note
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="bg-white shadow-sm rounded-lg p-8 text-center">
              <p className="text-gray-500">
                No notes added yet.
              </p>
            </div>
          ) : (
            notes.map(note => (
              <div key={note.id} className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {note.title}
                </h3>
                {note.content && (
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {note.content}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}