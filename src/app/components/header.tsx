import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

export default async function Header() {

  const session = await auth()

  return (
    <header className="border-b h-[60px]">
      <div className="container mx-auto h-full flex items-center justify-between">
        <h2 className="font-bold text-[20px]">
          <Link href="/">Hono 🔥</Link>
        </h2>
        {!session && <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <button type="submit" className="bg-blue-500 text-white rounded-full px-3 py-1 font-bold">ログイン</button>
        </form>}

        {session && <div className="flex items-center gap-3">
          <button className="bg-blue-500 text-white rounded-full px-3 py-1 font-bold">
            <Link href="/blogs/new">記事を投稿</Link>
          </button>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button type="submit" className="bg-blue-500 text-white rounded-full px-3 py-1 font-bold">ログアウト</button>
          </form>
        </div>}
      </div>
    </header>
  );
}
