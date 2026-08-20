"use server";

import { revalidatePath } from "next/cache";
import { projects } from "../../src/data/projects";
import { createSupabaseServerClient } from "../lib/supabase/server";

export async function getSavedProjectState(projectSlug: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase)
    return { mode: "browser" as const, authenticated: false, saved: false };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return { mode: "account" as const, authenticated: false, saved: false };

  const { data, error } = await supabase
    .from("saved_projects")
    .select("project_slug")
    .eq("user_id", user.id)
    .eq("project_slug", projectSlug)
    .maybeSingle();

  return {
    mode: "account" as const,
    authenticated: true,
    saved: !error && Boolean(data),
  };
}

export async function toggleSavedProject(projectSlug: string) {
  if (!/^[a-z0-9-]+$/.test(projectSlug)) {
    return { ok: false as const, error: "Invalid project reference." };
  }
  if (!projects.some((project) => project.slug === projectSlug)) {
    return { ok: false as const, error: "Project room was not found." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false as const, error: "Sign-in storage is not configured." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return { ok: false as const, error: "Sign in to save project rooms." };

  const { data: existing, error: lookupError } = await supabase
    .from("saved_projects")
    .select("project_slug")
    .eq("user_id", user.id)
    .eq("project_slug", projectSlug)
    .maybeSingle();
  if (lookupError) return { ok: false as const, error: lookupError.message };

  if (existing) {
    const { error } = await supabase
      .from("saved_projects")
      .delete()
      .eq("user_id", user.id)
      .eq("project_slug", projectSlug);
    if (error) return { ok: false as const, error: error.message };
    revalidatePath(`/projects/${projectSlug}`);
    revalidatePath("/portfolio");
    return { ok: true as const, saved: false };
  }

  const { error } = await supabase.from("saved_projects").insert({
    user_id: user.id,
    project_slug: projectSlug,
  });
  if (error) return { ok: false as const, error: error.message };

  revalidatePath(`/projects/${projectSlug}`);
  revalidatePath("/portfolio");
  return { ok: true as const, saved: true };
}
