import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";

export async function POST(req) {
  const { db } = await connectToMongo();
  const body = await req.json();

  const { userId, mood, aiMessage, quranVerse, hadith, dua } = body;

  const result = await db.collection("ai_responses").insertOne({
    userId,
    mood,
    aiMessage,
    quranVerse,
    hadith,
    dua,
    createdAt: new Date(),
  });

  return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
}

export async function GET() {
  const { db } = await connectToMongo();
  const data = await db.collection("ai_responses").find({}).toArray();

  return NextResponse.json({ data }, { status: 200 });
}
