import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default sql;

// Initialize database tables
export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS content (
      id SERIAL PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value JSONB NOT NULL DEFAULT '[]'::jsonb,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS consultations (
      id TEXT PRIMARY KEY,
      name TEXT,
      phone TEXT,
      age TEXT,
      gender TEXT,
      concern TEXT,
      height TEXT,
      preferred_date TEXT,
      preferred_time TEXT,
      status TEXT DEFAULT 'pending',
      notes TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Migration to add fields if table already exists
  try {
    await sql`ALTER TABLE consultations ADD COLUMN IF NOT EXISTS preferred_date TEXT;`;
    await sql`ALTER TABLE consultations ADD COLUMN IF NOT EXISTS preferred_time TEXT;`;
    await sql`ALTER TABLE consultations ADD COLUMN IF NOT EXISTS height TEXT;`;
  } catch (err) {
    console.error("Migration warning for consultations table:", err);
  }

  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      id SERIAL PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL
    )
  `;

  // Seed default settings if not present
  await sql`
    INSERT INTO settings (key, value)
    VALUES ('email', '1'), ('password', '1')
    ON CONFLICT (key) DO NOTHING
  `;

  // Seed default content keys if not present
  const contentKeys = ['heroBgs', 'avatarIcons', 'transformations', 'foodPlan', 'successStories'];
  for (const key of contentKeys) {
    await sql`
      INSERT INTO content (key, value)
      VALUES (${key}, '[]'::jsonb)
      ON CONFLICT (key) DO NOTHING
    `;
  }
}
