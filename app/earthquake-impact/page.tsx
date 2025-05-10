"use client";

import { useEffect, useState } from "react";
import { Info } from "@/components/info";

export default function EarthquakeImpactPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const res = await fetch("/api/earthquake-impact");
        if (!res.ok) throw new Error("Failed to fetch earthquake impact");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchImpact();
  }, []);

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-2/3 flex flex-col gap-8">
        <h1 className="text-4xl">Earthquake Impact Summary</h1>
        <Info
          file="app/api/earthquake-impact/route.ts"
          query={`SELECT 
  e.earthquake_id,
  e.date,
  e.magnitude,
  COUNT(DISTINCT ac.area_id) AS counties_affected,
  COUNT(v.ssn) AS total_victims,
  ROUND(COUNT(v.ssn) / COUNT(DISTINCT ac.area_id), 2) AS victims_per_county
FROM EARTHQUAKE e
JOIN AFFECTED_COUNTY ac ON e.area_id = ac.area_id
LEFT JOIN VICTIM v ON v.area_id = ac.area_id
GROUP BY e.earthquake_id, e.date, e.magnitude
ORDER BY total_victims DESC;`}
        />
        {data.length > 0 ? (
          <ul className="space-y-4">
            {data.map((item, idx) => (
              <li
                key={idx}
                className="p-4 border rounded bg-white text-black shadow"
              >
                <p>
                  <strong>Earthquake ID:</strong> {item.earthquake_id}
                </p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <p>
                  <strong>Magnitude:</strong> {item.magnitude}
                </p>
                <p>
                  <strong>Counties Affected:</strong> {item.counties_affected}
                </p>
                <p>
                  <strong>Total Victims:</strong> {item.total_victims}
                </p>
                <p>
                  <strong>Victims per County:</strong> {item.victims_per_county}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No earthquake impact data available.</p>
        )}
      </div>
    </div>
  );
}
