// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite"; // အရင်က ရေးခဲ့တဲ့ Server Client
import { Query } from "node-appwrite"; // node-appwrite ကိုပဲ ပြန်သုံးမယ်

export async function GET(request: Request) {
  try {
    // 1. URL ကနေ limit နဲ့ offset ကို လှမ်းယူမယ် (ဥပမာ - /api/projects?limit=6&offset=0)
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "6");
    const offset = parseInt(searchParams.get("offset") || "0");

    // 2. Server-side Appwrite Client ကို ခေါ်မယ်
    const { database } = createAdminClient();

    // 3. Appwrite Database ကနေ Data လှမ်းဆွဲမယ်
    const response = await database.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_COLLECTION_ID!,
      queries: [
        Query.orderDesc("rate"), // Rating အများဆုံးကို အပေါ်ထားမယ်
        Query.limit(limit), // တစ်ခါဆွဲရင် ဘယ်နှခုဆွဲမလဲ
        Query.offset(offset), // ဘယ်နှခု ကျော်ပြီးမှ စဆွဲမလဲ (Pagination အတွက် အရေးကြီးဆုံးပါ)
      ],
    });

    // 4. ရလာတဲ့ Data ကို Frontend (Browser) ဆီ JSON အနေနဲ့ ပြန်ပို့ပေးမယ်
    return NextResponse.json({
      projects: response.rows,
      total: response.total, // နောက်ထပ် Data ကျန်သေးလား စစ်ဖို့ Total အရေအတွက်ပါ ပို့ပေးလိုက်မယ်
    });
  } catch (error) {
    console.error("Projects API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects data from server" },
      { status: 500 },
    );
  }
}
