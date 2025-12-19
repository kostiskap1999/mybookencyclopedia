'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { fetchCharacters, addCharacter } from '@/lib/api/characters'
import { fetchBooks } from '@/lib/api/books'
import { Character, defaultCharacter } from '@/interfaces/character'
import { Book } from '@/interfaces/book'

export default function BookCharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [book, setBook] = useState<Book | null>(null)
  const [newCharacter, setNewCharacter] = useState<Character>(defaultCharacter)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const bookId = parseInt(params.bookId as string)

  useEffect(() => {
    async function loadData() {
      const [charactersData, booksData] = await Promise.all([
        fetchCharacters(bookId),
        fetchBooks()
      ])

      if (charactersData) setCharacters(charactersData)
      if (booksData) {
        const foundBook = booksData.find(b => b.id === bookId)
        setBook(foundBook || null)
        setNewCharacter(prev => ({ ...prev, bookId }))
      }
      setLoading(false)
    }
    loadData()
  }, [bookId])

  async function handleAddCharacter() {
    if (!newCharacter.name.trim()) return

    const character = await addCharacter(newCharacter)
    if (character) {
      setCharacters(prev => [character, ...prev])
      setNewCharacter({ ...defaultCharacter, bookId })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading characters...
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
                Characters
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
                className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium"
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
        </div>

        {/* Add Character Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add New Character
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newCharacter.name}
              onChange={e => setNewCharacter(prev => ({ ...prev, name: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Age (optional)"
              value={newCharacter.age || ''}
              onChange={e => setNewCharacter(prev => ({ ...prev, age: e.target.value ? parseInt(e.target.value) : null }))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddCharacter}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add Character
            </button>
          </div>
          <textarea
            placeholder="Bio (optional)"
            value={newCharacter.bio || ''}
            onChange={e => setNewCharacter(prev => ({ ...prev, bio: e.target.value }))}
            className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Characters List */}
        <div className="space-y-4">
          {characters.length === 0 ? (
            <div className="bg-white shadow-sm rounded-lg p-8 text-center">
              <p className="text-gray-500">
                No characters added yet.
              </p>
            </div>
          ) : (
            characters.map(character => (
              <div key={character.id} className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {character.name}
                    </h3>
                    {character.age && (
                      <p className="text-gray-600 mt-1">
                        Age: {character.age}
                      </p>
                    )}
                    {character.bio && (
                      <p className="text-gray-700 mt-3">
                        {character.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}