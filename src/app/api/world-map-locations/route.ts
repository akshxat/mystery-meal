import { NextResponse } from 'next/server';
import { prisma } from "@/utils/prismaDB";

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      select: {
        city: true,
        lat: true,
        lng: true,
      },
    });

    return NextResponse.json(locations);
  } catch (error) {
    console.error('Prisma fetch error:', error);
    return NextResponse.json({ error: 'Failed to load locations' }, { status: 500 });
  }
}
