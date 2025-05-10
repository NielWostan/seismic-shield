"use client";

import { Block } from "@/components/block";
import { Info } from "@/components/info";
import { useState } from "react";

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

export default function Page() {
  const [formData, setFormData] = useState({
    id: "",
    magnitude: "",
    date: "",
    time: "",
    latitude: "",
    longitude: "",
    areaID: "",
    name: "",
    population: "",
    damages: "",
  });

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/register-earthquake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Submission failed:", error);
        alert(
          "Failed to submit data. Please check the console for details. " +
            error.error
        );
      } else {
        alert("Earthquake data submitted successfully!");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred while submitting the data. " + err);
    }
  };

  return (
    <div className="w-full flex justify-center h-screen py-16">
      <div className="w-1/2">
        <div className="flex flex-col gap-8">
          <p className="!text-4xl">Earthquake Data</p>
          <Info
            file="app/api/register-earthquake/route.ts"
            query="INSERT INTO earthquake (
        earthquake_id, magnitude, date, time, latitude, longitude,
        area_id, name, population, damages
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       "
          />
          <Block
            label="Magnitude"
            value={formData.magnitude}
            onChange={handleChange("magnitude")}
          />
          <div className="flex gap-4">
            <Block
              label="Date (YYYY-MM-DD)"
              value={formData.date}
              onChange={handleChange("date")}
            />
            <Block
              label="Time (HH:MM:SS)"
              value={formData.time}
              onChange={handleChange("time")}
            />
          </div>
          <div className="flex gap-4">
            <Block
              label="Latitude"
              value={formData.latitude}
              onChange={handleChange("latitude")}
            />
            <Block
              label="Longitude"
              value={formData.longitude}
              onChange={handleChange("longitude")}
            />
          </div>
          <Block
            label="Affected County ID"
            value={formData.areaID}
            onChange={handleChange("areaID")}
          />
          <div className="flex gap-4">
            <Block
              label="Name"
              value={formData.name}
              onChange={handleChange("name")}
            />
            <Block
              label="Population"
              value={formData.population}
              onChange={handleChange("population")}
            />
            <Block
              label="Damages"
              value={formData.damages}
              onChange={handleChange("damages")}
            />
          </div>
          <Submit label="Submit" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
