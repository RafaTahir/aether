import type { InvestmentProject } from "@/src/domain/project";

export const projects: InvestmentProject[] = [
  {
    id: "project-ph-001",
    slug: "central-luzon-solar-irrigation",
    name: "Central Luzon Solar Irrigation Network",
    city: "Nueva Ecija",
    country: "Philippines",
    sector: "Clean infrastructure",
    operator: "Agos Rural Energy Cooperative",
    operatorType: "Cooperative",
    fundingCadence: "One-time project",
    fundingModel: "Revenue share",
    status: "Published",
    lastUpdated: "2026-08-12",
    summary:
      "Replace diesel irrigation pumps with a shared solar network serving six rice-farming cooperatives.",
    description:
      "A fictional one-time infrastructure project designed to install shared solar pumps, metering, and maintenance capacity across six agricultural cooperatives. Project revenue would come from lower-cost irrigation service fees paid by participating farms.",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Rows of solar panels under a clear sky",
    targetUsd: 480000,
    fundedUsd: 326400,
    minimumUsd: 100,
    revenueSharePercent: 4.25,
    termMonths: 36,
    riskGrade: "B",
    impactValue: "420 ha",
    impactLabel: "farmland served",
    verificationStatus: "Diligence review complete",
    updates: [
      {
        date: "2026-08-12",
        title: "Engineering review completed",
        body: "Site plans and the preliminary equipment schedule were reviewed for the six proposed pump sites.",
      },
      {
        date: "2026-07-28",
        title: "Cooperative agreements collected",
        body: "All six participating cooperatives submitted signed participation agreements for the demo brief.",
      },
    ],
    useOfFunds: [
      "Six solar pump and battery systems",
      "Metering, installation, and grid works",
      "Three-year maintenance reserve",
    ],
    milestones: [
      {
        title: "Sites and permits verified",
        evidence:
          "Land-use agreements, engineering plans, and local permits reviewed by an independent project engineer.",
        releasePercent: 20,
      },
      {
        title: "Systems commissioned",
        evidence:
          "Performance testing confirms pumping capacity and safe electrical installation at all six sites.",
        releasePercent: 60,
      },
      {
        title: "Operations transferred",
        evidence:
          "Local technicians trained and maintenance reserve funded before final handover.",
        releasePercent: 20,
      },
    ],
    risks: [
      "Equipment and permitting delays can postpone service revenue.",
      "Weather variability can change irrigation demand.",
      "Local-currency revenue may create exchange-rate exposure for foreign investors.",
    ],
  },
  {
    id: "project-id-001",
    slug: "sulawesi-mangrove-recovery",
    name: "Sulawesi Mangrove Recovery Program",
    city: "South Sulawesi",
    country: "Indonesia",
    sector: "Coastal resilience",
    operator: "Pesisir Lestari Foundation",
    operatorType: "Public-interest entity",
    fundingCadence: "Continuous program",
    fundingModel: "Grant",
    status: "In progress",
    lastUpdated: "2026-08-08",
    summary:
      "Restore working mangrove coastlines while funding local nurseries and long-term monitoring teams.",
    description:
      "A fictional continuous program combining shoreline restoration contracts, local seedling nurseries, and five years of survival monitoring. Funding rounds support defined restoration cohorts rather than an open-ended treasury.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Dense green forest canopy viewed from above",
    targetUsd: 260000,
    fundedUsd: 119600,
    minimumUsd: 50,
    revenueSharePercent: 0,
    termMonths: 24,
    riskGrade: "B",
    impactValue: "85 ha",
    impactLabel: "coastline restored",
    verificationStatus: "Field evidence verified",
    updates: [
      {
        date: "2026-08-08",
        title: "First cohort mapped",
        body: "The initial restoration cohort and monitoring points were added to the field plan.",
      },
      {
        date: "2026-07-15",
        title: "Nursery partners confirmed",
        body: "Two local nurseries were added to the fictional delivery network for the first planting period.",
      },
    ],
    useOfFunds: [
      "Community seedling nurseries",
      "Restoration labor and transport",
      "Five-year survival monitoring",
    ],
    milestones: [
      {
        title: "Baseline mapped",
        evidence:
          "Geotagged shoreline survey and planting plan independently reviewed.",
        releasePercent: 15,
      },
      {
        title: "Planting cohort complete",
        evidence:
          "Field inspection verifies density, species mix, and paid local labor records.",
        releasePercent: 60,
      },
      {
        title: "First survival audit",
        evidence:
          "Six-month sample confirms agreed seedling survival threshold.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Storms can damage restoration sites.",
      "Seedling survival varies by site conditions.",
      "This grant-style project does not produce investor revenue share.",
    ],
  },
  {
    id: "project-la-001",
    slug: "luang-prabang-mobile-clinic",
    name: "Luang Prabang Mobile Clinic Route",
    city: "Luang Prabang",
    country: "Laos",
    sector: "Community health",
    operator: "Dr. Mali Vongsa",
    operatorType: "Individual",
    fundingCadence: "Continuous program",
    fundingModel: "Grant",
    status: "Published",
    lastUpdated: "2026-08-03",
    summary:
      "Extend scheduled maternal and primary-care visits to remote villages through a locally operated mobile clinic.",
    description:
      "A fictional clinician-led program funding a mobile care vehicle, diagnostic equipment, and recurring rural routes. Each round covers a published service period with route and patient-volume evidence.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Healthcare professional reviewing patient information",
    targetUsd: 125000,
    fundedUsd: 43750,
    minimumUsd: 25,
    revenueSharePercent: 0,
    termMonths: 18,
    riskGrade: "C",
    impactValue: "18 villages",
    impactLabel: "on the first route",
    verificationStatus: "Operator review complete",
    updates: [
      {
        date: "2026-08-03",
        title: "Route plan reviewed",
        body: "The first 18-village route plan was reviewed against the fictional vehicle and staffing schedule.",
      },
    ],
    useOfFunds: [
      "Mobile clinic vehicle and fit-out",
      "Portable diagnostic equipment",
      "First 18 months of route operations",
    ],
    milestones: [
      {
        title: "Vehicle and licenses ready",
        evidence:
          "Vehicle title, medical licenses, insurance, and route approvals verified.",
        releasePercent: 40,
      },
      {
        title: "First six routes delivered",
        evidence:
          "Anonymized service counts and route logs reviewed by a health partner.",
        releasePercent: 35,
      },
      {
        title: "Twelve-month review",
        evidence:
          "Service continuity, referral outcomes, and operating budget independently assessed.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Clinical staffing may interrupt scheduled routes.",
      "Road access changes seasonally.",
      "This grant-style project does not produce investor revenue share.",
    ],
  },
  {
    id: "project-vn-001",
    slug: "da-nang-circular-textiles",
    name: "Da Nang Circular Textile Expansion",
    city: "Da Nang",
    country: "Vietnam",
    sector: "Circular manufacturing",
    operator: "Lantern Works Ltd.",
    operatorType: "Company",
    fundingCadence: "One-time project",
    fundingModel: "Revenue share",
    status: "Published",
    lastUpdated: "2026-07-30",
    summary:
      "Add recycled-fiber cutting and quality-control capacity for contracted hospitality uniform orders.",
    description:
      "A fictional manufacturing expansion tied to existing regional buyer contracts. Capital would finance equipment, certification, and working inventory, with distributions linked to verified gross revenue during the term.",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Colorful textiles arranged in a workshop",
    targetUsd: 195000,
    fundedUsd: 91650,
    minimumUsd: 100,
    revenueSharePercent: 3.5,
    termMonths: 30,
    riskGrade: "B",
    impactValue: "34 roles",
    impactLabel: "retained or created",
    verificationStatus: "Buyer contracts reviewed",
    updates: [
      {
        date: "2026-07-30",
        title: "Buyer sample accepted",
        body: "A fictional hospitality buyer accepted the first recycled-fiber uniform sample for the project brief.",
      },
      {
        date: "2026-07-11",
        title: "Supplier diligence added",
        body: "The equipment supplier and delivery schedule were added to the review record.",
      },
    ],
    useOfFunds: [
      "Automated cutting equipment",
      "Recycled-fiber inventory",
      "Quality certification and operator training",
    ],
    milestones: [
      {
        title: "Equipment purchased",
        evidence:
          "Supplier diligence, invoice, and insured delivery schedule verified.",
        releasePercent: 35,
      },
      {
        title: "Production qualified",
        evidence: "Quality audit and accepted customer sample run completed.",
        releasePercent: 40,
      },
      {
        title: "Commercial delivery",
        evidence: "First contracted production order accepted by the buyer.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Input prices can reduce operating margins.",
      "Buyer concentration can affect payment timing.",
      "Revenue rights and investor eligibility depend on jurisdiction-specific legal structure.",
    ],
  },
];
