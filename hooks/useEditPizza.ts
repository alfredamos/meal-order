import { pizzaService } from "@/services/pizzaService";
import { Pizza } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";


export function useEditPizza(){
  const editData = ({id, pizza}: {id: string, pizza: Pizza}) => pizzaService.editData(id, pizza)
  return useMutation({
    mutationFn: editData
  }); 
}