"use server";

import { orderDb } from "@/db/order.db";
import prisma from "@/db/prisma.db";
import { OrderProduct } from "@/models/orderProduct.model";
import { Order } from "@prisma/client";

export const createOrder = async (formData: FormData) => {
    //----> Get the order info from the request body.
    const {cartItems, order} = Object.fromEntries(formData) as unknown as OrderProduct;

    //----> Store the new order info in the database.
    const createdOrder = await orderDb.createOrder(cartItems, order);

    //----> Send back the response.
    return createdOrder;
  };

export const deleteAllCartItemByOrderId = async (prevState: {orderId: string}) => {
    //----> Get the order id from params.
    const {orderId} = prevState;

    //----> Delete all cart items by order id.
    await orderDb.deleteAllCartItemByOrderId(orderId);

    //----> Send back the response.
    return { message: "Order successfully deleted!" };
  };

export const deleteOneCartItemByOrderId = async (prevState: {cartItemId: string; orderId: string}) => {
    //----> Get the order id and cartItem id from params.
    const { cartItemId, orderId } = prevState;
    //----> Delete one cart item by order id.

    const { filteredCartItems, deletedOrder } =
      await orderDb.deleteOneCartItemByOrderId(cartItemId, orderId);

    //----> Check to see if there is any cart-item left.
    if (filteredCartItems.length === 0) {
      //----> Delete the order.
      console.log("No more cart-item to delete");
      await prisma.order.delete({ where: { id: orderId } });
      
      return { message: "Order is successfully deleted!", order: {} as Order}; 
      
    }
    //----> Send back the response.
    return deletedOrder;
  };

export const deleteOrderById = async (prevState: {id: string}) => {
    const {id} = prevState;
    //----> Delete all associated cart-items.
    const deletedOrder = await orderDb.deleteOrderById(id);
    //----> Send back the response.
    return deletedOrder;
  };

export const deleteOrdersByUserId = async (prevState:{userId: string}) => {
    const {userId} = prevState;
    console.log("I'm in delete all orders by customerId", { userId });

    //----> Delete orders user id.
    await orderDb.deleteOrdersByUserId(userId);
    //----> Send back the response.
    return {
      message:
        "All Orders associated with this customer have been deleted successfully!",
    }
  };

export const editAllCartItemsByOrderId = async (prevState: OrderProduct) => {    
    //----> Destructure cart items and order from order product.
    const { cartItems, order } = prevState;
    //----> Edit all the cart items by order id.
    const { editedOrder, updatedCartItems } =
      await orderDb.editAllCartItemsByOrderId(order.id, cartItems, order);

    //----> Send back the response.
    return { ...editedOrder, orders: updatedCartItems };
  };

export const editOneCartItemByOrderId = async (prevState: {cartItemId: string, orderProduct: OrderProduct}) => {
    //----> Retrieve the orderId and orderId from request params.
    const { cartItemId} = prevState;
    const { cartItems, order} = prevState.orderProduct;
    //----> Edit one cart item by order id.
    const editedOrder = await orderDb.editOneCartItemByOrderId(
      cartItemId,
      order.id,
      cartItems
    );

    //----> Send back the response.
    return editedOrder;
  };

export const editOrderById = async (formData: FormData) => {
    //----> Get the order payload to edit from request.
    const orderToEdit = Object.fromEntries(formData) as unknown as Order;
    const {id} = orderToEdit
    //----> Store the edited order info in the database.
    const editedOrder = await orderDb.editOrder(id, orderToEdit);
    //----> Send back the response.
    return editedOrder
  };

export const getAllOrders = async () => {
    //----> Get all the orders from the database.
    const allOrders = await orderDb.getAllOrders();

    //----> Send back the response.
    return allOrders;
  };

export const getAllOrdersByUserId = async (prevState: {userId: string}) => {
    //----> Get query params.
    const { userId } = prevState;
    //----> Get all orders from the database.
    const allOrders = await orderDb.getAllOrdersByUserId(userId);
    //----> Send back the response.
    return allOrders;
  };

export const getOrderById = async (prevState: {id: string}) => {
    const { id } = prevState;;
    //----> Check for the existence of order in the db.
    const order = await orderDb.getOneOrder(id);

    //----> Send back the response.
    return order;
  };

export const orderDelivered = async (prevState: {orderId: string}) => {
    //----> Extract the order id from params.
    const { orderId } = prevState;
    console.log("Order delivered!!!");

    //----> Update the delivering information.
    const updatedOrder = await orderDb.orderDelivered(orderId);
    //----> Send back the response
    return updatedOrder;
  };

export const orderShipped = async (prevState: {orderId: string}) => {
    //----> Extract the order id from params.
    const { orderId } = prevState;
    console.log("Order Shipped!!!");

    //----> Update the shipping information.
    const updatedOrder = await orderDb.orderShipped(orderId);
    //----> Send back the response
    return updatedOrder;
  };