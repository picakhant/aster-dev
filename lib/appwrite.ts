// lib/appwrite.ts
import { Client, TablesDB, Storage } from "node-appwrite";

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return {
    get database() {
      return new TablesDB(client); // မင်းပြောတဲ့ အသစ်ဆုံး Version အတိုင်းပါ
    },
    get storage() {
      return new Storage(client);
    },
  };
}
