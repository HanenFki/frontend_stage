import React from 'react';
import { format } from 'date-fns';
import './alertBox.css'; // Import the CSS file

const AlertComponent = ({ formData, onClose, onModify }) => {
  const [showToast, setShowToast] = React.useState(false);

  const leaveTypeName = formData?.selectedLeaveType?.name || formData?.selectedLeaveType || '';
  const subtypeName = formData?.selectedSubtype?.name || formData?.selectedSubtype || '';

  // Function to format a date as 'dd-MM-yyyy'
  const formatDate = (date) => {
    if (date instanceof Date) {
      return format(date, 'dd-MM-yyyy');
    }
    return '';
  };

  
  const handleSend = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 3000); 
  };

  // Handle modification
  const handleModify = () => {
    setShowToast(false);
    onModify();
  };

  if (!formData) {
    return null;
  }

  return (
    <div>
      {!showToast && (
        <div className="alert-container">
          <h3>Vos données soumises :</h3>
          <p><strong>Start date :</strong> {formatDate(formData.startDate)}</p>
          <p><strong>End date :</strong> {formatDate(formData.endDate)}</p>
          <p><strong>Start period :</strong> {formData.selectedPeriod}</p>
          <p><strong>End period :</strong> {formData.selectedEndPeriod}</p>
          <p><strong>Leave Type :</strong> {leaveTypeName}</p>
          {subtypeName && <p>Sub-type : {subtypeName}</p>}
          <p><strong>Explanation:</strong> {formData.explanation}</p>
          <p><strong>Attachment :</strong> {formData.attachment}</p>
          <div className="alert-buttons">
            <button className='form-buttons1' onClick={handleSend}>Submit</button>
            <button className='form-buttons2' onClick={handleModify}>Modify</button>
          </div>
        </div>
      )}

      {showToast && (
        <div className="custom-alert">
          <p>Votre demande a été soumise !</p>
       
        </div>
      )}
    </div>
  );
};

export default AlertComponent;
