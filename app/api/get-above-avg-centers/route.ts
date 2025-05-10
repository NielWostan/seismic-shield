"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    const query = `
      SELECT rc.name, SUM(s.quantity) AS total_quantity
      FROM SUPPLIES s
      JOIN RELIEF_CENTER rc ON s.center_id = rc.center_id
      GROUP BY rc.name
      HAVING total_quantity > (
        SELECT AVG(total) FROM (
          SELECT SUM(quantity) AS total
          FROM SUPPLIES
          GROUP BY center_id
        ) AS avg_table
      );
    `;

    const [rows] = await connection.query(query);

    await connection.end();
    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching relief centers:", error);
    return NextResponse.json(
      { error: error.message || "Unable to retrieve data" },
      { status: 500 }
    );
  }
}
