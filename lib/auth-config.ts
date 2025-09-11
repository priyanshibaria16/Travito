import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
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

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
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
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", required: false }
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error('Email is required');
        }

        // Check if user exists
        let user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // If user doesn't exist and this is a sign up
        if (!user) {
          if (!credentials.password) {
            throw new Error('Password is required for new users');
          }
          
          // Create new user
          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name || credentials.email.split('@')[0],
              hashedPassword,
              emailVerified: new Date()
            }
          });
        } else if (credentials.password) {
          // Verify password for existing user
          if (!user.hashedPassword) {
            throw new Error('Invalid authentication method');
          }
          
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error('Invalid credentials');
          }
        } else {
          throw new Error('Password is required');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        };
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
    async session({ session, token, user }) {
      // Add user ID to the session
      if (session.user) {
        session.user.id = token.sub || user?.id || '';
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user ID to the token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  events: {
    async createUser({ user }) {
      // This ensures the user is created with all required fields
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  debug: nodeEnv === 'development',
};
