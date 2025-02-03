import { hono } from "@/lib/hono/client";
import Link from "next/link";
import DeleteButton from "./components/delete-button";
import { InferResponseType } from "hono";
import { fetcher } from "@/lib/hono/utils";


const url = hono.api.blogs.$url();
type ResType = InferResponseType<typeof hono.api.blogs.$get>;

export default async function Page() {

  const blogs = await fetcher<ResType>(url, {
    cache: "no-store"
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Next.jsとHono🔥で作ったブログ</h1>
        {blogs.length > 0 ? (
          <div className="space-y-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <Link href={`/blogs/${blog.id}`} className="block">
                  <h2 className="text-2xl font-semibold text-gray-900">{blog.title}</h2>
                  <p className="text-gray-600 mt-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
                </Link>
                <div className="mt-4 justify-end flex gap-2">
                  <button type="button" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                    <Link href={`/blogs/${blog.id}/edit`}>
                      編集
                    </Link>
                  </button>
                  <DeleteButton id={blog.id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No blogs available.</p>
        )}
      </div>
    </div>
  );
}
