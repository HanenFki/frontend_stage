import React, { useState } from 'react';

const AlertComponent = ({ formData, onClose, onModify }) => {
  const leaveTypeName = formData.selectedLeaveType ? formData.selectedLeaveType.name : '';
  const subtypeName = formData.selectedSubtype ? formData.selectedSubtype.name : '';
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
 // Afficher l'alerte de soumission
  const handleSend = () => {
    setShowSubmitAlert(true);
  };
// Cacher l'alerte de soumission
  const handleSendConfirm = () => {
    setShowSubmitAlert(false); 
    onClose(); 
    
  };

  const handleModify = () => {
    setShowSubmitAlert(false); // Cacher l'alerte de soumission
    onModify(); 
  };

  return (
    <div className="alert-container">
      <h3>Vos données soumises :</h3>
      <p><strong>Date de début :</strong> {formData.startDate.toISOString().split('T')[0]}</p>
      <p><strong>Date de fin :</strong> {formData.endDate.toISOString().split('T')[0]}</p>
      <p><strong>Période de début :</strong> {formData.startPeriod}</p>
      <p><strong>Période de fin :</strong> {formData.endPeriod}</p>
      <p>Type de congé : {leaveTypeName}</p>
      {subtypeName && <p>Sous-type : {subtypeName}</p>}
      <div className="alert-buttons">
        <button onClick={handleSend}>Envoyer</button>
        <button onClick={handleModify}>Modifier</button>
      </div>

      {showSubmitAlert && (
        <div className="custom-alert">
          <p>Votre demande a été soumise !</p>
          <div className="alert-buttons">
            <button onClick={handleSendConfirm}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertComponent;
