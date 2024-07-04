import React, { useState } from 'react';
import { format } from 'date-fns'; 

const AlertComponent = ({ formData, onClose, onModify }) => {
  const leaveTypeName = formData.selectedLeaveType ? formData.selectedLeaveType.name : '';
  const subtypeName = formData.selectedSubtype ? formData.selectedSubtype.name : '';
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);

  // Fonction pour formater une date en 'dd-MM-yyyy'
  const formatDate = (date) => {
    if (date instanceof Date) {
      return format(date, 'dd-MM-yyyy');
    }
    return '';
  };

  // Affiche l'alerte de soumission
  const handleSend = () => {
    setShowSubmitAlert(true);
  };

  // Cache l'alerte de soumission et appelle onClose
  const handleSendConfirm = () => {
    setShowSubmitAlert(false);
    onClose();
  };

  // Cache l'alerte de soumission et appelle onModify
  const handleModify = () => {
    setShowSubmitAlert(false);
    onModify();
  };


  return (
    <div className="alert-container">
      <h3>Vos données soumises :</h3>
      <p><strong>Date de début :</strong> {formatDate(formData.startDate)}</p>
      <p><strong>Date de fin :</strong> {formatDate(formData.endDate)}</p>
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
