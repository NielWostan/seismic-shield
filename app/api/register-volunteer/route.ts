"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ssn, name, address, centerId } = body;

    if (!ssn) {
      return NextResponse.json({ error: "SSN is required" }, { status: 400 });
    }

    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    // Insert into PERSON (name and address may be null)
    const insertPerson = `
      INSERT INTO PERSON (ssn, name, address)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE name = VALUES(name), address = VALUES(address)
    `;
    await connection.execute(insertPerson, [
      ssn,
      name || null,
      address || null,
    ]);

    // Only insert into VOLUNTEER if centerId is provided
    if (centerId) {
      const insertVolunteer = `
        INSERT INTO VOLUNTEER (ssn, center_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE center_id = VALUES(center_id)
      `;
      await connection.execute(insertVolunteer, [ssn, centerId]);
    }

    await connection.end();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Volunteer registration error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
