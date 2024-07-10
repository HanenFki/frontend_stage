import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'devextreme-react/button';
import SelectBox from 'devextreme-react/select-box';
import Calendar from 'devextreme-react/calendar';
import ToggleButton from '../Form/toogle'; 
import DateBox from 'devextreme-react/date-box';
import AlertComponent from '../Form/alertBox';
import { leaveTypes } from '../Form/data';
import './EmployeeLeaveForm.css';
const weekendOptions = [
  { value: 'saturday-sunday', label: 'Saturday and Sunday' },
  { value: 'sunday', label: 'Sunday only' }
];

const today = new Date();
const initialValue = [today, new Date(today.getTime())];
const EmployeeLeaveForm = ({ rowData, onSave, onClose }) => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [startPeriod, setStartPeriod] = useState('Morning');
  const [endPeriod, setEndPeriod] = useState('Morning');
  const [type, setType] = useState(null);
  const [subType, setSubType] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [availableSubTypes, setAvailableSubTypes] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [weekendOption, setWeekendOption] = useState('saturday-sunday');
  const [calendarValue, setCalendarValue] = useState(initialValue);
  const [selectionMode, setSelectionMode] = useState('range');

  useEffect(() => {
    if (rowData) {
      setStartDate(new Date(rowData.startDate));
      setEndDate(new Date(rowData.endDate));
      setStartPeriod(rowData.periodedebut);
      setEndPeriod(rowData.periodefin);
      console.log("Type de congé dans rowData :", rowData.type);
      
      // Trouver le type correspondant dans leaveTypes
      const selectedType = leaveTypes.find(option => option.id === rowData.type);
      setType(selectedType || null); // Définir le type en fonction de rowData
      
      setSubType(rowData.subType || null);
      setExplanation(rowData.explanation || '');
      setAttachment(rowData.attachment || null);
      setShowFileUpload(rowData.type === 'Maladie' || rowData.type === 'Décès');
      const newCalendarValue = [startDate, endDate];
      if (calendarValue[0] !== startDate || calendarValue[1] !== endDate) {
        setCalendarValue(newCalendarValue);
      }
    
    } else {
      resetFields();
    }
  }, [rowData]);
  
  const handleWeekendOptionChange = useCallback((value) => {
    setWeekendOption(value);
  }, []);
  const resetFields = useCallback(() => {
    setStartDate(today);
    setEndDate(today);
    setStartPeriod('Morning');
    setEndPeriod('Morning');
    setType(null);
    setSubType(null);
    setExplanation('');
    setAttachment(null);
    setShowFileUpload(false);
    setCalendarValue(initialValue);
  }, [today]);

  const handleSave = useCallback(() => {
    const updatedData = {
      ...rowData,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      periodedebut: startPeriod,
      periodefin: endPeriod,
      type: type ? type.name : null,
      subType,
      explanation,
      attachment: attachment ? attachment.name : null,
    };

    onSave(updatedData);
    onClose();
  }, [startDate, endDate, startPeriod, endPeriod, type, subType, explanation, attachment, rowData, onSave, onClose]);

  const handleCancel = useCallback(() => {
    resetFields();
    onClose();
  }, [resetFields, onClose]);

  const handleFileChange = useCallback((e) => {
    if (e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    } else {
      setAttachment(null);
    }
  }, []);
  const isDateDisabled = useCallback(({ date }) => {
    const day = date.getDay();
    if (date < today) {
      return true;
    }
    if (weekendOption === 'saturday-sunday' && (day === 0 || day === 6)) {
      return true;
    }
    if (weekendOption === 'sunday' && day === 0) {
      return true;
    }
    return false;
  }, [weekendOption]);

  const handleCalendarValueChange = useCallback((e) => {
    if (e && e.value && Array.isArray(e.value) && e.value.length > 0) {
      const newDates = e.value
        .map(date => date instanceof Date ? date : null)
        .filter(Boolean);
  
      if (newDates.length === 2) {
        const [newStartDate, newEndDate] = newDates;
        setStartDate(newStartDate);
        setEndDate(newEndDate);
      } else if (newDates.length === 1) {
        const newStartDate = newDates[0];
        if (newStartDate > endDate) {
          setEndDate(newStartDate);
        } else {
          setStartDate(newStartDate);
        }
      }
  
      setCalendarValue(prevCalendarValue => {
        if (prevCalendarValue[0] !== newDates[0] || prevCalendarValue[1] !== newDates[1]) {
          return newDates;
        }
        return prevCalendarValue;
      });
    } else {
      console.error('Invalid value received from Calendar component:', e);
    }
  }, [endDate]);
  
  const handleStartTimeToggle = (period) => {
    setStartPeriod(period);
  };

  const handleEndTimeToggle = (period) => {
    setEndPeriod(period);
  };
  const handleLeaveTypeChange = useCallback((value) => {
    const selectedType = leaveTypes.find(type => type.id === value);
    setType(selectedType || null); // Définir le type en fonction de la valeur sélectionnée
  
    // Réinitialiser le sous-type si le type change ou le définir en fonction de rowData
    if (selectedType && selectedType.name === 'Décès' && selectedType.subtypes) {
      setSubType(selectedType.subtypes[0]?.name); // Définir le sous-type par défaut pour 'Décès'
    } else {
      setSubType(null); // Réinitialiser le sous-type pour les autres types
    }
  
    // Afficher le téléchargement de fichier en fonction du type sélectionné
    setShowFileUpload(selectedType && (selectedType.name === 'Maladie' || selectedType.name === 'Décès'));
  }, [setType]);
  

  const renderSubtypesSelect = useCallback(() => {
    if (type && type.name === 'Décès' && type.subtypes) {
      return (
        <div className="form-group">
          <label>Sub Type</label>
          <SelectBox
            dataSource={type.subtypes}
            value={subType}
            displayExpr={(item) => item ? `${item.name} ${item.nbjour ? `(${item.nbjour} jours)` : ''}` : ''}
            valueExpr="name"
            onValueChanged={(e) => setSubType(e.value)}
          />
        </div>
      );
    }
    return null;
  }, [type, subType]);

  return (
    <div className="popup-container">
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <div className="field-with-toggle">
              <DateBox
                value={startDate}
                displayFormat="dd-MM-yyyy"
                min={today}
                onValueChanged={(e) => {
                  const newStartDate = e.value;
                  setStartDate(newStartDate);
                  if (newStartDate > endDate) {
                    setEndDate(newStartDate);
                  }
                }}
              />
              <ToggleButton
                value={startPeriod}
                onToggle={(period) => setStartPeriod(period)}
             
              />
            </div>
          </div>
          <div className="form-group">
            <label>End Date</label>
            <div className="field-with-toggle">
              <DateBox
                value={endDate}
                displayFormat="dd-MM-yyyy"
                min={startDate}
                onValueChanged={(e) => setEndDate(e.value)}
              />
              <ToggleButton
                value={endPeriod}
                onToggle={(period) => setEndPeriod(period)}
                
              />
            </div>
          </div>
        </div>
        <div className="form-row">
        <div className="form-group">
  <label>Leave Type</label>
  <SelectBox
    dataSource={leaveTypes}
    displayExpr="name"
    valueExpr="id"
   
    onValueChanged={(e) => handleLeaveTypeChange(e.value)}
  />



            {renderSubtypesSelect()}
            {showFileUpload && (
              <div className="form-group">
                <label>Attachment</label>
                <input type="file" onChange={handleFileChange} />
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
              <Calendar
                showWeekNumbers={true}
                selectionMode={selectionMode}
                value={calendarValue}
                onValueChanged={handleCalendarValueChange}
                disabledDates={isDateDisabled}
                max={new Date(today.getFullYear(), 11, 31)}
                width={400}
              />
              <SelectBox
                id="weekendOption"
                dataSource={weekendOptions}
                displayExpr="label"
                valueExpr="value"
                value={weekendOption}
                onValueChanged={(e) => handleWeekendOptionChange(e.value)}
              />
            </div>
        <div className="form-row">
          <div className="form-group full-width">
            <label>Explanation</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={5}
            />
          </div>
        </div>
        <div className="button-group">
          <Button text="Cancel" onClick={handleCancel} />
          <Button text="Save" type="submit" onClick={handleSave} />
        </div>
      </form>
    </div>
  );
};

export default EmployeeLeaveForm;
