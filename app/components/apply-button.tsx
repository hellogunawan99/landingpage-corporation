"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ApplyButtonProps {
  jobId: string;
}

export default function ApplyButton({ jobId }: ApplyButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleApply = async () => {
    if (!session) {
      router.push(`/auth/login?callbackUrl=/portal/jobs/${jobId}`);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to apply");
      }

      setMessage({ type: "success", text: "Application submitted successfully!" });
      router.refresh();
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleApply}
        disabled={loading}
        className="w-full md:w-auto bg-primary hover:bg-primary/90"
        size="lg"
      >
        {loading ? "Applying..." : "Apply Now"}
      </Button>
      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
