export type ProjectMilestone = {
  title: string;
  evidence: string;
  releasePercent: number;
};

export type InvestmentProject = {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  sector: string;
  operator: string;
  operatorType:
    "Individual" | "Company" | "Cooperative" | "Public-interest entity";
  fundingCadence: "One-time project" | "Continuous program";
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  targetUsd: number;
  fundedUsd: number;
  minimumUsd: number;
  revenueSharePercent: number;
  termMonths: number;
  riskGrade: "A" | "B" | "C";
  impactValue: string;
  impactLabel: string;
  verificationStatus: string;
  useOfFunds: string[];
  milestones: ProjectMilestone[];
  risks: string[];
};
