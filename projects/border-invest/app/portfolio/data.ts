import { createSupabaseServerClient } from "../lib/supabase/server";

export type PortfolioState =
  | { kind: "unconfigured"; savedSlugs: []; applications: [] }
  | { kind: "signed_out"; savedSlugs: []; applications: [] }
  | { kind: "error"; message: string; savedSlugs: []; applications: [] }
  | {
      kind: "ready";
      savedSlugs: string[];
      applications: PortfolioApplication[];
    };

export type PortfolioApplication = {
  id: string;
  project_slug: string;
  source_id: string;
  source_name: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export async function loadPortfolioState(): Promise<PortfolioState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase)
    return { kind: "unconfigured", savedSlugs: [], applications: [] };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { kind: "signed_out", savedSlugs: [], applications: [] };

  const [savedResult, applicationsResult] = await Promise.all([
    supabase
      .from("saved_projects")
      .select("project_slug")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("funding_applications")
      .select("id,project_slug,source_id,status,created_at,updated_at")
      .eq("applicant_id", user.id)
      .order("updated_at", { ascending: false }),
  ]);
  if (savedResult.error) {
    return {
      kind: "error",
      message: savedResult.error.message,
      savedSlugs: [],
      applications: [],
    };
  }
  if (applicationsResult.error) {
    return {
      kind: "error",
      message: applicationsResult.error.message,
      savedSlugs: [],
      applications: [],
    };
  }

  const sourceIds = [
    ...new Set((applicationsResult.data ?? []).map((item) => item.source_id)),
  ];
  const sourceNames = new Map<string, string>();
  if (sourceIds.length > 0) {
    const { data: sources } = await supabase
      .from("funding_sources")
      .select("id,name")
      .in("id", sourceIds);
    for (const source of sources ?? []) sourceNames.set(source.id, source.name);
  }

  return {
    kind: "ready",
    savedSlugs: (savedResult.data ?? []).map((item) => item.project_slug),
    applications: (applicationsResult.data ?? []).map((application) => ({
      ...(application as Omit<PortfolioApplication, "source_name">),
      source_name:
        sourceNames.get(application.source_id) ?? application.source_id,
    })),
  };
}
