import React, { useEffect, useState } from 'react';
import './CheckBox.css'; // Import CSS file for component styles

function CheckBox({ label, defaultValue, onChange1 }) {
  const [checked, setChecked] = useState(defaultValue);

  useEffect(() => {
    setChecked(defaultValue);
  }, [defaultValue]);

  const handleChange = () => {
    const updatedChecked = !checked;
    setChecked(updatedChecked);
    if (updatedChecked) {
      onChange1("True");
    } else {
      onChange1("False");
    }
  };

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        {label}
        <br />
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="checkbox-input"
        />
      </label>
    </div>
  );
}

export default CheckBox;
