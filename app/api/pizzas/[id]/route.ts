import { deletePizzaById, editPizzaById } from "@/actions/pizza.action";
import { Pizza } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export const DELETE = async (_request: NextRequest, { params }: Params) => {
  const { id } = params;

  //----> Delete the pizza from the database.
  const deletedPizza = await deletePizzaById(id);

  revalidatePath("/pizzas/list");
  //----> Send back the response.
  return NextResponse.json({
    pizza: deletedPizza,
    message: "Pizza deleted successfully.",
  });
};

export const PATCH = async (request: NextRequest, { params }: Params) => {
  //----> Get the id from params
  const { id } = params;
  //----> Get the pizza payload from the request.
  const pizza = await request.json() as Pizza;

  pizza.id = id;

  //----> Edit the pizza from the database.
  await editPizzaById(pizza);

  revalidatePath("/pizzas/list");
  redirect(`/pizzas/${id}`);
  
};

