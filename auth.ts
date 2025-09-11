import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AuthOptions } from "next-auth";
import bcrypt from 'bcryptjs';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Validate required environment variables
const githubClientId = process.env.GITHUB_ID;
const githubClientSecret = process.env.GITHUB_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const authSecret = process.env.NEXTAUTH_SECRET || 'dev-secret-change-in-production';
const nodeEnv = process.env.NODE_ENV || 'development';

// Log environment status on server startup
if (typeof window === 'undefined') { // Server-side only
  console.log('\n=== Environment Status ===');
  console.log('NODE_ENV:', nodeEnv);
  console.log('GITHUB_ID:', githubClientId ? 'Set' : 'Not Set');
  console.log('GITHUB_SECRET:', githubClientSecret ? 'Set' : 'Not Set');
  console.log('GOOGLE_CLIENT_ID:', googleClientId ? 'Set' : 'Not Set');
  console.log('GOOGLE_CLIENT_SECRET:', googleClientSecret ? 'Set' : 'Not Set');
  console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not Set');
  console.log('=========================\n');
}

// Only throw error in production if required env vars are missing
if (nodeEnv === 'production') {
  const requiredVars = [];
  if (!githubClientId && !googleClientId) requiredVars.push('GITHUB_ID or GOOGLE_CLIENT_ID');
  if (!githubClientSecret && !googleClientSecret) requiredVars.push('GITHUB_SECRET or GOOGLE_CLIENT_SECRET');
  if (!authSecret) requiredVars.push('NEXTAUTH_SECRET');
  
  if (requiredVars.length > 0) {
    throw new Error(`Missing required environment variables: ${requiredVars.join(', ')}`);
  }
} else {
  // In development, log warnings but don't crash
  if (!githubClientId && !googleClientId) console.warn('Warning: No auth providers configured. Set GITHUB_ID or GOOGLE_CLIENT_ID');
  if ((githubClientId && !githubClientSecret) || (googleClientId && !googleClientSecret)) {
    console.warn('Warning: Missing client secret for one or more providers');
  }
  if (!process.env.NEXTAUTH_SECRET) console.warn('Warning: NEXTAUTH_SECRET is not set');
}

// Configuration for NextAuth
const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure authentication providers
  providers: [
    // GitHub Provider
    ...(githubClientId && githubClientSecret ? [
      GitHub({
        clientId: githubClientId,
        clientSecret: githubClientSecret,
      })
    ] : []),
    
    // Google Provider
    ...(googleClientId && googleClientSecret ? [
      Google({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      })
    ] : []),
    
    // Email/Password Provider
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  secret: authSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/register',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }): Promise<Session> {
      if (session.user && token.sub) {
        (session.user as User & { id: string }).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  debug: nodeEnv === 'development',
};

// Export the auth options for the API route
export { authOptions };

// Create the auth handler
const handler = NextAuth(authOptions);

// Export the auth function for server components
export const auth = handler.auth;

// Export signIn and signOut functions
export const signIn = handler.signIn;
export const signOut = handler.signOut;

// Helper to get the session in server components
export const getServerAuthSession = async () => {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error('Error getting server auth session:', error);
    return null;
  }
};

// Export the handler for the API route
export default handler;
