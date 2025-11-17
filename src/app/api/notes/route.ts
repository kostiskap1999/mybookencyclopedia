import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  const notes = await prisma.note.findMany()
  return Response.json(notes)
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const note = await prisma.note.create({
    data: {
      title: data.title,
      content: data.content ?? '',
      bookId: data.bookId,
    },
  })

  return Response.json(note)
}
