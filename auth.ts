import NextAuth, { type DefaultSession, type DefaultUser } from 'next-auth';
import { authOptions } from '@/lib/auth-config';

// Extend the session type to include the user ID
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // Add any other custom properties you need in the session
    } & DefaultSession['user'];
  }
  
  interface User extends DefaultUser {
    id: string;
  }
}

// Initialize NextAuth
const handler = NextAuth(authOptions);

// Export the auth functions
export const auth = handler.auth;
export const signIn = handler.signIn;
export const signOut = handler.signOut;

// Export the handlers for the API route
export const handlers = {
  GET: handler.handlers?.GET || (() => new Response(null, { status: 405 })),
  POST: handler.handlers?.POST || (() => new Response(null, { status: 405 })),
};

// Helper to get the session in server components
export async function getServerAuthSession() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error('Error getting auth session:', error);
    return null;
  }
}
