// UpSection.js
import React from "react";
import { cssClasses } from "@/lib/cssClasses";

const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

const UpSection = ({ formState, setFormState, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h2 className={`${cssClasses.header2} py-10 `}>Location</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formState.address}
            onChange={handleChange}
            className={errors.address ? "error" : ""}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <div>
          <label
            htmlFor="province"
            className="block text-sm font-medium text-gray-700"
          >
            Province
          </label>
          <select
            name="province"
            id="province"
            value={formState.province}
            onChange={handleChange}
            className={errors.province ? "error" : ""}
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          {errors.province && <p className="error">{errors.province}</p>}
        </div>
        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={formState.postalCode}
            onChange={handleChange}
            className={errors.postalCode ? "error" : ""}
          />
          {errors.postalCode && <p className="error">{errors.postalCode}</p>}
        </div>
      </div>
    </>
  );
};

export default UpSection;
