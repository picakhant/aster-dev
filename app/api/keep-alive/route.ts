// app/api/keep-alive/route.ts
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";

// Next.js က Cache မလုပ်ထားအောင် တားထားမှ Appwrite ဆီ တကယ် Request ရောက်မှာပါ
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { database } = createAdminClient();

    // Appwrite မအိပ်သွားအောင် Data တစ်ခုလောက် အလွယ် လှမ်းခေါ်ကြည့်မယ်
    const data = await database.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_COLLECTION_ID!,
      queries: [Query.limit(1), Query.select(["$id"])],
    });

    console.log("Fake data is", data);

    return NextResponse.json({
      status: "success",
      message: "Appwrite is awake!",
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to wake Appwrite" },
      { status: 500 },
    );
  }
}
