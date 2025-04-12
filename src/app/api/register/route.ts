import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";

export async function POST(request: any) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing Fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists!" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        isAdmin: false,
        isPremium: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        isPremium: true,
      },
    });

    return NextResponse.json(
      { 
        message: "User created successfully!",
        user: newUser
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
      return NextResponse.json(
        { 
          message: "Registration failed",
          error: error.message
        },
        { status: 500 }
      );
    } else {
      console.error("Unknown registration error occurred");
      return NextResponse.json(
        { 
          message: "Registration failed",
          error: "An unknown error occurred"
        },
        { status: 500 }
      );
    }
  }
}
