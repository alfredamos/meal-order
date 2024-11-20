"use client"

import { useCart } from "@/features/cartItemSlice"
import CartDetail from "../component/cartDetail"
import { useLocalStorage } from "@/hooks/useLocalStorage";

function AddToCartPage() {
   const { storedCartItems } = useLocalStorage();
  const cartItems = useCart()?.cartItems ?? storedCartItems ;

  return (
    <CartDetail carts={cartItems}/>
  )
}
export default AddToCartPage