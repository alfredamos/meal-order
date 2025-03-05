"use client";

import { User } from "@prisma/client";
import Modal from "@/components/utils/modal.util";
import UserCardView from "./userCardView";

type Props = {
  user: User;
  onCancel: () => void;
  isView: boolean;
};
export default function UserViewDialog({ isView, user, onCancel }: Props) {
  return (
    <Modal open={isView} onClose={onCancel}>
      <UserCardView onCancel={onCancel} user={user} />
    </Modal>
  );
}
