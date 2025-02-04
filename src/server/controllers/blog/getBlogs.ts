import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import { CreateBlog } from "@/server/models/blogSchema";
import { createBlogRoute, deleteBlogRoute, getBlogByIdRoute, getBlogsRoute, updateBlogRoute } from "@/server/routes/blogRoutes";
import { RouteHandler } from "@hono/zod-openapi";
import { revalidatePath, revalidateTag } from "next/cache";

export const getBlogsHandler: RouteHandler<typeof getBlogsRoute> = async (c) => {
  const blogs = await prisma.blog.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  })
  return c.json(blogs, 200)
}

export const getBlogByIdHandler: RouteHandler<typeof getBlogByIdRoute> = async (c) => {
  const { id } = c.req.param();
  const blog = await prisma.blog.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  })

  if (!blog) {
    return c.json(null, 404)
  }

  return c.json(blog, 200)
}

export const createBlogHandler: RouteHandler<typeof createBlogRoute> = async (c) => {
  const { title, content } = await c.req.json<CreateBlog>();

  const session = await auth()

  if (!session?.user?.id) {
    throw Error("認証してください。")
  }

  const blogs = await prisma.blog.create({
    data: {
      userId: session.user.id,
      title,
      content,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  })

  revalidateTag("post")

  return c.json(blogs, 201)
}

export const updateBlogHandler: RouteHandler<typeof updateBlogRoute> = async (c) => {
  const { id } = c.req.param();
  const data = await c.req.json();

  const session = await auth()
  console.log(session)

  //認証をチェック
  if (!session?.user?.id) {
    throw Error("認証してください。")
  }

  const existingBlog = await prisma.blog.findUnique({
    where: { id: Number(id) },
  });

  // ブログが存在しない場合
  if (!existingBlog) {
    return c.json(null, 404);
  }

  //ユーザーがブログの著者かどうか
  if (session?.user?.id !== existingBlog.userId) {
    throw Error("編集権限がありません。")
  }

  const updatedBlog = await prisma.blog.update({
    where: { id: Number(id) },
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });

  revalidateTag("update")

  return c.json(updatedBlog, 200);
};

export const deleteBlogHandler: RouteHandler<typeof deleteBlogRoute> = async (c) => {
  const { id } = c.req.param();
  const session = await auth()

  // 認証チェック
  if (!session?.user?.id) {
    throw Error("認証してください。")
  }

  const existingBlog = await prisma.blog.findUnique({ where: { id: Number(id) } });

  if (!existingBlog) {
    return c.json(null, 404);
  }

  //ユーザーがブログの著者かどうか
  if (session?.user?.id !== existingBlog.userId) {
    throw Error("編集権限がありません。")
  }

  await prisma.blog.delete({ where: { id: Number(id) } });

  revalidatePath("/")

  return c.json({ message: "ブログを削除しました" }, 200);
};
