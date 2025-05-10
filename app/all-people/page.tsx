"use client";

import { useState, useEffect } from "react";
import { Info } from "@/components/info";

export default function PeopleLinkedToCentersPage() {
  const [people, setPeople] = useState<any[]>([]);

  const fetchPeople = async () => {
    try {
      const res = await fetch("/api/get-all-people");
      if (!res.ok) throw new Error("Failed to fetch people");
      const data = await res.json();
      setPeople(data);
    } catch (error) {
      console.error("Error fetching people in centers:", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-2/3 flex flex-col gap-8">
        <h1 className="text-4xl">People Linked to Relief Centers</h1>
        <Info
          file="app/api/get-all-people/route.ts"
          query={`SELECT 
                p.name,
                'Volunteer' AS role,
                rc.name AS center_name
                FROM VOLUNTEER v
                JOIN PERSON p ON v.ssn = p.ssn
                JOIN RELIEF_CENTER rc ON v.center_id = rc.center_id

                UNION

                SELECT 
                p.name,
                'Victim' AS role,
                rc.name AS center_name
                FROM VICTIM v
                JOIN PERSON p ON v.ssn = p.ssn
                JOIN AFFECTED_COUNTY ac ON v.area_id = ac.area_id
                JOIN RELIEF_CENTER rc ON ac.area_id = rc.center_id;`}
        />
        {people.length > 0 ? (
          <ul className="space-y-4">
            {people.map((person, idx) => (
              <li
                key={idx}
                className="p-4 border rounded bg-white text-black shadow"
              >
                <p>
                  <strong>Name:</strong> {person.name}
                </p>
                <p>
                  <strong>Role:</strong> {person.role}
                </p>
                <p>
                  <strong>Relief Center:</strong> {person.center_name}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No people found.</p>
        )}
      </div>
    </div>
  );
}
