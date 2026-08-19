insert into public.projects (
  slug,
  name,
  country,
  sector,
  operator_name,
  operator_type,
  funding_model,
  status,
  target_usd,
  summary,
  data
)
values
  ('central-luzon-solar-irrigation', 'Central Luzon Solar Irrigation Network', 'Philippines', 'Clean infrastructure', 'Agos Rural Energy Cooperative', 'Cooperative', 'Revenue share', 'published', 480000, 'Replace diesel irrigation pumps with a shared solar network serving six rice-farming cooperatives.', '{"source":"seed_catalog"}'::jsonb),
  ('sulawesi-mangrove-recovery', 'Sulawesi Mangrove Recovery Program', 'Indonesia', 'Coastal resilience', 'Pesisir Lestari Foundation', 'Public-interest entity', 'Grant', 'in_progress', 260000, 'Restore working mangrove coastlines while funding local nurseries and long-term monitoring teams.', '{"source":"seed_catalog"}'::jsonb),
  ('luang-prabang-mobile-clinic', 'Luang Prabang Mobile Clinic Route', 'Laos', 'Community health', 'Dr. Mali Vongsa', 'Individual', 'Grant', 'published', 125000, 'Extend scheduled maternal and primary-care visits to remote villages through a locally operated mobile clinic.', '{"source":"seed_catalog"}'::jsonb),
  ('da-nang-circular-textiles', 'Da Nang Circular Textile Expansion', 'Vietnam', 'Circular manufacturing', 'Lantern Works Ltd.', 'Company', 'Revenue share', 'published', 195000, 'Add recycled-fiber cutting and quality-control capacity for contracted hospitality uniform orders.', '{"source":"seed_catalog"}'::jsonb),
  ('mekong-water-access-network', 'Mekong Water Access Network', 'Cambodia', 'Water infrastructure', 'Sovan Community Water Alliance', 'Public-interest entity', 'Grant', 'published', 210000, 'Expand reliable, solar-powered water kiosks across river communities with local operators and transparent maintenance budgets.', '{"source":"seed_catalog"}'::jsonb),
  ('chiang-rai-agro-processing-hub', 'Chiang Rai Agro-Processing Hub', 'Thailand', 'Food production', 'Northfield Foods Co.', 'Company', 'Revenue share', 'published', 320000, 'Add small-batch drying and packaging capacity so regional growers can sell higher-value products closer to home.', '{"source":"seed_catalog"}'::jsonb),
  ('sabah-community-microgrid', 'Sabah Community Microgrid', 'Malaysia', 'Clean infrastructure', 'Borneo Island Energy Cooperative', 'Cooperative', 'Grant', 'in_progress', 390000, 'Build a solar and battery microgrid for a remote coastal community, with local technicians trained to operate it.', '{"source":"seed_catalog"}'::jsonb),
  ('dili-coastal-cold-storage', 'Dili Coastal Cold Storage', 'Timor-Leste', 'Food logistics', 'Tasi Fresh Cooperative', 'Cooperative', 'Revenue share', 'published', 160000, 'Reduce post-harvest loss for small fishing crews with solar-assisted cold storage and scheduled market delivery.', '{"source":"seed_catalog"}'::jsonb),
  ('lombok-seaweed-processing', 'Lombok Seaweed Processing Cooperative', 'Indonesia', 'Blue economy', 'Laut Biru Growers Cooperative', 'Cooperative', 'Revenue share', 'published', 175000, 'Help coastal growers move from raw seaweed sales to higher-value drying, grading, and ingredient preparation.', '{"source":"seed_catalog"}'::jsonb),
  ('bohol-digital-learning-lab', 'Bohol Digital Learning Lab', 'Philippines', 'Education and skills', 'Isla Skills Foundation', 'Public-interest entity', 'Grant', 'published', 145000, 'Create a local training and connectivity hub for young people building digital skills outside major urban centers.', '{"source":"seed_catalog"}'::jsonb)
on conflict (slug) do update set
  name = excluded.name,
  country = excluded.country,
  sector = excluded.sector,
  operator_name = excluded.operator_name,
  operator_type = excluded.operator_type,
  funding_model = excluded.funding_model,
  status = excluded.status,
  target_usd = excluded.target_usd,
  summary = excluded.summary,
  data = excluded.data,
  updated_at = now();
