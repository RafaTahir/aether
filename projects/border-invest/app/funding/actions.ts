"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../lib/supabase/server";

export async function createFundingApplication(
  projectSlug: string,
  sourceId: string
) {
  if (!/^[a-z0-9-]+$/.test(projectSlug) || !sourceId.trim()) {
    return { ok: false as const, error: "Select a valid project and source." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return {
      ok: false as const,
      error: "Application storage is not configured.",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return {
      ok: false as const,
      error: "Sign in to create an application record.",
    };

  const { data: existing, error: lookupError } = await supabase
    .from("funding_applications")
    .select("id,status")
    .eq("project_slug", projectSlug)
    .eq("source_id", sourceId)
    .eq("applicant_id", user.id)
    .not("status", "in", "(declined,withdrawn)")
    .maybeSingle();
  if (lookupError) return { ok: false as const, error: lookupError.message };
  if (existing) {
    return { ok: true as const, application: existing, existing: true };
  }

  const { data, error } = await supabase
    .from("funding_applications")
    .insert({
      project_slug: projectSlug,
      source_id: sourceId,
      applicant_id: user.id,
      status: "draft",
      notes: "Created from the Aether funding directory.",
    })
    .select("id,status")
    .single();
  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/funding");
  revalidatePath("/portfolio");
  return { ok: true as const, application: data, existing: false };
}
