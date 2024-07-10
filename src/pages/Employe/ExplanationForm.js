import React, { useState, useEffect } from 'react';
import { Button } from 'devextreme-react/button';
import './EmployeeLeaveForm.css';

const ExplanationForm = ({ popupVisible, setPopupVisible, rowData, onSave }) => {
  const [explanation, setExplanation] = useState('');
  const [attachment, setAttachment] = useState(null); 

  useEffect(() => {
    if (rowData) {
      setExplanation(rowData.explanation || '');
      setAttachment(rowData.attachment || null); 
    } else {
      setExplanation('');
      setAttachment(null);
    }
  }, [rowData]);

  const handleSave = () => {
    const updatedData = {
      id: rowData ? rowData.id : Date.now(),
      explanation,
      attachment: attachment ? attachment.name : null, // Utilisez .name pour obtenir le nom du fichier
    };

    onSave(updatedData);
    setPopupVisible(false);
  };

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setAttachment(e.target.files[0]); // Met à jour l'objet File sélectionné
    } else {
      setAttachment(null); // Réinitialise à null si aucun fichier n'est sélectionné
    }
  };

  return (
    <div className="popup-container">
      <div>
        <label>Explanation:</label>
        <textarea
          className="form-control"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </div>
      <div>
        <label>Attachment:</label>
        <input
          className="form-control"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <div className="buttons-container">
        <Button text="Save" onClick={handleSave} />
        <Button text="Cancel" onClick={handleCancel} />
      </div>
    </div>
  );
};

export default ExplanationForm;
