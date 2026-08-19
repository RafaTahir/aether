import { createSupabaseServerClient } from "../lib/supabase/server";

export type FunderWorkspaceState =
  | { kind: "unconfigured"; shortlist: [] }
  | { kind: "signed_out"; shortlist: [] }
  | { kind: "error"; message: string; shortlist: [] }
  | { kind: "ready"; shortlist: string[] };

export async function loadFunderWorkspace(): Promise<FunderWorkspaceState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { kind: "unconfigured", shortlist: [] };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { kind: "signed_out", shortlist: [] };

  const { data, error } = await supabase
    .from("funder_shortlists")
    .select("project_slug")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) return { kind: "error", message: error.message, shortlist: [] };

  return {
    kind: "ready",
    shortlist: (data ?? []).map((item) => item.project_slug),
  };
}
