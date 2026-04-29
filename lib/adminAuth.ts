import crypto from 'crypto';
import { cookies } from 'next/headers';

function computeToken(user: string, pass: string): string {
  return crypto
    .createHash('sha256')
    .update(`${user}:${pass}:gigamix-admin-2025`)
    .digest('hex');
}

export function getExpectedToken(): string {
  const user = process.env.ADMIN_USER || 'admin';
  const pass = process.env.ADMIN_PASS || 'giga123';
  return computeToken(user, pass);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session) return false;
  return session.value === getExpectedToken();
}
