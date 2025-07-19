import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

export async function POST(req) {
  const supabase = createClient();
  const body = await req.json();

  const { user_id, mood, notes } = body;

  const { data, error } = await supabase.from("mood_logs").insert([
    {
      user_id,
      mood,
      notes,
    },
  ]);

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data }, { status: 201 });
}

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from("mood_logs").select("*");
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data }, { status: 200 });
}
