import React from "react";

const CustomDropDown = ({ label, name, value, options, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600">
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 w-full border rounded-md"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default CustomDropDown;
