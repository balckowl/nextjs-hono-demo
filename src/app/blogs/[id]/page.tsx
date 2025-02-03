import { hono } from "@/lib/hono/client";
import { fetcher } from "@/lib/hono/utils";
import { Blog } from "@prisma/client";
import { InferResponseType } from "hono";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};


export default async function Page({ params }: Props) {
  const { id } = params;

  const url = hono.api.blogs[":id"].$url({ param: { id: String(id) } })
  const $get = hono.api.blogs[":id"].$get
  type ResType = InferResponseType<typeof $get>;

  const blog = await fetcher<ResType>(url, {
    cache: "no-store"
  })

  if(!blog) notFound();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
        <p className="text-gray-500 text-sm mt-2">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-6 text-gray-700 leading-relaxed">{blog.content}</div>
      </div>
    </div>
  );
}
