import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { getServerSession } from 'next-auth/next';

// Initialize NextAuth with the configuration
const handler = NextAuth(authOptions);

// Export the auth functions
export const { auth } = handler;
export const signIn = handler.signIn;
export const signOut = handler.signOut;

// Export the handlers for the API route
export const { GET, POST } = handler;

// Extend the session type to include the user ID
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Helper to get the session in server components
export async function getServerAuthSession() {
  try {
    // In Next.js 13+ app directory, we use getServerSession with the auth options
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error('Error getting auth session:', error);
    return null;
  }
}
