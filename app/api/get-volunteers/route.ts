"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const centerId = url.searchParams.get("centerId");

    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    const query = centerId
      ? `
        SELECT 
          v.ssn, 
          p.name AS volunteer_name, 
          p.address AS volunteer_address,
          v.center_id,
          r.name AS center_name,
          r.address AS center_address
        FROM VOLUNTEER v
        JOIN PERSON p ON v.ssn = p.ssn
        JOIN RELIEF_CENTER r ON v.center_id = r.center_id
        WHERE v.center_id = ?
      `
      : `
        SELECT 
          v.ssn, 
          p.name AS volunteer_name, 
          p.address AS volunteer_address,
          v.center_id,
          r.name AS center_name,
          r.address AS center_address
        FROM VOLUNTEER v
        JOIN PERSON p ON v.ssn = p.ssn
        JOIN RELIEF_CENTER r ON v.center_id = r.center_id
      `;

    const [rows] = centerId
      ? await connection.execute(query, [centerId])
      : await connection.query(query);

    await connection.end();
    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching volunteers:", error);
    return NextResponse.json(
      { error: error.message || "Unable to retrieve volunteers" },
      { status: 500 }
    );
  }
}
