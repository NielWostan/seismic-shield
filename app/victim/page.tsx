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

export default function RegisterVictimPage() {
  const [formData, setFormData] = useState({
    ssn: '',
    name: '',
    address: '',
    areaId: '',
    condition_text: '',
    treatment: ''
  });

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/register-victim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Submission failed:', error);
        alert('Failed to register victim. ' + error);
      } else {
        alert('Victim registered successfully!');
      }
    } catch (err) {
      console.error('Error submitting victim:', err);
      alert('An error occurred during submission. ' + err);
    }
  };

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-1/2 flex flex-col gap-8">
        <h1 className="text-4xl">Register Victim</h1>
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
          label="Area ID"
          value={formData.areaId}
          onChange={handleChange('areaId')}
        />
        <Block
          label="Condition"
          value={formData.condition_text}
          onChange={handleChange('condition_text')}
        />
        <Block
          label="Treatment"
          value={formData.treatment}
          onChange={handleChange('treatment')}
        />
        <Submit label="Submit" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
