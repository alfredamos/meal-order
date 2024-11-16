"use client";

import { ReactNode, useState } from "react";
import AddCartItem from "./addCartItem";
import {useSelector} from "react-redux"

export default function ListOfPizzas({ children }: { children: ReactNode }) {
  const [isAddCart, SetIsAddCart] = useState(false);
  //const carts = useSelector(carts => )

  return !isAddCart ? { children } : <AddCartItem />;
}
