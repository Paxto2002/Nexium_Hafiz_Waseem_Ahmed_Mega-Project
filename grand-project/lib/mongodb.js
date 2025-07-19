import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    console.log("🔗 Connecting to MongoDB (development)...");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.log("🔗 Connecting to MongoDB (production)...");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

clientPromise
  .then(() => console.log("✅ MongoDB connected successfully."))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default clientPromise;
