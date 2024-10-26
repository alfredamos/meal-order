import { Pizza } from "@prisma/client";
import CancelButton from "../authForms/cancelButton";
import PizzaInputForm from "./pizzaInputForm.form";

type Props = {
  formName: string;
  pizza: Pizza;
  action: (formData: FormData) => any;
};
export default function FormPizza({ action, formName, pizza }: Props) {
  return (
    <form
      action={action}
      className="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
    >
      <PizzaInputForm formName={formName} pizza={pizza}>
        <CancelButton className="flex-1" />
      </PizzaInputForm>
    </form>
  );
}
