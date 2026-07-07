import { initDb } from "../lib/db";

async function main() {
  console.log("🔄 Initializing database tables...");
  await initDb();
  console.log("✅ Database tables created successfully!");
}

main().catch((e) => {
  console.error("❌ Database initialization failed:", e);
  process.exit(1);
});
