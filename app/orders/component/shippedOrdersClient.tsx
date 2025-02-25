"use client";

import { orderDelivered } from "@/actions/order.action";
import { editOrder } from "@/features/orderSlice";
import { OrderModel } from "@/models/orderModel";
import { OrderModelDatesString } from "@/models/orderModeldatesString.model";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Status } from "@prisma/client";
import toast from "react-hot-toast";
import OrdersAssemble from "@/utils/ordersAssemble";
import NoOrderDisplay from "@/utils/NoOrderDisplay";

type Props = {
  orders: OrderModel[];
};

export default function ShippedOrdersClient({ orders }: Props) {
  const [allOrders, setAllOrders] = useState<OrderModelDatesString[]>([]);
  const [order, setOrder] = useState<OrderModelDatesString>({} as OrderModelDatesString);
  const dispatch = useDispatch();

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
    setOrder(orderInput);
  }

  const deliveredOrderHandler = async (orderId: string) => {
    const updatedOrder = await orderDelivered(orderId);

    const mappedUpdatedOrder: OrderModelDatesString = {
      ...updatedOrder,
      deliveryDate: updatedOrder.deliveryDate?.toDateString(),
      orderDate: updatedOrder.orderDate.toDateString(),
      shippingDate: updatedOrder.shippingDate?.toDateString(),
    };

    setAllOrders((orders) =>
      orders?.map((order) => (order.id === orderId ? mappedUpdatedOrder : order))?.filter(ord => ord.status === Status.Shipped)
    );

    toast.success("Order has been delivered successfully!"); //----> Show toast for successful delivery.

    dispatch(editOrder({ order: mappedUpdatedOrder }));
  };

  if (!allOrders?.length) {
    return (
      <NoOrderDisplay/>
    );
  }

  return (
    <OrdersAssemble hasAction={true} orders={allOrders} orderSelected={orderSelectedHandler}>
      <>
        <button
          disabled={order.isDelivered || !order.isShipped}
          type="button"
          className="py-2 px-4 border-2 border-green-900 hover:bg-green-900 hover:text-green-100 text-green-900 font-bold text-base rounded-lg m-2"
          onClick={() => deliveredOrderHandler(order.id)}
        >
        Delivered
        </button>
      </>
    </OrdersAssemble>
  )
    
}
