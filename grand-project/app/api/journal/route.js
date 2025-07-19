import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { entryText, mood, tags, faithOptIn, createdAt } = body;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("journal_entries");

    const newEntry = {
      entryText,
      mood,
      tags: tags || [],
      faithOptIn: faithOptIn !== undefined ? faithOptIn : true,
      createdAt: createdAt || new Date(),
    };

    const result = await collection.insertOne(newEntry);

    return new Response(
      JSON.stringify({ success: true, entryId: result.insertedId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to save journal entry:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
