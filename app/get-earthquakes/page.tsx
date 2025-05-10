"use client";

import { Info } from "@/components/info";
import { useEffect, useState } from "react";

export default function EarthquakeListPage() {
  const [earthquakeData, setEarthquakeData] = useState<any[]>([]);

  const fetchEarthquakes = async () => {
    try {
      const res = await fetch("/api/get-earthquakes");
      if (!res.ok) throw new Error("Failed to fetch earthquakes");
      const data = await res.json();
      setEarthquakeData(data);
    } catch (error) {
      console.error("Error fetching earthquake data:", error);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-2/3">
        <h1 className="text-4xl mb-8">Earthquake Records</h1>
        <Info
          file="app/api/get-earthquakes/route.ts"
          query="SELECT *
      FROM 
          EARTHQUAKE E
      JOIN 
          AFFECTED_COUNTY A ON E.area_id = A.area_id"
        />
        {earthquakeData.length > 0 ? (
          <ul className="space-y-4">
            {earthquakeData.map((quake, index) => (
              <li
                key={index}
                className="p-4 border rounded shadow-sm bg-white text-black"
              >
                <p>
                  <strong>ID:</strong> {quake.earthquake_id}
                </p>
                <p>
                  <strong>Magnitude:</strong> {quake.magnitude}
                </p>
                <p>
                  <strong>Date:</strong> {quake.date.split("T")[0]}
                </p>
                <p>
                  <strong>Time:</strong> {quake.time}
                </p>
                <p>
                  <strong>Location:</strong> ({quake.latitude},{" "}
                  {quake.longitude})
                </p>
                <p>
                  <strong>County Name:</strong> {quake.name}
                </p>
                <p>
                  <strong>Population:</strong> {quake.population}
                </p>
                <p>
                  <strong>Damages:</strong> {quake.damaged_infrastructure}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No earthquake records found.</p>
        )}
      </div>
    </div>
  );
}
