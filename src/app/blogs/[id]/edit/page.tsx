import EditForm from "@/app/components/edit-form";
import { hono } from "@/lib/hono/client";
import { Blog } from "@prisma/client";

export const runtime = 'edge';

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
    <EditForm blog={blog}/>
  );
}
