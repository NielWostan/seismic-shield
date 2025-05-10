"use client";

import { useState } from "react";
import { Block } from "@/components/block";
import { Info } from "@/components/info";

const Submit = ({
  label,
  onSubmit,
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

export default function RegisterSuppliesPage() {
  const [formData, setFormData] = useState({
    type: "",
    quantity: "",
    center_id: "",
  });

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/register-supplies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
          center_id: Number(formData.center_id),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Submission failed:", error);
        alert("Failed to register supply. " + error.message);
      } else {
        alert("Supply registered successfully!");
      }
    } catch (err) {
      console.error("Error submitting supply:", err);
      alert("An error occurred during submission. " + err);
    }
  };

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-1/2 flex flex-col gap-8">
        <h1 className="text-4xl">Register Supply</h1>
        <Info
          file="app/api/register-supplies/route.ts"
          query={`INSERT INTO SUPPLIES (type, quantity, center_id)
VALUES (?, ?, ?);`}
        />
        <Block
          label="Type"
          value={formData.type}
          onChange={handleChange("type")}
        />
        <Block
          label="Quantity"
          value={formData.quantity}
          onChange={handleChange("quantity")}
        />
        <Block
          label="Center ID"
          value={formData.center_id}
          onChange={handleChange("center_id")}
        />
        <Submit label="Submit" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
