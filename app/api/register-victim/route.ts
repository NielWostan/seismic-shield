"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ssn, name, address, areaId, condition_text, treatment } = body;

    if (!ssn) {
      return NextResponse.json(
        { error: "SSN is a required field." },
        { status: 400 }
      );
    }

    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    // Insert into PERSON table
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

    // Insert into VICTIM table
    const insertVictim = `
      INSERT INTO VICTIM (ssn, area_id, condition_text, treatment)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE area_id = VALUES(area_id), condition_text = VALUES(condition_text), treatment = VALUES(treatment)
    `;
    await connection.execute(insertVictim, [
      ssn,
      areaId || null,
      condition_text || null,
      treatment || null,
    ]);

    await connection.end();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Victim registration error:", error);
    return NextResponse.json(
      { error: error.message || "Submission failed" },
      { status: 500 }
    );
  }
}
