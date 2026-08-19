"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export type ProjectSubmissionStatus = "draft" | "submitted";

export type ProjectSubmissionInput = {
  projectName: string;
  operatorName: string;
  operatorType: string;
  country: string;
  sector: string;
  fundingCadence: string;
  fundingModel: string;
  targetUsd: string;
  summary: string;
  termsAccepted: boolean;
};

const MAX_TEXT_LENGTH = 240;
const MAX_SUMMARY_LENGTH = 4000;

export async function createProjectSubmission(
  input: ProjectSubmissionInput,
  status: ProjectSubmissionStatus
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return {
      ok: false as const,
      error:
        "Aether intake is not configured. Add the Supabase settings first.",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      ok: false as const,
      error: "Sign in before saving or submitting a project room.",
    };
  }

  const validationError = validateInput(input);
  if (validationError) return { ok: false as const, error: validationError };

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("project_submissions")
    .insert({
      submitted_by: user.id,
      project_name: input.projectName.trim(),
      operator_name: input.operatorName.trim(),
      operator_type: input.operatorType,
      country: input.country,
      sector: input.sector,
      funding_cadence: input.fundingCadence,
      funding_model: input.fundingModel,
      target_usd: Number(input.targetUsd),
      summary: input.summary.trim(),
      status,
      submitted_at: status === "submitted" ? now : null,
      terms_accepted_at: now,
      terms_version: "pilot-intake-2026-08-19",
      updated_at: now,
    })
    .select("id,status,created_at")
    .single();

  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/operator");
  revalidatePath("/projects/submit");
  return { ok: true as const, submission: data };
}

function validateInput(input: ProjectSubmissionInput) {
  const requiredFields = [
    ["project name", input.projectName],
    ["operator name", input.operatorName],
    ["country", input.country],
    ["sector", input.sector],
    ["funding cadence", input.fundingCadence],
    ["funding model", input.fundingModel],
    ["summary", input.summary],
  ] as const;

  const missing = requiredFields.find(([, value]) => !value.trim());
  if (missing) return `Add a ${missing[0]}.`;
  if (!input.termsAccepted) {
    return "Accept the pilot intake terms before continuing.";
  }

  if (input.projectName.trim().length > MAX_TEXT_LENGTH) {
    return "Project name is too long.";
  }
  if (input.operatorName.trim().length > MAX_TEXT_LENGTH) {
    return "Operator name is too long.";
  }
  if (input.summary.trim().length > MAX_SUMMARY_LENGTH) {
    return "Project summary is too long.";
  }

  const targetUsd = Number(input.targetUsd);
  if (!Number.isFinite(targetUsd) || targetUsd <= 0) {
    return "Enter a funding target greater than zero.";
  }

  return null;
}
