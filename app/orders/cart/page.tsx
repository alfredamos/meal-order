"use client"

import { useCart } from "@/features/cartItemSlice"
import CartDetail from "../component/cartDetail"

function AddToCartPage() {
  const cartItems = useCart()?.cartItems;

  return (
    <CartDetail carts={cartItems}/>
  )
}
export default AddToCartPage