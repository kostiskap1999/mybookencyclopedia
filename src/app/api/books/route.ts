import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'
import { Prisma } from '@prisma/client'

// get all books
export async function GET() {
  const books = await prisma.book.findMany({})
  return Response.json(books)
}


// post a new book
export async function POST(req: NextRequest) {
  const data: Prisma.BookCreateInput = await req.json()

  const newBook = await prisma.book.create({ data })

  return Response.json(newBook)
}
