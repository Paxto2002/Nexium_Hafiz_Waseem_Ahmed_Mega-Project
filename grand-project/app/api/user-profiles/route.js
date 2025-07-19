import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const COLLECTION_NAME = "user_profiles";

// GET: Fetch all user profiles
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // explicitly pass DB name
    const profiles = await db.collection(COLLECTION_NAME).find().toArray();

    return NextResponse.json({ success: true, data: profiles });
  } catch (error) {
    console.error("❌ GET /user-profiles error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}

// POST: Create a new user profile
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, default_mood = "Neutral", preferred_tags = [] } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    const newUserProfile = {
      name: name || null,
      email,
      default_mood,
      preferred_tags,
      last_log_time: null,
      created_at: new Date(),
    };

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db
      .collection(COLLECTION_NAME)
      .insertOne(newUserProfile);

    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId,
        ...newUserProfile,
      },
    });
  } catch (error) {
    console.error("❌ POST /user-profiles error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create user profile" },
      { status: 500 }
    );
  }
}
