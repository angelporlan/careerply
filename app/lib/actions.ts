"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function createApplication(formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServerKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServerKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local to allow server-side inserts that bypass RLS."
    );
  }

  const supabase = createSupabaseClient(supabaseUrl, supabaseServerKey!);

  const initialPayload: Record<string, FormDataEntryValue | null> = {
    company: formData.get("company"),
    role: formData.get("role"),
    job_url: formData.get("job_url"),
    status: formData.get("status"),
    notes: formData.get("notes"),
    applied_at: formData.get("date"),
  };

  const aliases: Record<string, string[]> = {
    company: ["company_name"],
    role: ["position", "job_title", "title"],
    job_url: ["url", "link"],
    applied_at: ["application_date", "date"],
  };

  let payload = { ...initialPayload };
  let lastError: { message: string } | null = null;

  for (let i = 0; i < 12; i += 1) {
    const { error } = await supabase.from("applications").insert([payload]);

    if (!error) {
      revalidatePath("/applications");
      redirect("/applications");
    }

    lastError = error;

    const missingColumn = error.message.match(/Could not find the '([^']+)' column/);
    if (!missingColumn) {
      break;
    }

    const column = missingColumn[1];
    const nextAlias = aliases[column]?.shift();

    if (nextAlias) {
      payload[nextAlias] = payload[column];
    }

    delete payload[column];

    if (Object.keys(payload).length === 0) {
      break;
    }
  }

  if (lastError) {
    throw new Error(`Error guardando en Supabase: ${lastError.message}`);
  }
}
