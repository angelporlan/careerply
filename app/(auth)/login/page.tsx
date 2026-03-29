import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signInAction } from "@/app/(auth)/actions";
import { createClient } from "@/utils/supabase/server";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    next?: string;
  }>;
};

const getSafeNext = (value?: string) => {
  if (!value) {
    return "/dashboard";
  }

  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  return "/dashboard";
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const nextPath = getSafeNext(params.next);

  return (
    <section className="w-full rounded-4xl bg-surface-bright p-8 shadow-sm sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Auth</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tightest text-on-surface">Login</h1>
      <p className="mt-2 text-sm text-on-surface/60">Accede a tu workspace de aplicaciones.</p>

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

      <form action={signInAction} className="mt-6 space-y-4">
        <input type="hidden" name="next" value={nextPath} />

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
            className="w-full rounded-md border border-surface-container-high bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none ring-primary/20 transition focus:ring-4"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dim"
        >
          Entrar
        </button>
      </form>

      <p className="mt-6 text-sm text-on-surface/60">
        No tienes cuenta?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Crea una aqui
        </Link>
      </p>
    </section>
  );
}