import React, { useState, useEffect } from 'react';
import { Button } from 'devextreme-react/button';
import './EXPLANTION.css';

const ExplanationForm = ({ setPopupVisible, rowData, onSave }) => {
  const [explanation, setExplanation] = useState('');
  const [attachment, setAttachment] = useState(null); 

  useEffect(() => {
    if (rowData) {
      setExplanation(rowData.explanation || '');
      setAttachment(rowData.attachment || null); 
      console.log('Updated Explanation:', rowData.explanation);
      console.log('Updated Attachment:', rowData.attachment);
    } else {
      setExplanation('');
      setAttachment(null);
    }
  }, [rowData]);
  
  const handleSubmit = () => {
    const updatedData = {
      id: rowData ? rowData.id : Date.now(),
      explanation,
      attachment: attachment ? attachment.name : null,  // Ensure this is correct
    };
  
    onSave(updatedData);
    setPopupVisible(false);
  };
  
  

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setAttachment(e.target.files[0]); 
    } else {
      setAttachment(null); 
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
        <Button className ="form-buttons1" text="Save" onClick={handleSubmit} />
        <Button className ="form-buttons2" text="Cancel" onClick={handleCancel} />
      </div>
    </div>
  );
};

export default ExplanationForm;
