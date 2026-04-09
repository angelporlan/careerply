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

  const payload = {
    company: String(formData.get("company") ?? "").trim(),
    status: String(formData.get("status") ?? "sent").trim(),
    notes: String(formData.get("notes") ?? "").trim(),
    user_id: user.id,
    cv_url: cvUrl,
  };

  const { error } = await supabase.from("applications").insert([payload]);

  if (error) {
    if (
      /row-level security|permission denied|not allowed|violates row-level security/i.test(
        error.message
      )
    ) {
      redirectWithError(
        "No tienes permisos para insertar en applications con la politica RLS actual. Crea una policy de INSERT para auth.uid() o revisa la columna user_id."
      );
    }

    redirectWithError(`Error guardando en Supabase: ${error.message}`);
  }

  revalidatePath("/applications");
  redirect("/applications");
}

export async function getApplications() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching applications:", error);
    return [];
  }

  return applications || [];
}

export async function getApplicationById(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: application, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return null;
  }

  return application;
}

export async function uploadApplicationCv(applicationId: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const file = formData.get("cv_file") as File | null;
  if (!file || file.size <= 0) {
    const params = new URLSearchParams({ error: "Selecciona un archivo valido." });
    redirect(`/applications/detail/${applicationId}?${params.toString()}`);
  }

  const { data: application, error: applicationError } = await supabase
    .from("applications")
    .select("id, cv_url")
    .eq("id", applicationId)
    .eq("user_id", user.id)
    .single();

  if (applicationError || !application) {
    const params = new URLSearchParams({ error: "No se encontro la aplicacion." });
    redirect(`/applications/detail/${applicationId}?${params.toString()}`);
  }

  if (application.cv_url) {
    const params = new URLSearchParams({ error: "Esta aplicacion ya tiene un CV cargado." });
    redirect(`/applications/detail/${applicationId}?${params.toString()}`);
  }

  const extension = file.name.split(".").pop() || "pdf";
  const fileName = `${user.id}_${applicationId}_${Date.now()}.${extension}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("cvs")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError || !uploadData) {
    const params = new URLSearchParams({ error: "No se pudo subir el archivo a storage." });
    redirect(`/applications/detail/${applicationId}?${params.toString()}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from("cvs")
    .getPublicUrl(uploadData.path);

  const { data: updatedApplication, error: updateError } = await supabase
    .from("applications")
    .update({ cv_url: publicUrlData.publicUrl })
    .eq("id", applicationId)
    .eq("user_id", user.id)
    .select("id, cv_url")
    .maybeSingle();

  if (updateError || !updatedApplication?.cv_url) {
    await supabase.storage.from("cvs").remove([uploadData.path]);

    if (updateError) {
      console.error("Error updating application cv_url:", {
        message: updateError.message,
        code: updateError.code,
        details: updateError.details,
        hint: updateError.hint,
      });

      const params = new URLSearchParams({
        error: `No se pudo guardar el cv_url en applications: ${updateError.message}`,
      });
      redirect(`/applications/detail/${applicationId}?${params.toString()}`);
    }

    const params = new URLSearchParams({
      error:
        "No se pudo actualizar la fila de applications. Revisa la policy RLS de UPDATE (auth.uid() = user_id).",
    });
    redirect(`/applications/detail/${applicationId}?${params.toString()}`);
  }

  revalidatePath("/applications");
  revalidatePath(`/applications/detail/${applicationId}`);
  redirect(`/applications/detail/${applicationId}?success=1`);
}
