import { CartItem } from "@prisma/client";
import { useEffect, useState } from "react";

export function useLocalStorage(){
  const [storedCartItems, setStoredCartItems] = useState<CartItem[]>([])
  useEffect(() => {
    setStoredCartItems(JSON.parse(localStorage.getItem("carts")!))
  }, [])

  return {storedCartItems}
}