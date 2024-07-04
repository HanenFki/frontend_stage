import React, { useState, useCallback, useEffect } from 'react';
import SelectBox from 'devextreme-react/select-box';
import Calendar from 'devextreme-react/calendar';
import ToggleButton from './toogle';
import { leaveTypes } from './data';
import AlertComponent from './alertBox';
import { Button } from 'devextreme-react/button';

import DateBox from 'devextreme-react/date-box';
import { format } from 'date-fns';
import './style.css';

const weekendOptions = [
  { value: 'saturday-sunday', label: 'Samedi et Dimanche' },
  { value: 'sunday', label: 'Dimanche seulement' }
];

const msInDay = 1000 * 60 * 60 * 24;
const today = new Date();
const initialValue = [today, new Date(today.getTime() + msInDay)];



const FormDemande = () => {
  const [selectWeekOnClick, setSelectWeekOnClick] = useState(true);
  const [selectionMode, setSelectionMode] = useState('range');
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [calendarValue, setCalendarValue] = useState(initialValue);
  const [startPeriod, setStartPeriod] = useState('Matin');
  const [endPeriod, setEndPeriod] = useState('Matin');
  const [weekendOption, setWeekendOption] = useState('saturday-sunday');
  const [selectedSubtype, setSelectedSubtype] = useState(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

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

  const handleLeaveTypeChange = useCallback((value) => {
    const selectedType = leaveTypes.find(type => type.id === value);
    setSelectedLeaveType(selectedType);

    if (selectedType && selectedType.name === 'Décès' && selectedType.subtypes) {
      setSelectedSubtype(selectedType.subtypes[0].id);
    } else {
      setSelectedSubtype(null);
    }

    setShowFileUpload(selectedType && (selectedType.name === 'Maladie' || selectedType.name === 'Décès'));
  }, []);

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

  useEffect(() => {
    const newCalendarValue = [startDate, endDate];
    if (calendarValue[0] !== startDate || calendarValue[1] !== endDate) {
      setCalendarValue(newCalendarValue);
    }
  }, [startDate, endDate]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  
    if (!selectedLeaveType) {
      alert("Veuillez sélectionner un type de congé.");
      return;
    }
  
    const data = {
      selectedLeaveType,
      selectedSubtype,
      startDate: new Date(startDate), 
      endDate: new Date(endDate),
      startPeriod,
      endPeriod,
    };
  
    setFormData(data);
    setShowAlert(true);
  }, [selectedLeaveType, selectedSubtype, startDate, endDate, startPeriod, endPeriod]);
  

  const handleAlertClose = () => {
    setShowAlert(false);
    setFormData(null);
  };

  const handleModify = () => {
    setShowAlert(false); 
  };

  const onClearButtonClick = () => {
    setStartDate(today);
    setEndDate(today);
    setCalendarValue(initialValue);
    setStartPeriod('Matin');
    setEndPeriod('Matin');
    setShowFileUpload(false);
    setSelectedLeaveType(null);
  };

  const handleWeekendOptionChange = useCallback((value) => {
    setWeekendOption(value);
  }, []);

  const renderSubtypesSelect = () => {
    if (selectedLeaveType && selectedLeaveType.name === 'Décès' && selectedLeaveType.subtypes) {
      return (
        <div className="form-group">
          <SelectBox
            id="subtype"
            dataSource={selectedLeaveType.subtypes}
            value={selectedSubtype}
            displayExpr={(item) => item ? `${item.name} ${item.nbjour ? `(${item.nbjour} jours)` : ''}` : ''}
            valueExpr="id"
            onValueChanged={(e) => setSelectedSubtype(e.value)}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className='content-block'>
    
      <h2>Demande de congé</h2>
     
       
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group date-and-toggle">
            <div className="date-fields">
              <label htmlFor="startDate">Start Date</label>
              <DateBox
                id="startDate"
                type="date"
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
              <label htmlFor="endDate">End Date</label>
              <DateBox
                id="endDate"
                type="date"
                value={endDate}
                displayFormat="dd-MM-yyyy"
                min={startDate}
                onValueChanged={(e) => setEndDate(e.value)}
              />
            </div>
            <div className="toggle-buttons">
              <ToggleButton
                value={startPeriod}
                onToggle={handleStartTimeToggle}
              />
              <ToggleButton
                value={endPeriod}
                onToggle={handleEndTimeToggle}
              />
            </div>
            <div className="calendar-container">
              <Calendar
                showWeekNumbers={true}
                selectWeekOnClick={selectWeekOnClick}
                selectionMode={selectionMode}
                value={calendarValue}
                onValueChanged={handleCalendarValueChange}
                disabledDates={isDateDisabled}
              />
              <div className="options">
                <div className="option">
                  <span>Week-end :</span>
                  <SelectBox
                    className="select-box"
                    dataSource={weekendOptions}
                    value={weekendOption}
                    displayExpr="label"
                    valueExpr="value"
                    onValueChanged={(e) => handleWeekendOptionChange(e.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="select">
            <label htmlFor="leaveType">Type</label>
            <SelectBox
              id="leaveType"
              dataSource={leaveTypes}
              valueExpr="id"
              value={selectedLeaveType ? selectedLeaveType.id : null}
              displayExpr={(item) => item ? `${item.name}${item.nbjour ? ` (${item.nbjour} jours)` : ''}` : ''}
              onValueChanged={(e) => handleLeaveTypeChange(e.value)}
            />
          </div>
          
          {renderSubtypesSelect()}

          {showFileUpload && (
            <div className="form-group">
              <label htmlFor="fileUpload">Télécharger un fichier :</label>
              <input type="file" id="fileUpload" />
            </div>
          )}

          <Button className='form-buttons'
            text="Submit"
            type="submit"
            useSubmitBehavior={true}
          />
          <Button className='form-buttons'
            text="Reset"
            onClick={onClearButtonClick}
          />
        </form>
      </div>
      {showAlert && formData && (
  <AlertComponent
    message="Votre demande a été soumise !"
    onClose={handleAlertClose}
    onModify={handleModify}
    formData={formData}
  />
)}

    </div>
  );
};

export default FormDemande;
