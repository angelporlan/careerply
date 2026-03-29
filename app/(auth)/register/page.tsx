import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signUpAction } from "@/app/(auth)/actions";
import { createClient } from "@/utils/supabase/server";

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;

  return (
    <section className="w-full rounded-4xl bg-surface-bright p-8 shadow-sm sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Auth</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tightest text-on-surface">Register</h1>
      <p className="mt-2 text-sm text-on-surface/60">Crea tu cuenta para empezar a organizar aplicaciones.</p>

      {params.message ? (
        <div className="mt-6 rounded-md bg-status-offer-bg px-4 py-3 text-sm text-status-offer-text">
          {params.message}
        </div>
      ) : null}

      {params.error ? (
        <div className="mt-6 rounded-md bg-status-rejected-bg px-4 py-3 text-sm text-status-rejected-text">
          {params.error}
        </div>
      ) : null}

      <form action={signUpAction} className="mt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-on-surface/55" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-surface-container-high bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none ring-primary/20 transition focus:ring-4"
            placeholder="tu@email.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-on-surface/55" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full rounded-md border border-surface-container-high bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none ring-primary/20 transition focus:ring-4"
            placeholder="Minimo 6 caracteres"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dim"
        >
          Crear cuenta
        </button>
      </form>

      <p className="mt-6 text-sm text-on-surface/60">
        Ya tienes cuenta?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Inicia sesion
        </Link>
      </p>
    </section>
  );
}