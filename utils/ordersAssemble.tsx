import { OrderModelDatesString } from "@/models/orderModeldatesString.model"
import { ReactNode } from "react";
import OrdersTable from "./OrdersTable";
import OrderTableData from "./OrderTableData";

type Props = {
  orders: OrderModelDatesString[];
  hasAction: boolean;
  children?: ReactNode;
  orderSelected: (order: OrderModelDatesString) => void
}

export default function OrdersAssemble({children, hasAction, orders, orderSelected}: Props) {
  return (
    <OrdersTable hasActions={hasAction}>
      <OrderTableData orders={orders} hasAction={hasAction} orderSelected={orderSelected}>
        {children}
      </OrderTableData>
    </OrdersTable>
  )
}
