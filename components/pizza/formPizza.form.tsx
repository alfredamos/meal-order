"use client";

import { Pizza } from "@prisma/client";
import CancelButton from "../authForms/cancelButton";
import PizzaInputForm from "./pizzaInputForm.form";
import { useRouter } from "next/navigation";
import { createPizza } from "@/actions/pizza.action";
import toast from "react-hot-toast";

type Props = {
  formName: string;
  pizza: Pizza;
};
export default function FormPizza({ formName, pizza }: Props) {
  const router = useRouter();

  const submitPizzaFormHandler = async (formData: FormData) => {
    try {
      await createPizza(formData);
      toast.success("Pizza has been successfully created!");
    } catch (error: any) {
      toast.error(`Pizza creation has failed! ${error.message}`);
    } finally {
      router.push("/pizzas/list");
    }
  };
  return (
    <form
      action={submitPizzaFormHandler}
      className="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
    >
      <PizzaInputForm formName={formName} pizza={pizza}>
        <CancelButton className="flex-1" />
      </PizzaInputForm>
    </form>
  );
}
