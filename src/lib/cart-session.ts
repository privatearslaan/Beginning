import { cookies } from "next/headers";

const CART_SESSION_COOKIE = "cart_session_id";

export async function getCartSessionIdIfExists() {
  const cookieStore = await cookies();
  return cookieStore.get(CART_SESSION_COOKIE)?.value;
}

export async function readCartSessionId() {
  return getCartSessionIdIfExists();
}
