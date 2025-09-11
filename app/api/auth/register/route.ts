import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as RegisterRequest;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        emailVerified: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
      },
    });

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'An error occurred during registration' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
