import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const bookId = searchParams.get('bookId')

  const notes = await prisma.note.findMany({
    where: bookId ? { bookId: parseInt(bookId) } : undefined,
  })
  return Response.json(notes)
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const note = await prisma.note.create({
    data: {
      content: data.content ?? '',
      bookId: data.bookId,
    },
  })

  return Response.json(note)
}
