'use client';

import { Block } from '@/components/block';
import { useState } from 'react';

const Submit = ({
  label,
  onSubmit
}: {
  label: string;
  onSubmit: () => void;
}) => (
  <button
    onClick={onSubmit}
    className="h-16 text-xl bg-black text-white rounded-md"
  >
    {label}
  </button>
);

export default function Page() {
  const [formData, setFormData] = useState({
    ssn: '',
    name: '',
    address: '',
    centerId: ''
  });

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/register-volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Submission failed:', error);
        alert(
          'Failed to submit data. Please check the console for details. ' +
            error.error
        );
      } else {
        alert('Volunteer data submitted successfully!');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('An error occurred while submitting the data. ' + err);
    }
  };

  return (
    <div className="w-full flex justify-center h-screen py-16">
      <div className="w-1/2">
        <div className="flex flex-col gap-8">
          <p className="!text-4xl">Register Volunteer</p>
          <Block
            label="SSN"
            value={formData.ssn}
            onChange={handleChange('ssn')}
          />
          <Block
            label="Name"
            value={formData.name}
            onChange={handleChange('name')}
          />
          <Block
            label="Address"
            value={formData.address}
            onChange={handleChange('address')}
          />
          <Block
            label="Center ID"
            value={formData.centerId}
            onChange={handleChange('centerId')}
          />
          <Submit label="Submit" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
