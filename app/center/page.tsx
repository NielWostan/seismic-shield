'use client';

import { useState } from 'react';
import { Block } from '@/components/block';

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

export default function RegisterReliefCenterPage() {
  const [formData, setFormData] = useState({
    name: '',
    address: ''
  });

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/register-center', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Submission failed:', error);
        alert('Failed to register relief center.');
      } else {
        alert('Relief center registered successfully!');
      }
    } catch (err) {
      console.error('Error submitting relief center:', err);
      alert('An error occurred during submission.');
    }
  };

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-1/2 flex flex-col gap-8">
        <h1 className="text-4xl">Register Relief Center</h1>
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
        <Submit label="Submit" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
