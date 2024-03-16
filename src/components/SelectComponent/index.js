
import React, { useState } from 'react';

const SelectComponent = ({ label, options, value, onChange, style }) => {
  return (
    <div className="mb-8" style={{ marginTop: '-24px' }}
    >
      <label className="block font-medium text-gray-600 ml-3 mb-0 lg:mt-4 mx:mt-4 md:mt-4 mt-8">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="appearance-none border  focus:border-blue-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;