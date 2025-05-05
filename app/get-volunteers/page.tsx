'use client';

import { useState, useEffect } from 'react';
import { Block } from '@/components/block';

export default function VolunteerListPage() {
  const [centerId, setCenterId] = useState('');
  const [volunteers, setVolunteers] = useState<any[]>([]);

  const fetchVolunteers = async () => {
    try {
      const query = centerId ? `?centerId=${encodeURIComponent(centerId)}` : '';
      const res = await fetch(`/api/get-volunteers${query}`);
      if (!res.ok) throw new Error('Failed to fetch volunteers');
      const data = await res.json();
      setVolunteers(data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-2/3 flex flex-col gap-8">
        <h1 className="text-4xl">Volunteers</h1>
        <div className="flex gap-4 items-end pb-4 justify-end">
          <Block
            label="Center ID"
            value={centerId}
            onChange={(val) => setCenterId(val)}
          />
          <button
            onClick={fetchVolunteers}
            className="h-14 px-6 text-lg bg-black text-white rounded-md w-32 shrink-0"
          >
            Search
          </button>
        </div>
        {volunteers.length > 0 ? (
          <ul className="space-y-4">
            {volunteers.map((v, idx) => (
              <li
                key={idx}
                className="p-4 border rounded bg-white text-black shadow"
              >
                <p>
                  <strong>SSN:</strong> {v.ssn}
                </p>
                <p>
                  <strong>Volunteer Name:</strong> {v.volunteer_name}
                </p>
                <p>
                  <strong>Volunteer Address:</strong> {v.volunteer_address}
                </p>
                <p>
                  <strong>Assigned Center ID:</strong> {v.center_id}
                </p>
                <p>
                  <strong>Center Name:</strong> {v.center_name}
                </p>
                <p>
                  <strong>Center Address:</strong> {v.center_address}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No volunteers found.</p>
        )}
      </div>
    </div>
  );
}
