"use client"

import { hono } from "@/lib/hono/client"

type Props = {
  id: number
}

export default function DeleteButton({ id }: Props) {

  const handleDelete = async() => {
    await hono.api.blogs[":id"].$delete({
      param: {
        id: String(id)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
    >
      削除
    </button>
  );
}
