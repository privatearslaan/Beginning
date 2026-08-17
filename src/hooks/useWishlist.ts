"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getWishlistIds,
  isInWishlist,
  toggleWishlist,
  WISHLIST_CHANGE_EVENT,
} from "@/lib/wishlist";

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getWishlistIds());

    function sync() {
      setIds(getWishlistIds());
    }

    window.addEventListener(WISHLIST_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WISHLIST_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((productId: string) => {
    toggleWishlist(productId);
    setIds(getWishlistIds());
  }, []);

  const has = useCallback(
    (productId: string) => ids.includes(productId),
    [ids],
  );

  return {
    ids,
    count: ids.length,
    toggle,
    has,
    isInWishlist,
  };
}
