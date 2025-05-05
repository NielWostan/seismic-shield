"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function GET(_req: NextRequest) {
  try {
    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    const [rows] = await connection.query("SELECT * FROM earthquake");

    await connection.end();

    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching earthquakes:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
