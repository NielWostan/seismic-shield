"use client";

import { useState, useEffect } from "react";
import { Block } from "@/components/block";
import { Info } from "@/components/info";

export default function VictimListPage() {
  const [areaId, setAreaId] = useState("");
  const [victims, setVictims] = useState<any[]>([]);

  const fetchVictims = async () => {
    try {
      const query = areaId ? `?areaId=${encodeURIComponent(areaId)}` : "";
      const res = await fetch(`/api/get-victims${query}`);
      if (!res.ok) throw new Error("Failed to fetch victims");
      const data = await res.json();
      setVictims(data);
    } catch (error) {
      console.error("Error fetching victims:", error);
    }
  };

  useEffect(() => {
    fetchVictims();
  }, []);

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-2/3 flex flex-col gap-8">
        <h1 className="text-4xl">Victims</h1>
        <Info
          file="app/api/get-victims/route.ts"
          query="SELECT 
        a.area_id,
        a.name AS county_name,
        COUNT(v.ssn) AS victim_count,
        GROUP_CONCAT(p.name SEPARATOR ', ') AS victim_names
      FROM VICTIM v
      JOIN AFFECTED_COUNTY a ON v.area_id = a.area_id
      JOIN PERSON p ON v.ssn = p.ssn
      GROUP BY a.area_id, a.name
      ORDER BY victim_count DESC;"
        />
        {victims.length > 0 ? (
          <ul className="space-y-4">
            {victims.map((v, idx) => (
              <li
                key={idx}
                className="p-4 border rounded bg-white text-black shadow"
              >
                <p>
                  <strong>County Name:</strong> {v.county_name}
                </p>
                <p>
                  <strong>Victim Count:</strong> {v.victim_count}
                </p>
                <p>
                  <strong>Victim Names:</strong> {v.victim_names}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No victims found.</p>
        )}
      </div>
    </div>
  );
}
