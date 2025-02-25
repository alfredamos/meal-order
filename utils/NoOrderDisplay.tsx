import Link from 'next/link'
import React from 'react'

export default function NoOrderDisplay() {
  return (
    <div className="flex flex-col justify-between items-end mx-auto my-auto bg-white text-black max-w-lg px-12 py-40 rounded-lg shadow-lg mt-24">
        <h1 className="text-3xl">There are no orders to display!</h1>
        <p className="mt-32 text-indigo-900 flex justify-end">
          <Link href="/pizzas">Go Home</Link>
        </p>
      </div>
  )
}
