"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    // Who are the people involved at relief centers, and are they victims or volunteers?
    const query = `
      SELECT 
        p.name,
        'Volunteer' AS role,
        rc.name AS center_name
      FROM VOLUNTEER v
      JOIN PERSON p ON v.ssn = p.ssn
      JOIN RELIEF_CENTER rc ON v.center_id = rc.center_id

      UNION

      SELECT 
        p.name,
        'Victim' AS role,
        rc.name AS center_name
      FROM VICTIM v
      JOIN PERSON p ON v.ssn = p.ssn
      JOIN AFFECTED_COUNTY ac ON v.area_id = ac.area_id
      JOIN RELIEF_CENTER rc ON ac.area_id = rc.center_id;
    `;

    const [rows] = await connection.query(query);

    await connection.end();
    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching people in centers:", error);
    return NextResponse.json(
      { error: error.message || "Unable to retrieve data" },
      { status: 500 }
    );
  }
}
