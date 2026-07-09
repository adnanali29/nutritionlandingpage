import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM consultations ORDER BY created_at DESC`;
    const mappedRows = rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      age: row.age,
      gender: row.gender,
      concern: row.concern,
      height: row.height,
      preferredDate: row.preferred_date,
      preferredTime: row.preferred_time,
      status: row.status,
      notes: row.notes,
      createdAt: row.created_at,
    }));
    return NextResponse.json(mappedRows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    await sql`
      INSERT INTO consultations (
        id, name, phone, age, gender, concern, height, preferred_date, preferred_time, status, created_at
      )
      VALUES (
        ${id},
        ${body.name || ''},
        ${body.phone || ''},
        ${body.age || ''},
        ${body.gender || ''},
        ${body.concern || ''},
        ${body.height || ''},
        ${body.preferredDate || ''},
        ${body.preferredTime || ''},
        'pending',
        NOW()
      )
    `;

    const newConsultation = {
      id,
      ...body,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, consultation: newConsultation });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, notes } = await request.json();

    if (status !== undefined && notes !== undefined) {
      await sql`UPDATE consultations SET status = ${status}, notes = ${notes} WHERE id = ${id}`;
    } else if (status !== undefined) {
      await sql`UPDATE consultations SET status = ${status} WHERE id = ${id}`;
    } else if (notes !== undefined) {
      await sql`UPDATE consultations SET notes = ${notes} WHERE id = ${id}`;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
