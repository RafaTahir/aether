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
        body: "All six participating cooperatives submitted signed participation agreements for the project brief.",
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

  {
    id: "project-mm-001",
    slug: "ayeyarwady-rice-mill-modernization",
    name: "Ayeyarwady Delta Rice Mill Modernization",
    city: "Pathein",
    country: "Myanmar",
    sector: "Food production",
    operator: "Delta Grain Producers Cooperative",
    operatorType: "Cooperative",
    fundingCadence: "One-time project",
    fundingModel: "Debt",
    status: "In progress",
    lastUpdated: "2026-08-30",
    summary:
      "Replace a diesel-powered rice mill with electric hullers and dryers serving 1,800 tonnes of paddy a year.",
    description:
      "A fictional one-time equipment project designed to upgrade milling capacity, drying, and storage for a delta cooperative, repaid from mill service margins.",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Harvested rice grains being dried in the sun",
    targetUsd: 260000,
    fundedUsd: 117000,
    minimumUsd: 100,
    revenueSharePercent: 5.5,
    termMonths: 48,
    riskGrade: "C",
    impactValue: "1,800 t",
    impactLabel: "paddy processed annually",
    verificationStatus: "Diligence in progress",
    updates: [
      {
        date: "2026-08-30",
        title: "Equipment quotations collected",
        body: "Two huller suppliers and one dryer vendor submitted quotations for the cooperative's review.",
      },
      {
        date: "2026-07-14",
        title: "Site assessment finished",
        body: "Electrical supply, floor loading, and drainage at the existing mill were assessed for the upgrade.",
      },
    ],
    useOfFunds: [
      "Electric hullers and continuous dryer",
      "Installation, wiring, and standby generator",
      "Working capital and maintenance reserve",
    ],
    milestones: [
      {
        title: "Equipment procured",
        evidence: "Signed purchase contracts and delivery schedules reviewed by the lending agent.",
        releasePercent: 40,
      },
      {
        title: "Mill commissioned",
        evidence: "Throughput and moisture testing confirm nameplate capacity at the upgraded mill.",
        releasePercent: 60,
      },
    ],
    risks: [
      "Grid outages may require generator running hours and raise costs.",
      "Paddy volumes vary seasonally with weather conditions.",
      "Debt repayment depends on sustained mill service demand.",
    ],
  },
  {
    id: "project-vn-002",
    slug: "hue-artisan-craft-ecommerce",
    name: "Hue Artisan Craft E-commerce Collective",
    city: "Hue",
    country: "Vietnam",
    sector: "Education and skills",
    operator: "Truong Son Craft Guild",
    operatorType: "Company",
    fundingCadence: "Continuous program",
    fundingModel: "Revenue share",
    status: "Published",
    lastUpdated: "2026-09-01",
    summary:
      "Build a shared storefront, product photography, and logistics pipeline for 65 artisan households in central Vietnam.",
    description:
      "A fictional continuous program providing craft households with a common e-commerce operation, paid training cohorts, and shared fulfillment revenue.",
    image:
      "https://images.unsplash.com/photo-1524293581917-878a6d017c71?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Handmade textiles and craft goods arranged on a table",
    targetUsd: 120000,
    fundedUsd: 84000,
    minimumUsd: 50,
    revenueSharePercent: 3.75,
    termMonths: 30,
    riskGrade: "A",
    impactValue: "65",
    impactLabel: "artisan households",
    verificationStatus: "Diligence review complete",
    updates: [
      {
        date: "2026-09-01",
        title: "First storefront cohort onboarded",
        body: "Twenty-two artisan households completed product listing and photography training.",
      },
    ],
    useOfFunds: [
      "Storefront platform and product photography studio",
      "Logistics packaging and export compliance",
      "Artisan training stipends",
    ],
    milestones: [
      {
        title: "Shared storefront live",
        evidence: "Platform launch and payment reconciliation records reviewed.",
        releasePercent: 35,
      },
      {
        title: "Export pipeline certified",
        evidence: "Customs and packaging compliance audit completed for the fulfillment lane.",
        releasePercent: 35,
      },
      {
        title: "Steady-state operations",
        evidence: "Six months of order flow and payout records meet the program baseline.",
        releasePercent: 30,
      },
    ],
    risks: [
      "Consumer demand for craft goods can shift with tourism trends.",
      "Shared margin depends on consistent order volume per household.",
    ],
  },
  {
    id: "project-id-003",
    slug: "flores-island-micro-hydro-grid",
    name: "Flores Island Micro-Hydro Grid",
    city: "Ende",
    country: "Indonesia",
    sector: "Clean infrastructure",
    operator: "Nusa Tenggara Energy Alliance",
    operatorType: "Public-interest entity",
    fundingCadence: "One-time project",
    fundingModel: "Revenue share",
    status: "Published",
    lastUpdated: "2026-08-22",
    summary:
      "Install a run-of-river micro-hydro plant and village distribution grid bringing first-time power to 950 households.",
    description:
      "A fictional one-time infrastructure project designed to build a community-owned micro-hydro plant with metered household connections and a maintenance crew.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Small river channel flowing through green hills",
    targetUsd: 540000,
    fundedUsd: 162000,
    minimumUsd: 100,
    revenueSharePercent: 4.0,
    termMonths: 60,
    riskGrade: "B",
    impactValue: "950",
    impactLabel: "households electrified",
    verificationStatus: "Diligence review complete",
    updates: [
      {
        date: "2026-08-22",
        title: "Flow study validated",
        body: "Dry-season flow measurements confirmed the turbine specification for the selected river intake.",
      },
      {
        date: "2026-06-30",
        title: "Community land agreements signed",
        body: "Village councils along the penstock route signed land-use and maintenance agreements.",
      },
    ],
    useOfFunds: [
      "Turbine, penstock, and powerhouse civil works",
      "Village distribution grid and metering",
      "Operator training and two-year maintenance fund",
    ],
    milestones: [
      {
        title: "Civil works complete",
        evidence: "Intake, channel, and powerhouse construction inspected against engineering drawings.",
        releasePercent: 45,
      },
      {
        title: "Grid energized",
        evidence: "Phase-to-phase testing and meter installation verified across connected villages.",
        releasePercent: 35,
      },
      {
        title: "Operator handover",
        evidence: "Trained local crew passes an independent operations readiness review.",
        releasePercent: 20,
      },
    ],
    risks: [
      "Extended dry seasons can reduce generation below projections.",
      "Remote logistics raise spare-part lead times.",
      "Tariff collection depends on sustained community participation.",
    ],
  },
  {
    id: "project-kh-002",
    slug: "tonle-sap-floating-health-posts",
    name: "Tonle Sap Floating Health Posts",
    city: "Siem Reap",
    country: "Cambodia",
    sector: "Community health",
    operator: "Mekong Health Trust",
    operatorType: "Public-interest entity",
    fundingCadence: "Continuous program",
    fundingModel: "Grant",
    status: "In progress",
    lastUpdated: "2026-08-27",
    summary:
      "Operate three floating clinics delivering primary care and maternal checkups to lake villages year-round.",
    description:
      "A fictional grant-funded program running seasonal-safe floating clinics, community health worker networks, and patient referral transport on the lake.",
    image:
      "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Stilt houses above the water of a lake village",
    targetUsd: 310000,
    fundedUsd: 263500,
    minimumUsd: 25,
    revenueSharePercent: 0,
    termMonths: 24,
    riskGrade: "B",
    impactValue: "14,000",
    impactLabel: "consultations per year",
    verificationStatus: "Diligence review complete",
    updates: [
      {
        date: "2026-08-27",
        title: "Second clinic boat refitted",
        body: "The refitted clinic boat passed marine safety inspection and entered weekly service rotations.",
      },
      {
        date: "2026-07-05",
        title: "Referral network expanded",
        body: "Two provincial hospitals agreed to fast-track referrals from the floating posts.",
      },
    ],
    useOfFunds: [
      "Clinic boat refits and medical equipment",
      "Staff salaries and medicine supply",
      "Referral transport and cold chain",
    ],
    milestones: [
      {
        title: "All posts in service",
        evidence: "Service logs show each post operating its scheduled weekly rotation.",
        releasePercent: 50,
      },
      {
        title: "Quality review passed",
        evidence: "Independent clinical audit confirms care standards and stock management.",
        releasePercent: 50,
      },
    ],
    risks: [
      "Lake levels can restrict boat access in the dry season.",
      "Grant-funded care produces no investor revenue share.",
      "Staffing rural posts requires competitive retention packages.",
    ],
  },
  {
    id: "project-th-002",
    slug: "isaan-agroforestry-resilience",
    name: "Isaan Drought-Resilient Agroforestry",
    city: "Khon Kaen",
    country: "Thailand",
    sector: "Food production",
    operator: "Northeast Farming Collective",
    operatorType: "Cooperative",
    fundingCadence: "One-time project",
    fundingModel: "Equity",
    status: "Published",
    lastUpdated: "2026-08-15",
    summary:
      "Convert 300 hectares of rain-fed plots to drought-resilient agroforestry with drip irrigation and native hardwood shade.",
    description:
      "A fictional one-time land-conversion project designed to establish mixed fruit, timber, and cash-crop agroforestry plots managed by a farmer cooperative.",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Rows of young trees planted across farmland",
    targetUsd: 620000,
    fundedUsd: 124000,
    minimumUsd: 250,
    revenueSharePercent: 0,
    termMonths: 60,
    riskGrade: "C",
    impactValue: "300 ha",
    impactLabel: "agroforestry plots",
    verificationStatus: "Diligence in progress",
    updates: [
      {
        date: "2026-08-15",
        title: "Nursery contracts signed",
        body: "Two native-species nurseries contracted to supply seedlings for the first 120 hectares.",
      },
    ],
    useOfFunds: [
      "Seedlings, irrigation, and land preparation",
      "Farmer training and agronomy support",
      "Five-year maintenance and monitoring reserve",
    ],
    milestones: [
      {
        title: "First 150 ha planted",
        evidence: "Planting density and species-mix surveys verified by the agronomist.",
        releasePercent: 40,
      },
      {
        title: "Survival threshold met",
        evidence: "Year-one survival rates above 85 percent confirmed by field audit.",
        releasePercent: 35,
      },
      {
        title: "Harvest contracts in place",
        evidence: "Offtake agreements cover the projected fruit and timber harvest.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Agroforestry returns mature slowly over multiple seasons.",
      "Drought years can reduce seedling survival despite irrigation.",
      "Equity value depends on long-term offtake pricing.",
    ],
  },
  {
    id: "project-ph-003",
    slug: "palawan-coral-restoration-dive-economy",
    name: "Palawan Coral-Restoration Dive Economy",
    city: "Puerto Princesa",
    country: "Philippines",
    sector: "Blue economy",
    operator: "Coron Reef Stewards",
    operatorType: "Company",
    fundingCadence: "Continuous program",
    fundingModel: "Revenue share",
    status: "Published",
    lastUpdated: "2026-08-19",
    summary:
      "Restore 12 hectares of damaged reef while training fisher-operators for a low-impact dive tourism business.",
    description:
      "A fictional continuous program pairing coral nursery restoration with a community dive-operation venture sharing tourism revenue with funders.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Clear turquoise water over a shallow coral reef",
    targetUsd: 180000,
    fundedUsd: 99000,
    minimumUsd: 100,
    revenueSharePercent: 4.5,
    termMonths: 36,
    riskGrade: "B",
    impactValue: "12 ha",
    impactLabel: "reef under restoration",
    verificationStatus: "Diligence review complete",
    updates: [
      {
        date: "2026-08-19",
        title: "Nursery structures deployed",
        body: "Twenty coral nursery tables were anchored across the two restoration sites.",
      },
    ],
    useOfFunds: [
      "Coral nursery tables and dive safety equipment",
      "Fisher-operator PADI training and certification",
      "Monitoring surveys and mooring maintenance",
    ],
    milestones: [
      {
        title: "Nursery sites established",
        evidence: "Underwater survey confirms nursery placement and coral fragment health.",
        releasePercent: 40,
      },
      {
        title: "Dive operation licensed",
        evidence: "Coastal permits, safety certification, and insurance filings reviewed.",
        releasePercent: 35,
      },
      {
        title: "Revenue operations steady",
        evidence: "Two quarters of dive revenue and reef monitoring reports reviewed.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Typhoon seasons can damage nursery structures and dive schedules.",
      "Tourism demand fluctuates with travel conditions.",
      "Reef outcomes depend on long-term mooring and anchor discipline.",
    ],
  },
  {
    id: "project-my-002",
    slug: "penang-e-waste-recovery",
    name: "Penang E-Waste Recovery Facility",
    city: "Butterworth",
    country: "Malaysia",
    sector: "Circular manufacturing",
    operator: "Penang Cycle Works",
    operatorType: "Company",
    fundingCadence: "One-time project",
    fundingModel: "Debt",
    status: "Published",
    lastUpdated: "2026-08-25",
    summary:
      "Commission a facility diverting 2,400 tonnes of household e-waste a year into certified component recovery.",
    description:
      "A fictional one-time industrial project designed to fit out a licensed e-waste sorting and recovery line with take-back partnerships across northern Malaysia.",
    image:
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Sorted circuit boards and electronic components",
    targetUsd: 450000,
    fundedUsd: 270000,
    minimumUsd: 200,
    revenueSharePercent: 6.0,
    termMonths: 42,
    riskGrade: "A",
    impactValue: "2,400 t",
    impactLabel: "e-waste diverted yearly",
    verificationStatus: "Diligence review complete",
    updates: [
      {
        date: "2026-08-25",
        title: "Take-back partnerships signed",
        body: "Five municipal collection points agreed to feed the facility's intake schedule.",
      },
      {
        date: "2026-07-11",
        title: "Environmental permit issued",
        body: "The state environmental agency issued the facility's operating permit for component recovery.",
      },
    ],
    useOfFunds: [
      "Sorting line and recovery equipment",
      "Facility fit-out and safety systems",
      "Collection logistics and working capital",
    ],
    milestones: [
      {
        title: "Line installed",
        evidence: "Installation certificates and safety commissioning reports reviewed.",
        releasePercent: 45,
      },
      {
        title: "Throughput certified",
        evidence: "Thirty-day ramp log confirms contracted processing volumes.",
        releasePercent: 30,
      },
      {
        title: "Debt service on track",
        evidence: "First two quarterly repayment milestones met from facility revenue.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Recovered commodity prices fluctuate with global markets.",
      "Feedstock volume depends on municipal collection consistency.",
      "Regulatory changes could alter licensed processing scopes.",
    ],
  },
  {
    id: "project-tl-002",
    slug: "timor-coastal-fisher-cold-chain",
    name: "Timor-Leste Coastal Fisher Cold Chain",
    city: "Atauro",
    country: "Timor-Leste",
    sector: "Food logistics",
    operator: "Rai Boot Fisher Alliance",
    operatorType: "Cooperative",
    fundingCadence: "One-time project",
    fundingModel: "Grant",
    status: "Published",
    lastUpdated: "2026-08-08",
    summary:
      "Give 480 fishing families solar ice-making, insulated boxes, and a landing-site cold room to cut post-catch losses.",
    description:
      "A fictional grant-funded infrastructure project designed to install solar icemakers and cold storage at two landing sites with cooperative-managed operations.",
    image:
      "https://images.unsplash.com/photo-1601948462966-fa28a4638d93?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Wooden fishing boats moored near a small port",
    targetUsd: 210000,
    fundedUsd: 84000,
    minimumUsd: 50,
    revenueSharePercent: 0,
    termMonths: 30,
    riskGrade: "C",
    impactValue: "480",
    impactLabel: "fishing families served",
    verificationStatus: "Diligence in progress",
    updates: [
      {
        date: "2026-08-08",
        title: "Landing sites surveyed",
        body: "Both landing sites completed solar, water, and access surveys for the cold-room install.",
      },
    ],
    useOfFunds: [
      "Solar icemakers and cold room construction",
      "Insulated boxes and handling training",
      "Cooperative operations reserve",
    ],
    milestones: [
      {
        title: "Cold rooms operational",
        evidence: "Temperature logs and commissioning reports verified at both sites.",
        releasePercent: 55,
      },
      {
        title: "Cooperative management certified",
        evidence: "Operations, hygiene, and revenue bookkeeping review passed.",
        releasePercent: 45,
      },
    ],
    risks: [
      "Remote logistics can delay equipment servicing.",
      "Grant-funded infrastructure produces no investor revenue share.",
      "Ice demand varies with seasonal catch volumes.",
    ],
  },
  {
    id: "project-la-002",
    slug: "vientiane-digital-literacy-vans",
    name: "Vientiane Digital Literacy Vans",
    city: "Vientiane",
    country: "Laos",
    sector: "Education and skills",
    operator: "Mekong Learning Caravan",
    operatorType: "Public-interest entity",
    fundingCadence: "Continuous program",
    fundingModel: "Grant",
    status: "Published",
    lastUpdated: "2026-09-03",
    summary:
      "Run mobile classrooms bringing digital literacy training to 5,200 learners across provincial districts.",
    description:
      "A fictional grant-funded program operating two mobile classroom vans with satellite connectivity, instructor rotations, and district scheduling.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Laptop-based mobile classroom setup",
    targetUsd: 95000,
    fundedUsd: 85500,
    minimumUsd: 25,
    revenueSharePercent: 0,
    termMonths: 18,
    riskGrade: "A",
    impactValue: "5,200",
    impactLabel: "learners reached",
    verificationStatus: "Diligence review complete",
    updates: [
      {
        date: "2026-09-03",
        title: "District schedule published",
        body: "Eight provincial districts confirmed term-time visit schedules for the coming year.",
      },
      {
        date: "2026-07-21",
        title: "Second van outfitted",
        body: "The second mobile classroom passed connectivity testing with satellite backup.",
      },
    ],
    useOfFunds: [
      "Van outfitting and satellite connectivity",
      "Instructor salaries and curriculum",
      "Fuel, maintenance, and monitoring",
    ],
    milestones: [
      {
        title: "Both vans in rotation",
        evidence: "Visit logs confirm weekly sessions across the published district schedule.",
        releasePercent: 50,
      },
      {
        title: "Completion audit passed",
        evidence: "Learner completion and assessment data reviewed by the program auditor.",
        releasePercent: 50,
      },
    ],
    risks: [
      "Road access can be seasonal in rural districts.",
      "Grant-funded training produces no investor revenue share.",
    ],
  },
  {
    id: "project-sg-001",
    slug: "singapore-vertical-farming-pilot",
    name: "Singapore Urban Vertical Farming Pilot",
    city: "Singapore",
    country: "Singapore",
    sector: "Food production",
    operator: "SkyPod Farms",
    operatorType: "Company",
    fundingCadence: "One-time project",
    fundingModel: "Equity",
    status: "Published",
    lastUpdated: "2026-08-11",
    summary:
      "Fit out a 2,000 m2 vertical farm growing 110 tonnes of leafy greens annually under offtake contracts.",
    description:
      "A fictional one-time pilot designed to equip an urban vertical farming facility with LED hydroponics and contracted grocery offtake.",
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Indoor vertical farming racks under grow lights",
    targetUsd: 780000,
    fundedUsd: 117000,
    minimumUsd: 500,
    revenueSharePercent: 0,
    termMonths: 48,
    riskGrade: "B",
    impactValue: "110 t",
    impactLabel: "leafy greens annually",
    verificationStatus: "Diligence in progress",
    updates: [
      {
        date: "2026-08-11",
        title: "Offtake term sheet signed",
        body: "A grocery chain signed a term sheet covering 70 percent of planned production.",
      },
    ],
    useOfFunds: [
      "Racking, LED, and hydroponic systems",
      "Facility climate and control fit-out",
      "Seed capital and first crop working capital",
    ],
    milestones: [
      {
        title: "Facility commissioned",
        evidence: "Environmental controls pass commissioning and first seeding complete.",
        releasePercent: 45,
      },
      {
        title: "First commercial harvest",
        evidence: "Pack-out and offtake delivery records confirm contracted quality grades.",
        releasePercent: 30,
      },
      {
        title: "Unit economics proven",
        evidence: "Two quarters of yield and cost data meet the pilot business plan.",
        releasePercent: 25,
      },
    ],
    risks: [
      "Energy costs dominate vertical farm economics.",
      "Produce pricing is exposed to import competition.",
      "Equity returns depend on expansion beyond the pilot.",
    ],
  },
];
