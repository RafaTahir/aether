import { createSupabaseServerClient } from "../lib/supabase/server";

export type OperatorSubmission = {
  id: string;
  project_name: string;
  operator_name: string;
  operator_type: string;
  country: string;
  sector: string;
  funding_cadence: string;
  funding_model: string;
  target_usd: number;
  summary: string;
  status: string;
  reviewer_notes: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type OperatorWorkspaceState =
  | { kind: "unconfigured"; submissions: [] }
  | { kind: "signed_out"; submissions: [] }
  | { kind: "error"; message: string; submissions: [] }
  | { kind: "ready"; submissions: OperatorSubmission[] };

export async function loadOperatorWorkspace(): Promise<OperatorWorkspaceState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { kind: "unconfigured", submissions: [] };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { kind: "signed_out", submissions: [] };

  const { data, error } = await supabase
    .from("project_submissions")
    .select(
      "id,project_name,operator_name,operator_type,country,sector,funding_cadence,funding_model,target_usd,summary,status,reviewer_notes,submitted_at,created_at,updated_at"
    )
    .eq("submitted_by", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    return { kind: "error", message: error.message, submissions: [] };
  }

  return {
    kind: "ready",
    submissions: (data ?? []) as OperatorSubmission[],
  };
}
