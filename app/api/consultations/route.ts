import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

async function readDb() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { content: {}, consultations: [] };
  }
}

async function writeDb(data: any) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.consultations || []);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDb();
    
    // Add unique ID and timestamp to the request
    const newRequest = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      createdAt: new Date().toISOString(),
      status: "pending", // default status
      ...body
    };

    if (!db.consultations) {
      db.consultations = [];
    }

    db.consultations.push(newRequest);
    await writeDb(db);
    
    return NextResponse.json({ success: true, consultation: newRequest });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, notes } = await request.json();
    const db = await readDb();
    
    if (db.consultations) {
      db.consultations = db.consultations.map((c: any) => {
        if (c.id === id) {
          const updated = { ...c };
          if (status !== undefined) updated.status = status;
          if (notes !== undefined) updated.notes = notes;
          return updated;
        }
        return c;
      });
    }
    
    await writeDb(db);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
