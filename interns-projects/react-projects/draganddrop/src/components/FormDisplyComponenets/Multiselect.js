import React from 'react';

function Multiselect({ label, options, onChange,defaultValue }) {
  const handleChange = (event) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <div className="multiselect-container">
      <label className="multiselect-label">{label}</label>
      <select className="multiselect-input" onChange={handleChange} defaultValue={defaultValue}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Multiselect;