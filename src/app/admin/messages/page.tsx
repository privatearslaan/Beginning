import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminMessagesList } from "./AdminMessagesList";

export const metadata: Metadata = {
  title: "Contact Messages",
};

export default async function AdminMessagesPage() {
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-900">Messages</h1>
      <AdminMessagesList messages={messages} />
    </div>
  );
}
