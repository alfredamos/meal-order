"use client";

import {
  deleteOrderById,
  orderShipped,
} from "@/actions/order.action";
import { deleteOrder, editOrder } from "@/features/orderSlice";
import { OrderModel } from "@/models/orderModel";
import { OrderModelDatesString } from "@/models/orderModeldatesString.model";
import NoOrderDisplay from "@/utils/NoOrderDisplay";
import { Status } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import OrdersAssemble from "@/utils/ordersAssemble";

type Props = {
  orders: OrderModel[];
};

export default function PendingOrdersClient({ orders }: Props) {
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

  const shippedOrderHandler = async (orderId: string) => {
    const updatedOrder = await orderShipped(orderId);

    const mappedUpdatedOrder: OrderModelDatesString = {
      ...updatedOrder,
      deliveryDate: updatedOrder.deliveryDate?.toDateString(),
      orderDate: updatedOrder.orderDate.toDateString(),
      shippingDate: updatedOrder.shippingDate?.toDateString(),
    };

    setAllOrders((orders) =>
      orders
        .map((order) => (order.id === orderId ? mappedUpdatedOrder : order))
        ?.filter((ord) => ord.status === Status.Pending)
    );

    toast.success("Order is shipped successfully!"); //----> Show toast for orders shipped successfully.

    dispatch(editOrder({ order: mappedUpdatedOrder }));
  };

  const deleteOrderHandler = async (orderId: string) => {
    const deletedOrder = await deleteOrderById(orderId);

    const mappedDeletedOrder: OrderModelDatesString = {
      ...deletedOrder,
      deliveryDate: deletedOrder.deliveryDate?.toDateString(),
      orderDate: deletedOrder.orderDate.toDateString(),
      shippingDate: deletedOrder.shippingDate?.toDateString(),
    };

    setAllOrders((orders) => orders.filter((order) => order.id !== orderId));

    dispatch(deleteOrder({ order: mappedDeletedOrder }));
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
          disabled={order.isShipped}
          type="button"
          className="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 text-indigo-900 font-bold text-base rounded-lg m-2"
          onClick={() => shippedOrderHandler(order.id)}
          >
          Shipped
          </button>
          <button
            disabled={order.isShipped || order.isDelivered}
            type="button"
            className="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-rose-100 text-rose-900 font-bold text-base rounded-lg m-2"
            onClick={() => deleteOrderHandler(order.id)}
          >
          Delete
          </button>
      </>
    </OrdersAssemble>
    
  );
}
