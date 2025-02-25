"use client";

import { OrderModel } from "@/models/orderModel";
import { OrderModelDatesString } from "@/models/orderModeldatesString.model";
import { useEffect, useState } from "react";
import OrdersAssemble from "@/utils/ordersAssemble";
import NoOrderDisplay from "@/utils/NoOrderDisplay";

type Props = {
  orders: OrderModel[];
};

export default function AllOrdersClient({ orders }: Props) {
  const [allOrders, setAllOrders] = useState<OrderModelDatesString[]>([]);

  useEffect(() => {
    const mappedOrders: OrderModelDatesString[] = orders?.map((order) => ({
      ...order,
      orderDate: order.orderDate.toDateString(),
      deliveryDate: order.deliveryDate?.toDateString(),
      shippingDate: order.shippingDate?.toDateString(),
    }));
    setAllOrders([...mappedOrders]);
  }, [orders]);

   const orderSelectedHandler = (orderInput: OrderModelDatesString) => {
    //console.log({orderInput})
  }

  if (!allOrders?.length) {
    return (
      <NoOrderDisplay/>
    );
  }

  return (
    <OrdersAssemble hasAction={false} orders={allOrders} orderSelected={orderSelectedHandler}>
    </OrdersAssemble>
  );
}
