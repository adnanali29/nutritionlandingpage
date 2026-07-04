import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

async function readDb() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { settings: { email: "1", password: "1" } };
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const db = await readDb();
    
    const adminSettings = db.settings || { email: "1", password: "1" };
    
    if (adminSettings.email === email && adminSettings.password === password) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Invalid email or password" });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
