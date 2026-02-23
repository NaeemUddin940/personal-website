import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // এখানে রোল অনুযায়ী রিডাইরেক্ট হবে
  console.log(session?.user?.role);
  if (["admin", "manager"].includes(session?.user?.role)) {
    redirect("/admin/dashboard");
  } else {
    redirect("/user/details");
  }
}
