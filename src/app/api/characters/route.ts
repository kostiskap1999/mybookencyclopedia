import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  const characters = await prisma.character.findMany()
  return Response.json(characters)
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const character = await prisma.character.create({
    data: {
      name: data.name,
      bio: data.bio ?? '',
      bookId: data.bookId,
    },
  })

  return Response.json(character)
}
