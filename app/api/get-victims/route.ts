"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const areaId = url.searchParams.get("areaId"); // optional filter

    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    // How many victims are in each county, and what are their names?
    const query = `
      SELECT 
        a.area_id,
        a.name AS county_name,
        COUNT(v.ssn) AS victim_count,
        GROUP_CONCAT(p.name SEPARATOR ', ') AS victim_names
      FROM VICTIM v
      JOIN AFFECTED_COUNTY a ON v.area_id = a.area_id
      JOIN PERSON p ON v.ssn = p.ssn
      GROUP BY a.area_id, a.name
      ORDER BY victim_count DESC;
    `;

    const [rows] = await connection.query(query);

    await connection.end();
    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching victims:", error);
    return NextResponse.json(
      { error: error.message || "Unable to retrieve victims" },
      { status: 500 }
    );
  }
}
