// components/Providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Client ဘက်မှာပဲ QueryClient ကို ဆောက်ဖို့ `useState` နဲ့ သိမ်းထားတာက Best Practice ပါ
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // Data ကို ၅ မိနစ်တိတိ Cache (မှတ်) ထားမယ်။ အရမ်းမြန်သွားစေဖို့ပါ။
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
