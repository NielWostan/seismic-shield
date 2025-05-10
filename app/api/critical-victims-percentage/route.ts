"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    const query = `
      SELECT 
        ac.name AS county_name,
        IFNULL(crit.critical_victims, 0) AS critical_victims,
        ROUND(
            IFNULL(crit.critical_victims, 0) / total.total_victims * 100, 2
        ) AS critical_percentage
        FROM (
        SELECT area_id, COUNT(*) AS total_victims
        FROM VICTIM
        GROUP BY area_id
        ) AS total
        JOIN AFFECTED_COUNTY ac ON total.area_id = ac.area_id
        LEFT JOIN (
        SELECT area_id, COUNT(*) AS critical_victims
        FROM VICTIM
        WHERE treatment LIKE '%surgery%'
        GROUP BY area_id
        ) AS crit ON total.area_id = crit.area_id
        ORDER BY critical_percentage DESC;

    `;

    const [rows] = await connection.query(query);
    await connection.end();

    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching critical victim data:", error);
    return NextResponse.json(
      { error: error.message || "Unable to retrieve data" },
      { status: 500 }
    );
  }
}
