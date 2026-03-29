"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const normalizeText = (value: FormDataEntryValue | null) => {
  return typeof value === "string" ? value.trim() : "";
};

const normalizeNextPath = (value: string) => {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/dashboard";
};

const withMessage = (
  pathname: "/login" | "/register",
  type: "error" | "message",
  text: string,
  nextPath?: string
) => {
  const params = new URLSearchParams();
  params.set(type, text);

  if (nextPath) {
    params.set("next", normalizeNextPath(nextPath));
  }

  return `${pathname}?${params.toString()}`;
};

export async function signInAction(formData: FormData) {
  const email = normalizeText(formData.get("email"));
  const password = normalizeText(formData.get("password"));
  const nextPath = normalizeText(formData.get("next"));

  if (!email || !password) {
    redirect(withMessage("/login", "error", "Email y password son obligatorios", nextPath));
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(withMessage("/login", "error", error.message, nextPath));
  }

  redirect(normalizeNextPath(nextPath));
}

export async function signUpAction(formData: FormData) {
  const email = normalizeText(formData.get("email"));
  const password = normalizeText(formData.get("password"));

  if (!email || !password) {
    redirect(withMessage("/register", "error", "Email y password son obligatorios"));
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect(withMessage("/register", "error", error.message));
  }

  if (data.session) {
    redirect("/dashboard");
  }

  redirect(
    withMessage(
      "/login",
      "message",
      "Revisa tu correo para confirmar la cuenta y luego inicia sesion"
    )
  );
}

export async function signOutAction() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect(withMessage("/login", "error", error.message));
  }

  redirect("/login");
}