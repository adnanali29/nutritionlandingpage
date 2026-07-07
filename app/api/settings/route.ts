import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    const rows = await sql`SELECT key, value FROM settings WHERE key = 'email'`;
    const email = rows.length > 0 ? rows[0].value : "1";
    return NextResponse.json({ email });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email) {
      await sql`
        INSERT INTO settings (key, value) VALUES ('email', ${email.trim()})
        ON CONFLICT (key) DO UPDATE SET value = ${email.trim()}
      `;
    }

    if (password) {
      await sql`
        INSERT INTO settings (key, value) VALUES ('password', ${password.trim()})
        ON CONFLICT (key) DO UPDATE SET value = ${password.trim()}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
