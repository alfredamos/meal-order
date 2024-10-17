"use client";

import DeleteUserConfirmation from "@/app/users/_components/deleteUserConfirmation";
import Modal from "@/components/utils/modal.util";
import { User } from "@prisma/client";

type Props = {
  isDelete: boolean;
  user: User;
  backToList: () => void;
  onDelete: (id: string) => void;
};
export default function UserDeleteDialog({
  backToList,
  user,
  isDelete,
  onDelete,
}: Props) {
  return (
    <Modal open={isDelete} onClose={backToList}>
      <DeleteUserConfirmation
        onCancel={backToList}
        onDelete={onDelete}
        user={user}
      />
    </Modal>
  );
}
