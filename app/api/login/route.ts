import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const rows = await sql`SELECT key, value FROM settings WHERE key IN ('email', 'password')`;

    const settings: Record<string, string> = { email: "1", password: "1" };
    for (const row of rows) {
      settings[row.key] = row.value;
    }

    if (settings.email === email && settings.password === password) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Invalid email or password" });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
