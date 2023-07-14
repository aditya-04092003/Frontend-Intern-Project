import React from 'react';
import './Calendar.css'; // Import CSS file for component styles


function Calendar({ label, defaultValue, onChange }) {
  const handleChange = (event) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <div className="calendar-container">
      <label className="calendar-label">{label}</label>
      <input type="date" defaultValue={defaultValue} onBlur={handleChange} className="calendar-input" />
    </div>
  );
}
export default Calendar;
