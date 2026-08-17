"use client";

import { useTransition } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { markContactRead } from "@/actions/admin";
import { toast } from "sonner";

interface AdminMessagesProps {
  messages: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    read: boolean;
    createdAt: Date;
  }>;
}

export function AdminMessagesList({ messages }: AdminMessagesProps) {
  const [pending, startTransition] = useTransition();

  if (messages.length === 0) {
    return <p className="text-stone-500">No messages yet.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="rounded-xl border border-emerald-100 bg-white p-6"
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-medium text-stone-900">{msg.name}</p>
              <p className="text-sm text-stone-500">{msg.email}</p>
            </div>
            {!msg.read && <Badge variant="secondary">New</Badge>}
          </div>
          <p className="mb-2 text-sm text-stone-500">
            {format(new Date(msg.createdAt), "MMM d, yyyy h:mm a")}
          </p>
          <p className="mb-3 text-stone-700">{msg.message}</p>
          {!msg.read && (
            <Button
              variant="outline"
              size="sm"
              disabled={pending}
              onClick={() => {
                startTransition(async () => {
                  await markContactRead(msg.id);
                  toast.success("Marked as read");
                });
              }}
            >
              Mark as Read
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
