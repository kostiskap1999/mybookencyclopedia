import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'
import { Prisma } from '@prisma/client'

// get all items of a book
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const bookId = searchParams.get('bookId')

  const items = await prisma.item.findMany({
    where: bookId ? { bookId: parseInt(bookId) } : undefined,
  })
  return Response.json(items)
}

// post a new item to a book
export async function POST(req: NextRequest) {
  const data: Prisma.ItemCreateInput = await req.json()

  const item = await prisma.item.create({ data })

  return Response.json(item)
}
