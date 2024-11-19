import { ReactNode } from "react";

export default function Modal({children}: {children:ReactNode}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 min-h-screen" role="dialog" arial-modal="true">{children}</div>
  )
}