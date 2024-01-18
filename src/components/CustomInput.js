import React from "react";

const CustomInput = ({ label, type, name, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 w-full border rounded-md"
      />
    </label>
    {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
  </div>
);

export default CustomInput;
