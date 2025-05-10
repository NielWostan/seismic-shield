"use server";

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, address } = body;

    if (!name || !address) {
      return NextResponse.json(
        { error: "Both name and address are required." },
        { status: 400 }
      );
    }

    const connection = await getConnection();
    if (!connection) throw new Error("Database connection not established");

    // Insert into RELIEF_CENTER table
    const insertQuery = `
      INSERT INTO RELIEF_CENTER (name, address)
      VALUES (?, ?)
    `;

    await connection.execute(insertQuery, [name, address]);

    await connection.end();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Relief center registration error:", error);
    return NextResponse.json(
      { error: error.message || "Submission failed" },
      { status: 500 }
    );
  }
}
