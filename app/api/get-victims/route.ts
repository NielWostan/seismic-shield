"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const areaId = url.searchParams.get("areaId"); // optional filter

    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    const query = areaId
      ? `
        SELECT 
          v.ssn,
          p.name AS victim_name,
          p.address AS victim_address,
          v.area_id,
          a.name AS county_name,
          a.population AS county_population,
          a.damaged_infrastructure AS damages
        FROM VICTIM v
        JOIN PERSON p ON v.ssn = p.ssn
        JOIN AFFECTED_COUNTY a ON v.area_id = a.area_id
        WHERE v.area_id = ?
      `
      : `
        SELECT 
          v.ssn,
          p.name AS victim_name,
          p.address AS victim_address,
          v.area_id,
          a.name AS county_name,
          a.population AS county_population,
          a.damaged_infrastructure AS damages
        FROM VICTIM v
        JOIN PERSON p ON v.ssn = p.ssn
        JOIN AFFECTED_COUNTY a ON v.area_id = a.area_id
      `;

    const [rows] = areaId
      ? await connection.execute(query, [areaId])
      : await connection.query(query);

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
