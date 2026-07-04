import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

async function readDb() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {
      content: {
        heroBgs: [],
        avatarIcons: [],
        transformations: [],
        foodPlan: [],
        successStories: []
      },
      consultations: []
    };
  }
}

async function writeDb(data: any) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.content || {});
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDb();
    db.content = body;
    await writeDb(db);
    return NextResponse.json({ success: true, content: db.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
