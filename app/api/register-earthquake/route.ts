"use server";

import { NextResponse, NextRequest } from "next/server";
import { getConnection } from "@/lib/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      magnitude,
      date,
      time,
      latitude,
      longitude,
      areaID,
      name,
      population,
      damages,
    } = body;

    const connection = await getConnection();
    if (!connection) {
      throw new Error("Database connection not established");
    }

    const insertQuery = `
      INSERT INTO earthquake (
        earthquake_id, magnitude, date, time, latitude, longitude,
        area_id, name, population, damages
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      id || null,
      magnitude || null,
      date || null,
      time || null,
      latitude || null,
      longitude || null,
      areaID || null,
      name || null,
      population || null,
      damages || null,
    ];

    await connection.execute(insertQuery, values);

    await connection.end();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error saving earthquake data:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
