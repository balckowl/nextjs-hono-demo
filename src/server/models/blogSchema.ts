import { z } from "@hono/zod-openapi";

export const BlogSchema = z.object({
  id: z.number().openapi({
    example: 1
  }),
  title: z.string().openapi({
    example: "ブログのタイトル"
  }),
  content: z.string().openapi({
    example: "ブログのコンテンツ"
  }),
  createdAt: z.string().datetime().openapi({
    example: "2024-10-30T12:00:00Z"
  }),
})

export const BlogsSchema = z.array(BlogSchema)

export const BlogIdSchema = z.object({
  id: z.string().openapi({ example: "1" }),
});

export const CreateBlogSchema = z.object({
  title: z.string().min(1).openapi({
    example: "新しい記事"
  }),
  content: z.string().min(1).openapi({
    example: "ブログの内容"
  })
})

export const UpdateBlogSchema = z.object({
  title: z.string().optional().openapi({
    example: "更新後のタイトル"
  }),
  content: z.string().optional().openapi({
    example: "更新後の内容"
  }),
});

export type Blog = z.infer<typeof BlogSchema>;
export type BlogId = z.infer<typeof BlogIdSchema>;
export type Blogs = z.infer<typeof BlogsSchema>;
export type CreateBlog = z.infer<typeof CreateBlogSchema>;
export type UpdateBlog = z.infer<typeof UpdateBlogSchema>;
