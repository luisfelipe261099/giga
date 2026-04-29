import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  const categories = await prisma.category.findMany({
    orderBy: { title: 'asc' }
  });
  return NextResponse.json(categories);
}
