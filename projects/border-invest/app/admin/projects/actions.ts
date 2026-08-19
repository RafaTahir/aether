"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export type ProjectReviewStatus =
  "under_review" | "needs_changes" | "approved" | "rejected";

export async function reviewProjectSubmission(
  submissionId: string,
  status: ProjectReviewStatus,
  reviewerNotes: string
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase)
    return { ok: false as const, error: "Supabase is not configured." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "Sign in is required." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile || !["admin", "reviewer"].includes(profile.role)) {
    return { ok: false as const, error: "Reviewer access is required." };
  }

  const { error } = await supabase
    .from("project_submissions")
    .update({
      status,
      reviewer_notes: reviewerNotes.trim() || null,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", submissionId);

  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/operator");
  return { ok: true as const };
}
