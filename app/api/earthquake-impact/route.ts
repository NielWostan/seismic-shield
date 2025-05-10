"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    // Which earthquakes impacted the most counties and caused the highest number of victims per county?
    const query = `
      SELECT 
        e.earthquake_id,
        e.date,
        e.magnitude,
        COUNT(DISTINCT ac.area_id) AS counties_affected,
        COUNT(v.ssn) AS total_victims,
        ROUND(COUNT(v.ssn) / COUNT(DISTINCT ac.area_id), 2) AS victims_per_county
      FROM EARTHQUAKE e
      JOIN AFFECTED_COUNTY ac ON e.area_id = ac.area_id
      LEFT JOIN VICTIM v ON v.area_id = ac.area_id
      GROUP BY 
        e.earthquake_id,
        e.date,
        e.magnitude
      ORDER BY 
        total_victims DESC;
    `;

    const [rows] = await connection.query(query);
    await connection.end();

    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching earthquake impact summary:", error);
    return NextResponse.json(
      { error: error.message || "Unable to retrieve data" },
      { status: 500 }
    );
  }
}
