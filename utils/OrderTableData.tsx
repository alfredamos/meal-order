import { OrderModelDatesString } from "@/models/orderModeldatesString.model";
import { ReactNode } from "react";

type Props = {
  orders: OrderModelDatesString[];
  children?: ReactNode;
  hasAction: boolean;
  orderSelected: (order: OrderModelDatesString) => void
}

export default function OrderTableData({children, hasAction, orders, orderSelected}: Props) {
  return (
    <>
      {orders?.map((order) => (
        <tr className="text-base text-black" key={order.id}>
          <td>{order.id}</td>
          <td>
            {order?.cartItems?.map((item) =>{ 
              orderSelected(order) 
              return(
                <ul key={item.id}>
                  <li>
                  <p>{item.name}</p>
                  </li>
                </ul>
              )})}
          </td>

          <td>{order.totalPrice}</td>
          <td>{order.totalQuantity}</td>
          <td>{order.orderDate}</td>
          <td>{order.status}</td>
          <td>{order.user?.name}</td>
            {hasAction && <td>
            {children}
          </td>}
              
        </tr>
      ))}
    </>
  );
}
        