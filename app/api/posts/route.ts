import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Fetch all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Create a post
export async function POST(req: Request) {
  try {
    const { title, slug, content } = await req.json();
    const newPost = await prisma.post.create({
      data: { title, slug, content },
    });
    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Delete a post
export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    await prisma.post.delete({ where: { id } });
    return new Response("Post deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Update a post
export async function PUT(req: Request) {
  const { id, title, content } = await req.json();
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
