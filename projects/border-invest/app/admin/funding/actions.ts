"use server";

import { revalidatePath } from "next/cache";
import type { FundingReviewState } from "@/src/domain/funding";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export async function reviewFundingSource(
  sourceId: string,
  state: FundingReviewState,
  note = ""
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return { ok: false, error: "Sign in is required." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile || !["admin", "reviewer"].includes(profile.role)) {
    return { ok: false, error: "Reviewer access is required." };
  }

  const reviewedAt = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("funding_sources")
    .update({
      review_state: state,
      last_verified: reviewedAt.slice(0, 10),
      updated_at: reviewedAt,
    })
    .eq("id", sourceId);
  if (updateError) return { ok: false, error: updateError.message };

  const { error: reviewError } = await supabase
    .from("funding_source_reviews")
    .insert({
      source_id: sourceId,
      reviewer_id: user.id,
      state,
      note,
      reviewed_at: reviewedAt,
    });
  if (reviewError) return { ok: false, error: reviewError.message };

  const { error: auditError } = await supabase.from("audit_events").insert({
    actor_id: user.id,
    event_type: "funding_source_reviewed",
    entity_type: "funding_source",
    entity_id: sourceId,
    metadata: { state, note },
  });
  if (auditError) return { ok: false, error: auditError.message };
  revalidatePath("/funding");
  revalidatePath("/admin/funding");
  return { ok: true };
}
