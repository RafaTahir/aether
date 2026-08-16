import type { FundingMatch, FundingSource } from "@/src/domain/funding";
import type { InvestmentProject } from "@/src/domain/project";

export function matchFundingSources(
  project: InvestmentProject,
  sources: FundingSource[]
): FundingMatch[] {
  return sources
    .map((source) => {
      let score = 0;
      const reasons: string[] = [];
      const regional = source.countries.includes("Southeast Asia");

      if (source.countries.includes(project.country)) {
        score += 40;
        reasons.push(`Available in ${project.country}`);
      } else if (regional) {
        score += 25;
        reasons.push("Regional Southeast Asia scope");
      }
      if (source.sectors.includes(project.sector)) {
        score += 25;
        reasons.push(`${project.sector} focus`);
      } else if (source.sectors.includes("All sectors")) {
        score += 15;
        reasons.push("Open sector mandate");
      }
      if (source.fundingModels.includes(project.fundingModel)) {
        score += 20;
        reasons.push(`${project.fundingModel} compatible`);
      }
      if (source.operatorTypes.includes(project.operatorType)) {
        score += 10;
        reasons.push(`${project.operatorType} eligible`);
      }
      if (
        project.targetUsd >= source.minUsd &&
        project.targetUsd <= source.maxUsd
      ) {
        score += 5;
        reasons.push("Target fits stated range");
      }

      return { source, score: Math.min(score, 100), reasons };
    })
    .filter((match) => match.score >= 40)
    .sort((a, b) => b.score - a.score);
}
