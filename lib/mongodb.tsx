import { MongoClient, MongoClientOptions } from "mongodb";

// Ensure the MongoDB URI is explicitly typed
const uri: string = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const options: MongoClientOptions = {};  // Explicit typing for options

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Use globalThis to avoid TypeScript errors with global variables
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  // Use global variable in development to prevent multiple connections
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  // In production, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
