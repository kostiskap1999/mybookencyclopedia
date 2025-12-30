import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'

// get all notes of a book
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const bookId = searchParams.get('bookId')

  const notes = await prisma.note.findMany({
    where: bookId ? { bookId: parseInt(bookId) } : undefined,
  })
  return Response.json(notes)
}

// post a new note to a book
export async function POST(req: NextRequest) {
  const data: Prisma.NoteCreateInput = await req.json()
  
  const note = await prisma.note.create({ data })

  return Response.json(note)
}
