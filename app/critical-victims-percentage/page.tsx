"use client";

import { useEffect, useState } from "react";
import { Info } from "@/components/info";

export default function CriticalVictimPercentagePage() {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/critical-victims-percentage");
      if (!res.ok) throw new Error("Failed to fetch data");
      const result = await res.json();
      setData(result);
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
        <h1 className="text-4xl">Critical Victim Percentages by County</h1>
        <Info
          file="app/api/critical-victims-percentage/route.ts"
          query={`SELECT 
  ac.name AS county_name,
  IFNULL(crit.critical_victims, 0) AS critical_victims,
  ROUND(
    IFNULL(crit.critical_victims, 0) / total.total_victims * 100, 2
  ) AS critical_percentage
FROM (
  SELECT area_id, COUNT(*) AS total_victims
  FROM VICTIM
  GROUP BY area_id
) AS total
JOIN AFFECTED_COUNTY ac ON total.area_id = ac.area_id
LEFT JOIN (
  SELECT area_id, COUNT(*) AS critical_victims
  FROM VICTIM
  WHERE treatment LIKE '%surgery%'
  GROUP BY area_id
) AS crit ON total.area_id = crit.area_id
ORDER BY critical_percentage DESC;
`}
        />
        {data.length > 0 ? (
          <ul className="space-y-4">
            {data.map((entry, idx) => (
              <li
                key={idx}
                className="p-4 border rounded bg-white text-black shadow"
              >
                <p>
                  <strong>County:</strong> {entry.county_name}
                </p>
                <p>
                  <strong>Critical Victims:</strong> {entry.critical_victims}
                </p>
                <p>
                  <strong>Critical Percentage:</strong>{" "}
                  {entry.critical_percentage}%
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
