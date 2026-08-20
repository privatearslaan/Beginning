import { Suspense } from "react";
import { getAuthAvailability } from "@/actions/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const { dbAvailable } = await getAuthAvailability();

  return (
    <Suspense fallback={<div className="p-16 text-center">Loading...</div>}>
      <LoginForm dbAvailable={dbAvailable} />
    </Suspense>
  );
}
