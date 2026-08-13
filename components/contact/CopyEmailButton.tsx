"use client";

import { toast } from "react-hot-toast";
import { Copy } from "lucide-react";
import { site } from "@/site.config";

export function CopyEmailButton() {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      toast("Email copied to clipboard!");
    } catch {
      toast.error("Could not copy email");
    }
  };

  return (
    <button
      onClick={copy}
      className="btn btn-outline btn-wide rounded-lg font-mono"
    >
      <Copy className="h-4 w-4" />
      Copy email
    </button>
  );
}