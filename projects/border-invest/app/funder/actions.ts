"use server";

import { revalidatePath } from "next/cache";
import { projects } from "../../src/data/projects";
import { createSupabaseServerClient } from "../lib/supabase/server";

export async function toggleFunderShortlist(projectSlug: string) {
  if (!projects.some((project) => project.slug === projectSlug)) {
    return { ok: false as const, error: "Project room was not found." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase)
    return { ok: false as const, error: "Sign-in storage is not configured." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return { ok: false as const, error: "Sign in to save a funder shortlist." };

  const { data: existing, error: lookupError } = await supabase
    .from("funder_shortlists")
    .select("project_slug")
    .eq("user_id", user.id)
    .eq("project_slug", projectSlug)
    .maybeSingle();
  if (lookupError) return { ok: false as const, error: lookupError.message };

  if (existing) {
    const { error } = await supabase
      .from("funder_shortlists")
      .delete()
      .eq("user_id", user.id)
      .eq("project_slug", projectSlug);
    if (error) return { ok: false as const, error: error.message };
    revalidatePath("/funder");
    return { ok: true as const, shortlisted: false };
  }

  const { error } = await supabase.from("funder_shortlists").insert({
    user_id: user.id,
    project_slug: projectSlug,
  });
  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/funder");
  return { ok: true as const, shortlisted: true };
}
