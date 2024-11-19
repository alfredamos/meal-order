
import { userService } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";

export function useDeleteUser() {
  const deleteData = (id: string) => userService.deleteData(id) 
  return useMutation({
    mutationFn: deleteData,
    onSuccess: (data) => console.log(data)
  });
}
