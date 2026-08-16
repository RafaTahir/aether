import { fundingSources as staticSources } from "@/src/data/funding-sources";
import { fundingSourceFromRecord } from "@/src/lib/funding-source-record";
import { createSupabaseServerClient } from "./supabase/server";

export async function loadFundingSources({ includeUnpublished = false } = {}) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return staticSources;

  let query = supabase.from("funding_sources").select("*").order("name");
  if (!includeUnpublished) query = query.eq("review_state", "published");
  const { data, error } = await query;
  if (error || !data?.length) return staticSources;
  return data.map((record) =>
    fundingSourceFromRecord(record as Record<string, unknown>)
  );
}
