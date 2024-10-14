import { User } from "@prisma/client";
import React from "react";
import { useRef } from "react";

type Props = {
  deleteMessage: string;
  deleteTitle: string;
  deleteResource: (value: boolean) => void;
}
export default function ModalAlert({deleteMessage, deleteTitle, deleteResource}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  //const modal =  document.getElementById("my_modal_5").showModal()

  const openModal = () => {
    dialogRef.current!.showModal()!;
  }
  return (
    <>
      <button
        className="btn"
        onClick={openModal}
      >
        open modal
      </button>
      <dialog ref={dialogRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{deleteTitle}</h3>
          <p className="py-4">
            {deleteMessage}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => deleteResource(false)}>Close</button>
              <button className="btn btn-accent" onClick={() => deleteResource(true)}>Delete</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}