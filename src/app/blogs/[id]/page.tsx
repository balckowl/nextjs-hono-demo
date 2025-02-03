import { hono } from "@/lib/hono/client";
import { Blog } from "@prisma/client";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const res = await hono.api.blogs[":id"].$get({
    param: {
      id,
    },
  });

  const blog = (await res.json()) as Blog;

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
