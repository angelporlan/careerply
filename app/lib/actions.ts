"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const redirectWithError = (message: string) => {
  const params = new URLSearchParams({ error: message });
  redirect(`/applications/new?${params.toString()}`);
};

export async function createApplication(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const cvFile = formData.get("cv_file") as File | null;
  let cvUrl = null;

  // Si hay un archivo y no está vacío (size > 0)
  if (cvFile && cvFile.size > 0) {
    // Generamos un nombre único para que no se sobreescriban
    const fileExt = cvFile.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;

    // Subimos al bucket 'cvs'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(fileName, cvFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error("Error subiendo el archivo:", uploadError);
      // Opcional: Podrías hacer un redirectWithError aquí si el CV es obligatorio
    } else if (uploadData) {
      // Si se sube bien, obtenemos la URL pública para guardarla en la tabla
      const { data: publicUrlData } = supabase.storage
        .from('cvs')
        .getPublicUrl(uploadData.path);
        
      cvUrl = publicUrlData.publicUrl;
    }
  }

  const initialPayload: Record<string, FormDataEntryValue | null> = {
    company: formData.get("company"),
    role: formData.get("role"),
    job_url: formData.get("job_url"),
    cv_url: cvUrl,
    status: formData.get("status"),
    notes: formData.get("notes"),
    applied_at: formData.get("date"),
    user_id: user.id,
  };

  const aliases: Record<string, string[]> = {
    company: ["company_name"],
    role: ["position", "job_title", "title"],
    job_url: ["url", "link"],
    applied_at: ["application_date", "date"],
    user_id: ["owner_id", "profile_id"],
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
    if (
      /row-level security|permission denied|not allowed|violates row-level security/i.test(
        lastError.message
      )
    ) {
      redirectWithError(
        "No tienes permisos para insertar en applications con la politica RLS actual. Crea una policy de INSERT para auth.uid() o revisa la columna user_id."
      );
    }

    redirectWithError(`Error guardando en Supabase: ${lastError.message}`);
  }
}
