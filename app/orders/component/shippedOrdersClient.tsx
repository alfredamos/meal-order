"use client";

import { orderDelivered } from "@/actions/order.action";
import { editOrder } from "@/features/orderSlice";
import { OrderModel } from "@/models/orderModel";
import { OrderModelDatesString } from "@/models/orderModeldatesString.model";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Status } from "@prisma/client";
import toast from "react-hot-toast";

type Props = {
  orders: OrderModel[];
};

export default function ShippedOrdersClient({ orders }: Props) {
  const [allOrders, setAllOrders] = useState<OrderModelDatesString[]>([]);
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
      <div className="flex flex-col justify-between items-end mx-auto my-auto bg-white text-black max-w-lg px-12 py-40 rounded-lg shadow-lg mt-24">
        <h1 className="text-3xl">There are no orders to display!</h1>
        <p className="mt-32 text-indigo-900 flex justify-end">
          <Link href="/pizzas">Go Home</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4 p-3">
      <table className="table table-zebra border-1 border-gray-200 p-3">
        <thead className="text-gray-200 text-xl bg-gray-500">
          <tr className="">
            <th>Order No.</th>
            <th>Items</th>
            <th>Price</th>
            <th>Quantities</th>
            <th>Date Order</th>
            <th>Status</th>
            <th>Order By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allOrders?.map((order) => (
            <tr className="text-base text-black" key={order.id}>
              <td>{order.id}</td>
              <td>
                {order?.cartItems?.map((item) => (
                  <ul key={item.id}>
                    <li>
                      <p>{item.name}</p>
                    </li>
                  </ul>
                ))}
              </td>

              <td>{order.totalPrice}</td>
              <td>{order.totalQuantity}</td>
              <td>{order.orderDate}</td>
              <td>{order.status}</td>
              <td>{order.user?.name}</td>
              <td>
                <button
                  disabled={order.isDelivered || !order.isShipped}
                  type="button"
                  className="py-2 px-4 border-2 border-green-900 hover:bg-green-900 hover:text-green-100 text-green-900 font-bold text-base rounded-lg m-2"
                  onClick={() => deliveredOrderHandler(order.id)}
                >
                  Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
