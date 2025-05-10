"use client";

import { useState, useEffect } from "react";
import { Info } from "@/components/info";

export default function VictimSeverityPage() {
  const [data, setData] = useState<any[]>([]);

  const fetchSeverityStats = async () => {
    try {
      const res = await fetch("/api/get-victim-severity");
      if (!res.ok) throw new Error("Failed to fetch severity data");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSeverityStats();
  }, []);

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-2/3 flex flex-col gap-8">
        <h1 className="text-4xl">Victim Severity Statistics</h1>
        <Info
          file="app/api/get-victim-severity/route.ts"
          query={`SELECT 
            CASE 
                WHEN treatment LIKE '%surgery%' THEN 'Critical'
                WHEN treatment LIKE '%med%' OR treatment LIKE '%therapy%' THEN 'Moderate'
                ELSE 'Minor'
            END AS severity_level,
            COUNT(*) AS victim_count,
            GROUP_CONCAT(CONCAT(p.name, ' (', v.condition_text, ')') SEPARATOR ', ') AS victims
            FROM VICTIM v
            JOIN PERSON p ON v.ssn = p.ssn
            GROUP BY severity_level;`}
        />
        {data.length > 0 ? (
          <ul className="space-y-4">
            {data.map((entry, idx) => (
              <li
                key={idx}
                className="p-4 border rounded bg-white text-black shadow"
              >
                <p>
                  <strong>Severity Level:</strong> {entry.severity_level}
                </p>
                <p>
                  <strong>Victim Count:</strong> {entry.victim_count}
                </p>
                <p>
                  <strong>Victims:</strong> {entry.victims}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
