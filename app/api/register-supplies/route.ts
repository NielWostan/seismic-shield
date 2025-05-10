"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function POST(req: NextRequest) {
  try {
    const { type, quantity, center_id } = await req.json();

    // Basic validation
    if (!type || !quantity || !center_id) {
      return NextResponse.json(
        { error: "Missing required fields: type, quantity, or center_id." },
        { status: 400 }
      );
    }

    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    // Insert new supply
    const query = `
      INSERT INTO SUPPLIES (type, quantity, center_id)
      VALUES (?, ?, ?);
    `;

    await connection.execute(query, [type, quantity, center_id]);

    await connection.end();
    return NextResponse.json({ message: "Supply registered successfully." });
  } catch (error: any) {
    console.error("Error registering supply:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register supply." },
      { status: 500 }
    );
  }
}
