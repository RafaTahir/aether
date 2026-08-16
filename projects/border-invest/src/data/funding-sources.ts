import type { FundingSource } from "@/src/domain/funding";

export const fundingSources: FundingSource[] = [
  {
    id: "source-gef-sgp",
    name: "GEF Small Grants Programme",
    kind: "Multilateral grant",
    countries: ["Southeast Asia"],
    sectors: [
      "Clean infrastructure",
      "Coastal resilience",
      "Water infrastructure",
      "Blue economy",
    ],
    fundingModels: ["Grant"],
    operatorTypes: ["Public-interest entity"],
    fundingRange:
      "Usually US$25,000-US$50,000; maximum regular grant US$75,000",
    minUsd: 25000,
    maxUsd: 75000,
    stage: "Pilot",
    nextWindow: "Country call schedule varies",
    description:
      "UNDP's GEF Small Grants Programme provides direct support to eligible community-based and non-governmental organizations working in GEF focal areas.",
    eligibility:
      "National CBOs and NGOs in participating countries whose proposals align with the country strategy and GEF areas of work.",
    applicationMode: "Open call",
    officialUrl: "https://sgp.undp.org/",
    applicationUrl: "https://sgp.undp.org/about-us-157/how-to-apply.html",
    verificationStatus: "Official programme reference",
    reviewState: "published",
    lastVerified: "2026-08-16",
    sourceNotes:
      "The official page says country calls and national coordinators control the process. It also states that SGP does not charge a selection fee. Confirm country-level availability before applying.",
  },
  {
    id: "source-asean-foundation",
    name: "ASEAN Foundation Calls for Applications",
    kind: "Foundation grant",
    countries: ["Southeast Asia"],
    sectors: [
      "Education and skills",
      "Community health",
      "Circular manufacturing",
      "Coastal resilience",
      "Clean infrastructure",
    ],
    fundingModels: ["Grant"],
    operatorTypes: ["Company", "Cooperative", "Public-interest entity"],
    fundingRange: "Call-specific",
    stage: "Pilot",
    nextWindow: "Monitor official call page",
    description:
      "The ASEAN Foundation publishes periodic calls and programmes across education, community building, environment, media, and business-community engagement.",
    eligibility:
      "Varies by programme. Calls may target civil-society organizations, social enterprises, MSMEs, youth, or regional partners.",
    applicationMode: "Open call",
    officialUrl: "https://aseanfoundation.org/",
    applicationUrl: "https://aseanfoundation.org/call-for-applications/",
    verificationStatus: "Official call directory; availability varies",
    reviewState: "published",
    lastVerified: "2026-08-16",
    sourceNotes:
      "The current official call page lists programme-specific deadlines and also marks several recent calls closed. Aether must re-check each call before presenting it as active.",
  },
  {
    id: "source-global-innovation-fund",
    name: "Global Innovation Fund",
    kind: "Impact fund",
    countries: ["Southeast Asia"],
    sectors: [
      "Food production",
      "Education and skills",
      "Community health",
      "Clean infrastructure",
      "Coastal resilience",
    ],
    fundingModels: ["Grant", "Debt", "Equity"],
    operatorTypes: ["Company", "Cooperative"],
    fundingRange: "Stage and instrument dependent",
    stage: "Growth",
    nextWindow: "Partner process varies",
    description:
      "Global Innovation Fund describes a flexible-capital approach using grants, equity, and debt to scale innovations across Africa and Asia.",
    eligibility:
      "High-potential innovations with evidence of impact, a pathway to scale, and fit with climate resilience or inclusive economic opportunity themes.",
    applicationMode: "Partner referral",
    officialUrl: "https://www.globalinnovation.fund/",
    applicationUrl: "https://www.globalinnovation.fund/partnerships",
    verificationStatus: "Official programme reference",
    reviewState: "published",
    lastVerified: "2026-08-16",
    sourceNotes:
      "The official site describes the fund's strategy and instruments but does not guarantee an open application window for every project. Do not represent a match as an invitation to apply.",
  },
  {
    id: "source-globalgiving",
    name: "GlobalGiving Pathway",
    kind: "Philanthropy platform",
    countries: ["Southeast Asia"],
    sectors: ["All sectors"],
    fundingModels: ["Grant"],
    operatorTypes: ["Public-interest entity"],
    fundingRange: "Campaign dependent",
    stage: "Pilot",
    nextWindow: "Cohort intake varies",
    description:
      "GlobalGiving connects vetted nonprofit projects with donors and companies, and provides a pathway to become a fundraising partner.",
    eligibility:
      "Nonprofit organizations must complete the pathway and due-diligence process; participation is not automatic after the interest survey.",
    applicationMode: "Partner referral",
    officialUrl: "https://www.globalgiving.org/",
    applicationUrl: "https://www.globalgiving.org/apply/",
    verificationStatus: "Official platform reference",
    reviewState: "published",
    lastVerified: "2026-08-16",
    sourceNotes:
      "GlobalGiving's official pages describe cohort-based intake and due diligence. Its fee page states that donation support and processing fees apply. Confirm current partner terms.",
  },
];
