"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    // How many victims fall into critical, moderate, or minor severity levels, and who are they?
    const query = `
      SELECT 
        CASE 
          WHEN treatment LIKE '%surgery%' THEN 'Critical'
          WHEN treatment LIKE '%med%' OR treatment LIKE '%therapy%' THEN 'Moderate'
          ELSE 'Minor'
        END AS severity_level,
        COUNT(*) AS victim_count,
        GROUP_CONCAT(CONCAT(p.name, ' (', v.condition_text, ')') SEPARATOR ', ') AS victims
      FROM VICTIM v
      JOIN PERSON p ON v.ssn = p.ssn
      GROUP BY severity_level;
    `;

    const [rows] = await connection.query(query);
    await connection.end();
    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching victim severity:", error);
    return NextResponse.json(
      { error: error.message || "Unable to retrieve data" },
      { status: 500 }
    );
  }
}
