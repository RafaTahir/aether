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
  {
    id: "project-kh-001",
    slug: "mekong-water-access-network",
    name: "Mekong Water Access Network",
    city: "Kandal",
    country: "Cambodia",
    sector: "Water infrastructure",
    operator: "Sovan Community Water Alliance",
    operatorType: "Public-interest entity",
    fundingCadence: "Continuous program",
    fundingModel: "Grant",
    status: "Published",
    lastUpdated: "2026-08-10",
    summary:
      "Expand reliable, solar-powered water kiosks across river communities with local operators and transparent maintenance budgets.",
    description:
      "A fictional public-interest program supporting a network of community water kiosks, local maintenance teams, and household affordability monitoring across Kandal province.",
    image:
      "https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "A person collecting water near a river",
    targetUsd: 210000,
    fundedUsd: 75600,
    minimumUsd: 25,
    revenueSharePercent: 0,
    termMonths: 24,
    riskGrade: "C",
    impactValue: "42 villages",
    impactLabel: "in the program",
    verificationStatus: "Baseline review complete",
    updates: [
      {
        date: "2026-08-10",
        title: "Community sites shortlisted",
        body: "A fictional site survey shortlisted 42 villages using distance, water quality, and maintenance access criteria.",
      },
      {
        date: "2026-07-22",
        title: "Maintenance partners identified",
        body: "Local technicians and community committees were added to the operating plan for the first cohort.",
      },
    ],
    useOfFunds: [
      "Solar pump and filtration systems",
      "Community kiosk construction",
      "Local maintenance and affordability reserve",
    ],
    milestones: [
      {
        title: "Sites and water tests verified",
        evidence:
          "Site agreements, water-quality baselines, and construction plans reviewed by an independent partner.",
        releasePercent: 20,
      },
      {
        title: "First kiosk cohort operating",
        evidence:
          "Field inspection confirms safe operation, posted pricing, and trained local maintenance teams.",
        releasePercent: 55,
      },
      {
        title: "Affordability review complete",
        evidence:
          "Household access and operating-cost data reviewed before the next cohort is funded.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Flooding can damage sites and interrupt service.",
      "Maintenance quality depends on local operator capacity.",
      "This grant-style project does not produce investor revenue share.",
    ],
  },
  {
    id: "project-th-001",
    slug: "chiang-rai-agro-processing-hub",
    name: "Chiang Rai Agro-Processing Hub",
    city: "Chiang Rai",
    country: "Thailand",
    sector: "Food production",
    operator: "Northfield Foods Co.",
    operatorType: "Company",
    fundingCadence: "One-time project",
    fundingModel: "Revenue share",
    status: "Published",
    lastUpdated: "2026-08-06",
    summary:
      "Add small-batch drying and packaging capacity so regional growers can sell higher-value products closer to home.",
    description:
      "A fictional company expansion connecting local growers to a shared processing facility for dried fruit, herbs, and specialty grains. The project brief models distributions against verified gross revenue during the term.",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Fresh produce arranged on a wooden market table",
    targetUsd: 320000,
    fundedUsd: 137600,
    minimumUsd: 100,
    revenueSharePercent: 3.75,
    termMonths: 30,
    riskGrade: "B",
    impactValue: "160 growers",
    impactLabel: "with purchase access",
    verificationStatus: "Buyer pipeline reviewed",
    updates: [
      {
        date: "2026-08-06",
        title: "Buyer pipeline updated",
        body: "Three fictional regional buyers were added to the first-year operating forecast and diligence file.",
      },
      {
        date: "2026-07-19",
        title: "Equipment shortlist approved",
        body: "Drying, packaging, and quality-control equipment were compared against the proposed production plan.",
      },
    ],
    useOfFunds: [
      "Low-temperature drying and packaging line",
      "Food-safety certification and testing",
      "Grower onboarding and working inventory",
    ],
    milestones: [
      {
        title: "Facility lease and equipment ordered",
        evidence:
          "Lease, supplier checks, purchase orders, and insurance documentation reviewed.",
        releasePercent: 35,
      },
      {
        title: "First production batch accepted",
        evidence:
          "Quality testing and buyer acceptance confirm the first commercial batch.",
        releasePercent: 40,
      },
      {
        title: "Recurring orders live",
        evidence:
          "Three months of recurring wholesale orders and grower payments reconciled.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Crop quality and input prices can change margins.",
      "Buyer concentration may affect payment timing.",
      "Revenue rights and investor eligibility depend on jurisdiction-specific legal structure.",
    ],
  },
  {
    id: "project-my-001",
    slug: "sabah-community-microgrid",
    name: "Sabah Community Microgrid",
    city: "Kudat",
    country: "Malaysia",
    sector: "Clean infrastructure",
    operator: "Borneo Island Energy Cooperative",
    operatorType: "Cooperative",
    fundingCadence: "One-time project",
    fundingModel: "Grant",
    status: "In progress",
    lastUpdated: "2026-08-01",
    summary:
      "Build a solar and battery microgrid for a remote coastal community, with local technicians trained to operate it.",
    description:
      "A fictional cooperative-led infrastructure project combining grant capital, community contribution, and future service revenues to replace diesel generation for a remote coastal settlement.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Solar panels across a green landscape",
    targetUsd: 390000,
    fundedUsd: 156000,
    minimumUsd: 50,
    revenueSharePercent: 0,
    termMonths: 36,
    riskGrade: "B",
    impactValue: "12 clinics",
    impactLabel: "and public sites served",
    verificationStatus: "Site diligence complete",
    updates: [
      {
        date: "2026-08-01",
        title: "Load study completed",
        body: "A fictional engineering review mapped the community load profile and battery-sizing assumptions.",
      },
      {
        date: "2026-07-10",
        title: "Local technician cohort selected",
        body: "The cooperative nominated a first group for installation and maintenance training.",
      },
    ],
    useOfFunds: [
      "Solar generation and battery storage",
      "Distribution upgrades and site preparation",
      "Training, monitoring, and maintenance reserve",
    ],
    milestones: [
      {
        title: "Engineering and permits approved",
        evidence:
          "Load study, site access, safety plan, and local approvals reviewed by an independent engineer.",
        releasePercent: 20,
      },
      {
        title: "Microgrid commissioned",
        evidence:
          "Generation, storage, and distribution systems tested against the approved operating plan.",
        releasePercent: 60,
      },
      {
        title: "Operations handed to cooperative",
        evidence:
          "Trained technicians, monitoring access, and the maintenance reserve are documented.",
        releasePercent: 20,
      },
    ],
    risks: [
      "Weather and logistics can delay installation.",
      "Remote maintenance increases operating costs.",
      "This grant-style project does not produce investor revenue share.",
    ],
  },
  {
    id: "project-tl-001",
    slug: "dili-coastal-cold-storage",
    name: "Dili Coastal Cold Storage",
    city: "Dili",
    country: "Timor-Leste",
    sector: "Food logistics",
    operator: "Tasi Fresh Cooperative",
    operatorType: "Cooperative",
    fundingCadence: "One-time project",
    fundingModel: "Revenue share",
    status: "Published",
    lastUpdated: "2026-07-26",
    summary:
      "Reduce post-harvest loss for small fishing crews with solar-assisted cold storage and scheduled market delivery.",
    description:
      "A fictional cooperative project combining cold storage, basic processing, and scheduled delivery to urban buyers. Revenue comes from storage subscriptions and cooperative sales fees.",
    image:
      "https://images.unsplash.com/photo-1534256958597-7fe685cbd745?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Fishing boats on calm coastal water",
    targetUsd: 160000,
    fundedUsd: 64000,
    minimumUsd: 50,
    revenueSharePercent: 3,
    termMonths: 24,
    riskGrade: "C",
    impactValue: "48 crews",
    impactLabel: "with storage access",
    verificationStatus: "Operator review complete",
    updates: [
      {
        date: "2026-07-26",
        title: "Buyer route mapped",
        body: "The first delivery route and fictional buyer schedule were added to the operating plan.",
      },
    ],
    useOfFunds: [
      "Solar-assisted cold room and equipment",
      "Insulated transport and market crates",
      "Cooperative working capital and training",
    ],
    milestones: [
      {
        title: "Site and equipment verified",
        evidence:
          "Lease, equipment quotes, electrical plan, and insurance schedule reviewed.",
        releasePercent: 30,
      },
      {
        title: "Storage operations live",
        evidence:
          "Temperature testing, crew agreements, and first customer bookings completed.",
        releasePercent: 45,
      },
      {
        title: "Market route operating",
        evidence:
          "First recurring delivery cycle and cooperative sales records reconciled.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Storms and fuel costs can disrupt deliveries.",
      "Small buyer networks can create payment concentration.",
      "Revenue rights and investor eligibility depend on jurisdiction-specific legal structure.",
    ],
  },
  {
    id: "project-id-002",
    slug: "lombok-seaweed-processing",
    name: "Lombok Seaweed Processing Cooperative",
    city: "East Lombok",
    country: "Indonesia",
    sector: "Blue economy",
    operator: "Laut Biru Growers Cooperative",
    operatorType: "Cooperative",
    fundingCadence: "Continuous program",
    fundingModel: "Revenue share",
    status: "Published",
    lastUpdated: "2026-07-21",
    summary:
      "Help coastal growers move from raw seaweed sales to higher-value drying, grading, and ingredient preparation.",
    description:
      "A fictional continuous program funding shared drying racks, grading equipment, and quality training for a network of coastal seaweed growers.",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Tropical shoreline and blue water",
    targetUsd: 175000,
    fundedUsd: 70000,
    minimumUsd: 50,
    revenueSharePercent: 3.25,
    termMonths: 30,
    riskGrade: "B",
    impactValue: "260 growers",
    impactLabel: "in the network",
    verificationStatus: "Cooperative records reviewed",
    updates: [
      {
        date: "2026-07-21",
        title: "Grower records reconciled",
        body: "A fictional sampling of cooperative purchase records was reconciled against the first operating forecast.",
      },
      {
        date: "2026-07-04",
        title: "Quality partner added",
        body: "A regional ingredient buyer was added to the draft quality and purchase specification.",
      },
    ],
    useOfFunds: [
      "Shared drying and grading equipment",
      "Quality testing and grower training",
      "Working capital for seasonal purchasing",
    ],
    milestones: [
      {
        title: "Drying sites prepared",
        evidence:
          "Site agreements, equipment orders, and water-quality checks independently reviewed.",
        releasePercent: 25,
      },
      {
        title: "First quality batch accepted",
        evidence:
          "Buyer testing confirms the agreed moisture and grade specification.",
        releasePercent: 45,
      },
      {
        title: "Seasonal purchasing cycle complete",
        evidence:
          "Grower payments, batch records, and buyer invoices reconciled for one cycle.",
        releasePercent: 30,
      },
    ],
    risks: [
      "Weather and water conditions affect harvest volume.",
      "Commodity pricing can change the cooperative margin.",
      "Revenue rights and investor eligibility depend on jurisdiction-specific legal structure.",
    ],
  },
  {
    id: "project-ph-002",
    slug: "bohol-digital-learning-lab",
    name: "Bohol Digital Learning Lab",
    city: "Tagbilaran",
    country: "Philippines",
    sector: "Education and skills",
    operator: "Isla Skills Foundation",
    operatorType: "Public-interest entity",
    fundingCadence: "Continuous program",
    fundingModel: "Grant",
    status: "Published",
    lastUpdated: "2026-07-18",
    summary:
      "Create a local training and connectivity hub for young people building digital skills outside major urban centers.",
    description:
      "A fictional program combining a community learning space, reliable connectivity, and paid instructor cohorts for digital skills training.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Students collaborating around a table",
    targetUsd: 145000,
    fundedUsd: 52200,
    minimumUsd: 25,
    revenueSharePercent: 0,
    termMonths: 18,
    riskGrade: "B",
    impactValue: "600 learners",
    impactLabel: "targeted annually",
    verificationStatus: "Program design reviewed",
    updates: [
      {
        date: "2026-07-18",
        title: "Curriculum partners confirmed",
        body: "Three fictional training partners were added to the first-year curriculum plan.",
      },
    ],
    useOfFunds: [
      "Learning space and connectivity equipment",
      "Instructor stipends and curriculum delivery",
      "Learner access and monitoring reserve",
    ],
    milestones: [
      {
        title: "Space and equipment ready",
        evidence:
          "Lease, connectivity plan, equipment inventory, and safeguarding policy reviewed.",
        releasePercent: 30,
      },
      {
        title: "First learner cohort complete",
        evidence:
          "Attendance, course completion, and learner feedback records reviewed.",
        releasePercent: 45,
      },
      {
        title: "Employment pathway review",
        evidence:
          "Follow-up data and partner referrals assessed after the first cohort.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Instructor availability can affect course continuity.",
      "Connectivity outages may interrupt learning schedules.",
      "This grant-style project does not produce investor revenue share.",
    ],
  },
];
