import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    githubId: process.env.GITHUB_ID ? 'Set' : 'Not Set',
    githubSecret: process.env.GITHUB_SECRET ? 'Set' : 'Not Set',
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set',
    databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not Set'
  });
}
