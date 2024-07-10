import React from 'react';
import { format } from 'date-fns'; 

const AlertComponent = ({ formData, onClose, onModify }) => {
  const leaveTypeName = formData?.selectedLeaveType?.name || '';
  const subtypeName = formData?.selectedSubtype?.name || '';
  const [showSubmitAlert, setShowSubmitAlert] = React.useState(false);

  // Function to format a date as 'dd-MM-yyyy'
  const formatDate = (date) => {
    if (date instanceof Date) {
      return format(date, 'dd-MM-yyyy');
    }
    return '';
  };

  // Show the submission alert
  const handleSend = () => {
    setShowSubmitAlert(true);
  };

  // Hide the submission alert and call onClose
  const handleSendConfirm = () => {
    setShowSubmitAlert(false);
    onClose();
  };

  // Hide the submission alert and call onModify
  const handleModify = () => {
    setShowSubmitAlert(false);
    onModify();
  };

  if (!formData) {
    return null; // Handle case where formData is null or undefined
  }

  return (
    <div className="alert-container">
      <h3>Vos données soumises :</h3>
      <p><strong>Date de début :</strong> {formatDate(formData.startDate)}</p>
      <p><strong>Date de fin :</strong> {formatDate(formData.endDate)}</p>
      <p><strong>Période de début :</strong> {formData.startPeriod}</p>
      <p><strong>Période de fin :</strong> {formData.endPeriod}</p>
      <p>Type de congé : {leaveTypeName}</p>
      {subtypeName && <p>Sous-type : {subtypeName}</p>}
      <p><strong>Explication:</strong> {formData.explanation}</p>
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
