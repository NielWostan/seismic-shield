"use client";

import { useEffect, useState } from "react";
import { Info } from "@/components/info";

export default function ReliefCentersAboveAveragePage() {
  const [centers, setCenters] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/get-above-avg-centers");
      if (!res.ok) throw new Error("Failed to fetch data");
      const result = await res.json();
      setCenters(result);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-2/3 flex flex-col gap-8">
        <h1 className="text-4xl">Relief Centers Above Average Supplies</h1>
        <Info
          file="app/api/get-above-avg-centers/route.ts"
          query={`SELECT rc.name, SUM(s.quantity) AS total_quantity
                FROM SUPPLIES s
                JOIN RELIEF_CENTER rc ON s.center_id = rc.center_id
                GROUP BY rc.name
                HAVING total_quantity > (
                SELECT AVG(total) FROM (
                    SELECT SUM(quantity) AS total
                    FROM SUPPLIES
                    GROUP BY center_id
                ) AS avg_table
            );`}
        />
        {centers.length > 0 ? (
          <ul className="space-y-4">
            {centers.map((c, idx) => (
              <li
                key={idx}
                className="p-4 border rounded bg-white text-black shadow"
              >
                <p>
                  <strong>Center Name:</strong> {c.name}
                </p>
                <p>
                  <strong>Total Supplies:</strong> {c.total_quantity}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No relief centers exceed the average supply quantity.</p>
        )}
      </div>
    </div>
  );
}
