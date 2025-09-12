import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth-config';

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
  // In Next.js 13+ app directory, we can use the auth() function directly
  // which is provided by NextAuth.js for server components
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error('Error getting auth session:', error);
    return null;
  }
}
