import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getExpectedToken, isAuthenticated } from '@/lib/adminAuth';

export async function POST(req: Request) {
  const { user, pass } = await req.json();
  const expectedUser = process.env.ADMIN_USER || 'admin';
  const expectedPass = process.env.ADMIN_PASS || 'giga123';

  if (user !== expectedUser || pass !== expectedPass) {
    return NextResponse.json({ error: 'Usuário ou senha incorretos' }, { status: 401 });
  }

  const token = getExpectedToken();
  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({ authenticated: authed });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ ok: true });
}
