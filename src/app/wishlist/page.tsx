import type { Metadata } from "next";
import { WishlistPageContent } from "./WishlistPageContent";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return <WishlistPageContent />;
}
