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
    <div style={{ display: 'flex', border: '1px solid #000f31', borderRadius: '5px', overflow: 'hidden' }}>
      <button
        type="button" 
        onClick={handleMorningClick}
        style={{
          backgroundColor: isMorningSelected ? '#d35100' : '#000f31',
          color: 'white',
          flex: 1,
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        Matin
      </button>
      <button
        type="button" 
        onClick={handleAfternoonClick}
        style={{
          backgroundColor: isMorningSelected ? '#000f31' : '#d35100',
          color: 'white',
          flex: 1,
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
           width :'150px'
        }}
      >
        Après-midi
      </button>
    </div>
  );
};

export default ToggleButton;
