"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
};
export default function Modal({ open, children, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      //dialogRef.current!.showModal();
      dialogRef.current!.showModal();
    } else {
      dialogRef.current!.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" onClose={onClose} ref={dialogRef}>
      {children}
    </dialog>,
    document.querySelector("body")!
  );
}
