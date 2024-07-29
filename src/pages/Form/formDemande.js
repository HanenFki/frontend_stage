import React, { useState, useCallback, useEffect } from 'react';
import SelectBox from 'devextreme-react/select-box';
import Calendar from 'devextreme-react/calendar';
import ToggleButton from './toogle';
import AlertComponent from './alertBox';
import { Button } from 'devextreme-react/button';
import DateBox from 'devextreme-react/date-box';
import './style.css'; 
import { leaveTypes } from './data';

const weekendOptions = [
  { value: 'saturday-sunday', label: 'Saturday and Sunday' },
  { value: 'sunday', label: 'Sunday only' }
];

const today = new Date();
const initialValue = [today, new Date(today.getTime())];

const FormDemande = ({ popupVisible, setPopupVisible, rowData,handleSaveLeave, setFormDemandeVisible }) => {
  const [selectWeekOnClick, setSelectWeekOnClick] = useState(true);
  const [selectionMode, setSelectionMode] = useState('range');
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [calendarValue, setCalendarValue] = useState(initialValue);
  const [selectedPeriod, setSelectedPeriod] = useState('Morning');
  const [selectedEndPeriod, setSelectedEndPeriod] = useState('Morning');
  const [weekendOption, setWeekendOption] = useState('saturday-sunday');
  const [selectedSubtype, setSelectedSubtype] = useState(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [employeeId, setEmployeeId] = useState(1);
  const [explanation, setExplanation] = useState('');
  const [attachment, setAttachment] = useState(null); 
  useEffect(() => {
    if (rowData) {
      setSelectedLeaveType(rowData.type);
      setSelectedSubtype(rowData.subType); 
      setStartDate(rowData.startDate);
      setEndDate(rowData.endDate);
      setSelectedPeriod(rowData.periodedebut);
      setSelectedEndPeriod(rowData.periodefin);
      setExplanation(rowData.explanation);
      setAttachment(rowData.attachment || null); 
    } else {
      resetFields();
    }
  }, [rowData]);
  

 
  const resetFields = () => {
    setStartDate(today);
    setEndDate(today);
    setCalendarValue(initialValue);
    setSelectedPeriod('Morning');
    setSelectedEndPeriod('Morning');
    setShowFileUpload(false);
    setSelectedLeaveType(null);
    setSelectedSubtype(null);
    setExplanation('');
  };

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
  const handlePeriodToggle = (period) => {
    setSelectedPeriod(period);
    if (rowData) {
      rowData.periodedebut = period;
    }
  };
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

  const handleEndPeriodToggle = (period) => {
    setSelectedEndPeriod(period);
    if (rowData) {
      rowData.periodefin = period;
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setAttachment(file.name);  
    } else {
      setAttachment(null);
    }
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
      alert("Please select a leave type.");
      return;
    }
  
    const data = {
      selectedLeaveType,
      selectedSubtype,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      selectedPeriod,
      selectedEndPeriod,
      employeeId,
      explanation,
      attachment,  // This should already be just the filename
    };
  
    if (rowData) {
      // Update the record in the table
      const updatedRowData = { ...rowData, ...data };
      handleSaveLeave(updatedRowData);
      setFormDemandeVisible(false);
    } else {
      // Add new data
      setFormData(data);
      setShowAlert(true);
    }
  }, [selectedLeaveType, selectedSubtype, startDate, endDate, selectedPeriod, selectedEndPeriod, explanation, attachment, employeeId, rowData]);
    const handleModify = () => {
      setShowAlert(false); 
    };
    
    const handleAlertClose = () => {
      setShowAlert(false);
      setFormData(null); 
    };

  const onClearButtonClick = () => {
    resetFields();
  };

  const handleWeekendOptionChange = useCallback((value) => {
    setWeekendOption(value);
  }, []);

  const handleLeaveTypeChange = useCallback((value) => {
    setSelectedLeaveType(value);
    const leaveType = leaveTypes.find(type => type.name === value);
    
    if (leaveType && (leaveType.name === 'Décès' || leaveType.name === 'Maladie')) {
      setShowFileUpload(true);
      if (leaveType.subtypes) {
        setSelectedSubtype(leaveType.subtypes[0].id);
      }
    } else {
      setShowFileUpload(false);
      setSelectedSubtype(null);
    }
    if (rowData) {
      rowData.type = value;
    }
  }, [rowData]);
  
  useEffect(() => {
    if (rowData) {
      setSelectedLeaveType(rowData.type);
      const leaveType = leaveTypes.find(type => type.name === rowData.type);
      if (leaveType && leaveType.subtypes) {
        setSelectedSubtype(rowData.subType);
      }
    }
  }, [rowData]);
  useEffect(() => {
    if (selectedLeaveType) {
      const leaveType = leaveTypes.find(type => type.name === selectedLeaveType);
      if (leaveType && (leaveType.name === 'Décès' || leaveType.name === 'Maladie')) {
        setShowFileUpload(true);
      } else {
        setShowFileUpload(false);
      }
    }
  }, [selectedLeaveType]);
  const handleSubtypeChange = useCallback((value) => {
    setSelectedSubtype(value);
    if (rowData) {
      rowData.subType = value;
    }
  }, [rowData]);
  
  const renderSubtypesSelect = () => {
    const leaveType = leaveTypes.find(type => type.name === selectedLeaveType);
    if (leaveType && leaveType.subtypes) {
      return (
        <div className="form-group">
          <label>Subtype</label>
          <SelectBox
            id="subtype"
            dataSource={leaveType.subtypes}
             displayExpr="name"
            valueExpr="name"
           
            value={selectedSubtype}
            onValueChanged={(e) => handleSubtypeChange(e.value)}
          />
           
        </div>
      );
    }
    return null;
  };
  return (
    <div className='content-block'>
      {showAlert && (
        <AlertComponent
          formData={formData}
          onClose={handleAlertClose}
          onModify={handleModify}
        />
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="column-container">
          {/* Left Column */}
          <div className="left-column">
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
                <ToggleButton selected={selectedPeriod} onToggle={handlePeriodToggle} />
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
            <ToggleButton selected={selectedEndPeriod} onToggle={handleEndPeriodToggle} />

              </div>
            </div>
          
            <div className="form-group">
              <label>Leave Type</label>
          <SelectBox
                dataSource={leaveTypes}
                displayExpr="name"
                valueExpr="name"
                showClearButton={false}
                //displayValue={selectedLeaveType}
                value={selectedLeaveType}

                
                onValueChanged={(e) => handleLeaveTypeChange(e.value)}
              />

              {renderSubtypesSelect()}
              {showFileUpload && (
                <div className="form-group">
                   <label>Attachment:</label>
        <input
         
          type="file"
          onChange={handleFileChange}
        />
                </div>
              )}
            </div>

          </div>
          {/* Right Column */}
          <div className="right-column">
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
          </div>
        </div>
        <div >
          <label>Justification</label>
          <textarea 
           
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
           
          />
        </div>
        <div className="form-group">
          <Button className='form-buttons1 '
            text="Soumettre"
           
            stylingMode="contained"
            useSubmitBehavior={true}
          />
          <Button className='form-buttons2'
            text="Effacer"
           
            onClick={onClearButtonClick}
          />
        </div>
      </form>
    </div>
  );
};

export default FormDemande;