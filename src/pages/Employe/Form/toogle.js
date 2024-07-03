import React, { useState } from 'react';

const ToggleButton = ({ onToggle }) => {
  const [isMorningSelected, setIsMorningSelected] = useState(true);

  const handleMorningClick = () => {
    if (!isMorningSelected) {
      setIsMorningSelected(true);
      onToggle('Matin');
    }
  };

  const handleAfternoonClick = () => {
    if (isMorningSelected) {
      setIsMorningSelected(false);
      onToggle('Après-midi');
    }
  };

  return (
    <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden' }}>
      <button
        type="button" 
        onClick={handleMorningClick}
        style={{
          backgroundColor: isMorningSelected ? '#007bff' : '#ccc',
          color: 'white',
          flex: 1,
          border: 'none',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        Matin
      </button>
      <button
        type="button" 
        onClick={handleAfternoonClick}
        style={{
          backgroundColor: isMorningSelected ? '#ccc' : '#007bff',
          color: 'white',
          flex: 1,
          border: 'none',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        Après-midi
      </button>
    </div>
  );
};

export default ToggleButton;
