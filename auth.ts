import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { User } from "next-auth";
import bcrypt from 'bcryptjs';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Validate required environment variables
const githubClientId = process.env.GITHUB_ID || '';
const githubClientSecret = process.env.GITHUB_SECRET || '';
const googleClientId = process.env.GOOGLE_CLIENT_ID || '';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
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
const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    // GitHub Provider
    ...(githubClientId && githubClientSecret ? [
      GitHubProvider({
        clientId: githubClientId,
        clientSecret: githubClientSecret,
      })
    ] : []),
    
    // Google Provider
    ...(googleClientId && googleClientSecret ? [
      GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      })
    ] : []),
    
    // Email/Password Provider
    CredentialsProvider({
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
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  debug: nodeEnv === 'development',
};

// Export the auth options for the API route
export { authOptions };

// Create the auth handler
const handler = NextAuth(authOptions);

// Export the handler and its methods
export const { auth, signIn, signOut } = handler;

// Helper to get the session in server components
export const getServerAuthSession = () => {
  return auth();
};

// Export the handler for the API route
export default handler;
