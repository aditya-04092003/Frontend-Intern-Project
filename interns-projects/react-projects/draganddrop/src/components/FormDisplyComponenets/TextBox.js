import React from 'react';

function TextBox({ label, defaultValue, isBold, isItalic, isHidden, validationOption, onChange1 }) {
  const [value, setValue] = React.useState(defaultValue);

  const handleInputChange = (event) => {
    const updatedValue = event.target.value;
    setValue(updatedValue); // Update the value state
    
  };

  const textStyle = {
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    display: isHidden ? 'none' : 'block',
  };

  return (
    <div className="text-input-container">
      <label className="text-input-label">{label}</label>
      <input
        type="text"
        placeholder={value}
        className="text-input"
        style={textStyle}
        onChange={handleInputChange}
        onBlur={()=>{
          onChange1(value); // Call the onChange event handler and pass the updated value
        }}
      />
      <span className="validation-message">{validationOption}</span>
    </div>
  );
}

export default TextBox;
