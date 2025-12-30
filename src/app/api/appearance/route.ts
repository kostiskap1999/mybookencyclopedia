import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'
import { Prisma } from '@prisma/client'

// get all appearances of a character
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const characterId = searchParams.get('characterId')

  const appearances = await prisma.appearance.findMany({
    where: characterId ? { characterId: parseInt(characterId) } : undefined,
  })
  return Response.json(appearances)
}

// post a new appearance to a character
export async function POST(req: NextRequest) {
  const data: Prisma.AppearanceCreateInput = await req.json()

  const appearance = await prisma.appearance.create({ data })
  return Response.json(appearance)
}
