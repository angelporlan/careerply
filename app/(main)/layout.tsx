import Sidebar from "@/components/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userEmail = user.email ?? "";
  const metadata = user.user_metadata ?? {};
  const userName =
    (typeof metadata.full_name === "string" && metadata.full_name.trim()) ||
    (typeof metadata.name === "string" && metadata.name.trim()) ||
    (userEmail ? userEmail.split("@")[0] : "Usuario");

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar fijo: Se mantiene siempre visible al navegar */}
      <Sidebar userName={userName} userEmail={userEmail} />
      
      {/* Contenido dinámico: Aquí se renderizará Dashboard o Applications */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}