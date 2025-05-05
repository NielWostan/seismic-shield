'use client';

import { useState, useEffect } from 'react';
import { Block } from '@/components/block';

export default function VictimListPage() {
  const [areaId, setAreaId] = useState('');
  const [victims, setVictims] = useState<any[]>([]);

  const fetchVictims = async () => {
    try {
      const query = areaId ? `?areaId=${encodeURIComponent(areaId)}` : '';
      const res = await fetch(`/api/get-victims${query}`);
      if (!res.ok) throw new Error('Failed to fetch victims');
      const data = await res.json();
      setVictims(data);
    } catch (error) {
      console.error('Error fetching victims:', error);
    }
  };

  useEffect(() => {
    fetchVictims();
  }, []);

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-2/3 flex flex-col gap-8">
        <h1 className="text-4xl">Victims</h1>
        <div className="flex gap-4 items-end">
          <Block
            label="Area ID"
            value={areaId}
            onChange={(val) => setAreaId(val)}
          />
          <button
            onClick={fetchVictims}
            className="h-14 px-6 text-lg bg-black text-white rounded-md"
          >
            Search
          </button>
        </div>

        {victims.length > 0 ? (
          <ul className="space-y-4">
            {victims.map((v, idx) => (
              <li
                key={idx}
                className="p-4 border rounded bg-white text-black shadow"
              >
                <p>
                  <strong>SSN:</strong> {v.ssn}
                </p>
                <p>
                  <strong>Victim Name:</strong> {v.victim_name}
                </p>
                <p>
                  <strong>Victim Address:</strong> {v.victim_address}
                </p>
                <p>
                  <strong>Affected Area ID:</strong> {v.area_id}
                </p>
                <p>
                  <strong>County Name:</strong> {v.county_name}
                </p>
                <p>
                  <strong>County Population:</strong> {v.county_population}
                </p>
                <p>
                  <strong>Damages:</strong> {v.damages}
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
