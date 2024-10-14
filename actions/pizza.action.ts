"use server";

import { PizzaDb } from "@/db/pizza.db";
import { Pizza } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPizza = async (formData: FormData) => {
  //----> Get the pizza from the request.
  const { name, price, topping, quantity, image, description, userId } =
    Object.fromEntries(formData) as unknown as Pizza;
  //----> Store the new pizza in the database.
  await PizzaDb.createPizza({
    name,
    price: +price,
    topping,
    quantity: +quantity,
    image,
    description,
    userId,
  });
  //----> Send back the response.

  revalidatePath("/pizzas");
  return redirect("/pizzas");
};

export const deletePizzaById = async ( id: string ) => {
  //----> Delete the pizza from the database.
  const deletedPizza = await PizzaDb.deletedPizza(id);
  //----> Send back the response.
  return deletedPizza;
};

export const editPizzaById = async (formData: FormData) => {
  //----> Get the pizza to update from request.
  const { name, price, topping, quantity, image, description, userId, id } =
    Object.fromEntries(formData) as unknown as Pizza;
  //----> Delete the pizza from the database.
  const editedPizza = await PizzaDb.editPizza(id, {
    name,
    price: +price,
    topping,
    quantity: +quantity,
    image,
    description,
    userId,
  });
  //----> Send back the response.
  revalidatePath("/pizzas");
  return redirect("/pizzas");
};

export const getAllPizza = async () => {
  //----> Get all pizzas from the database.
  const pizza = await PizzaDb.getAllPizza();
  //----> Send back the response.
  return pizza;
};

export const getPizzaById = async (id: string) => {
  //----> Retrieve pizza from database.
  const pizza = await PizzaDb.detailPizza(id);
  //----> Send back the response back.
  return pizza;
};
