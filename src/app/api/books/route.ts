import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  const books = await prisma.book.findMany({})
  return Response.json(books)
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const newBook = await prisma.book.create({
    data: {
      title: data.title,
      author: data.author ?? null,
    },
  })

  return Response.json(newBook)
}
