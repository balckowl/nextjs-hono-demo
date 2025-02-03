import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { createBlogRoute, deleteBlogRoute, getBlogByIdRoute, getBlogsRoute, updateBlogRoute } from "@/server/routes/blogRoutes";
import { createBlogHandler, deleteBlogHandler, getBlogByIdHandler, getBlogsHandler, updateBlogHandler } from "@/server/controllers/blog/getBlogs";

export const app = new OpenAPIHono().basePath("/api");

const blogApp = new OpenAPIHono()
  .openapi(getBlogsRoute, getBlogsHandler)
  .openapi(getBlogByIdRoute, getBlogByIdHandler)
  .openapi(createBlogRoute, createBlogHandler)
  .openapi(updateBlogRoute, updateBlogHandler)
  .openapi(deleteBlogRoute, deleteBlogHandler);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = app.route("/blogs", blogApp);

app.doc("/specification", {
  openapi: "3.0.0",
  info: { title: "Blog API", version: "1.0.0" },
});

app.get("/doc", swaggerUI({ url: "/api/specification" }));

export type AppType = typeof route;
export default app;
