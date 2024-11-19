
import { pizzaService } from "@/services/pizzaService";
import { useMutation } from "@tanstack/react-query";

export function useDeletePizza() {
  const deleteData = (id: string) => pizzaService.deleteData(id) 
  return useMutation({
    mutationFn: deleteData,
    onSuccess: (data) => console.log(data)
  });
}
