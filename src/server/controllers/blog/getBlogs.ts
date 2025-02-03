import { prisma } from "@/lib/prisma/client";
import { CreateBlog } from "@/server/models/blogSchema";
import { createBlogRoute, deleteBlogRoute, getBlogByIdRoute, getBlogsRoute, updateBlogRoute } from "@/server/routes/blogRoutes";
import { RouteHandler } from "@hono/zod-openapi";

export const getBlogsHandler: RouteHandler<typeof getBlogsRoute> = async (c) => {
  const blogs = await prisma.blog.findMany()
  return c.json(blogs, 200)
}

export const getBlogByIdHandler: RouteHandler<typeof getBlogByIdRoute> = async (c) => {
  const { id } = c.req.param();
  const blog = await prisma.blog.findUnique({
    where: { id: Number(id) }
  })

  if (!blog) {
    return c.json({ error: "ブログが見つかりません" }, 404)
  }

  return c.json(blog, 200)
}

export const createBlogHandler: RouteHandler<typeof createBlogRoute> = async (c) => {
  const { title, content } = await c.req.json<CreateBlog>();
  const blogs = await prisma.blog.create({
    data: {
      title,
      content
    }
  })

  return c.json(blogs, 201)
}

export const updateBlogHandler: RouteHandler<typeof updateBlogRoute> = async (c) => {
  const { id } = c.req.param();
  const data = await c.req.json();

  const existingBlog = await prisma.blog.findUnique({ where: { id: Number(id) } });

  if (!existingBlog) {
    return c.json({ error: "ブログが見つかりません" }, 404);
  }

  const updatedBlog = await prisma.blog.update({
    where: { id: Number(id) },
    data,
  });

  return c.json(updatedBlog, 200);
};

export const deleteBlogHandler: RouteHandler<typeof deleteBlogRoute> = async (c) => {
  const { id } = c.req.param();

  const existingBlog = await prisma.blog.findUnique({ where: { id: Number(id) } });

  if (!existingBlog) {
    return c.json({ error: "ブログが見つかりません" }, 404);
  }

  await prisma.blog.delete({ where: { id: Number(id) } });

  return c.json({ message: "ブログを削除しました" }, 200);
};
