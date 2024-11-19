import { userService } from "@/services/userService";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";


export function useEditUser(){
  const editData = ({id, user}: {id: string; user: User}) => userService.editData(id, user)
  return useMutation({
    mutationFn: editData
  }); 
}