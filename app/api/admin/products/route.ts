import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';

const unauthorized = () => NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

export async function GET() {
  if (!await isAuthenticated()) return unauthorized();
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  if (!await isAuthenticated()) return unauthorized();
  try {
    const data = await req.json();
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || null,
        emoji: data.emoji || '📦',
        image: data.image || null,
        categoryId: data.categoryId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!await isAuthenticated()) return unauthorized();
  try {
    const data = await req.json();
    const { id, ...rest } = data;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: rest.name,
        description: rest.description || null,
        emoji: rest.emoji || '📦',
        image: rest.image || null,
        categoryId: rest.categoryId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!await isAuthenticated()) return unauthorized();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
