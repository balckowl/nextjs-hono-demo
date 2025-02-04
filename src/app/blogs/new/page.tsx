import NewForm from "@/app/components/new-form";
import { auth } from "@/auth";

export default async function Page() {

  const session = await auth()

  if(!session) return <div className="grid place-content-center h-[calc(100vh-70px)]">認証してください。</div>

  return (
    <>
      <NewForm />
    </>
  );
}
