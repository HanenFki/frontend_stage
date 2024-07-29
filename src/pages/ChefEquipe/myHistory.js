import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Pager, Paging, FilterRow } from 'devextreme-react/data-grid';
import { Popup } from 'devextreme-react/popup';
import ExplanationForm from '../Employe/ExplanationForm';
import { Button } from 'devextreme-react/button';
import FormDemande from '../Form/formDemande';
import { fetchEmployeeLeaves } from '../../api/api';
import useAuth from '../../hooks/useAuth'; 
import { format } from 'date-fns';

const MyHistory = () => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [formDemandeVisible, setFormDemandeVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogin, token] = useAuth();

  useEffect(() => {
    const loadEmployeeLeaves = async () => {
      if (!token) {
        console.error('No token available');
        setLoading(false);
        return;
      }
      
      try {
        console.log('Fetching employee leaves...');
        const data = await fetchEmployeeLeaves(token);
        console.log('Data fetched:', data);
      
        if (Array.isArray(data)) {
          if (data.length === 0) {
            console.log('No data available');
          }
          setLeaves(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching employee leaves:', error);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
  
    loadEmployeeLeaves();
  }, [token]); 
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (leaves.length === 0) return <div>No data available.</div>;

  const handleEditClick = (rowData) => {
    setSelectedRowData(rowData);
    if (rowData.status === 'Approved') {
      setPopupVisible(true);
    } else if (rowData.status === 'Pending') {
      setFormDemandeVisible(true);
    }
  };

  const plusClick = () => {
    setFormDemandeVisible(true);
    setSelectedRowData(null);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const closeFormDemande = () => {
    setFormDemandeVisible(false);
  };

  const handleSaveLeave = (updatedData) => {
    console.log('Saving Data:', updatedData);
    setLeaves(prevLeaves =>
      prevLeaves.map(leave =>
        leave._id === updatedData._id ? { ...leave, ...updatedData } : leave
      )
    );
    setFormDemandeVisible(false);
    setPopupVisible(false);
  };

  const columns = [
    { dataField: 'firstName', caption: 'Name', hidingPriority: 3 },
    { 
      dataField: 'startDate', 
      caption: 'Start Date', 
      dataType: 'date',
      cellRender: ({ data }) => <span>{format(new Date(data.startDate), 'dd-MM-yyyy')}</span>,
    },
    { 
      dataField: 'endDate', 
      caption: 'Due Date', 
      dataType: 'date',
      cellRender: ({ data }) => <span>{format(new Date(data.endDate), 'dd-MM-yyyy')}</span>,
    },
    { dataField: 'startPeriod', caption: 'Start Period' },
    { dataField: 'endPeriod', caption: 'End Period' },
    { dataField: 'leaveTypeId', caption: 'Type' },
    { dataField: 'subType', caption: 'Subtype', hidingPriority: 3 },
    { dataField: 'explanation', caption: 'Explanation', hidingPriority: 1 },
    { dataField: 'attachment', caption: 'Attachment', hidingPriority: 4 },
    { dataField: 'status', width: 190, caption: 'Status' },
    {
      caption: 'Actions',
      type: 'buttons',
      buttons: [
        {
          hint: 'Update',
          icon: 'edit',
          onClick: ({ row }) => handleEditClick(row.data),
          visible: ({ row }) => row.data.status !== 'Rejected',
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <h2 className={'content-block'}>My History</h2>
      <div className="dx-field">
        <div className="dx-field-label"></div>
        <div className="dx-field-value">
          <Button
            icon="plus"
            stylingMode="text"
            text="Add Demand"
            elementAttr={{ style: { fontSize: '34px', backgroundColor: '#ff6200d3', borderRadius: '30%', color: '#ffffff' } }}
            onClick={plusClick}
          />
        </div>
      </div>

      <DataGrid
        className={'dx-card wide-card'}
        dataSource={leaves}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        keyExpr="_id"
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        {columns.map((col, index) => (
          <Column key={index} {...col} />
        ))}
      </DataGrid>

      <Popup
        visible={popupVisible && selectedRowData && selectedRowData.status === 'Approved'}
        onHiding={closePopup}
        showCloseButton={true}
        title="Explanation Form"
        width={600}
        height={400}
      >
        <ExplanationForm
          rowData={selectedRowData}
          onSave={handleSaveLeave}
          setPopupVisible={setPopupVisible}
        />
      </Popup>

      <Popup
        visible={formDemandeVisible}
        onHiding={closeFormDemande}
        showCloseButton={true}
        title="Form Demande"
        width={1100}
        height={680}
      >
        <FormDemande
          popupVisible={popupVisible}
          setPopupVisible={setPopupVisible}
          rowData={selectedRowData}
          handleSaveLeave={handleSaveLeave}
          setFormDemandeVisible={setFormDemandeVisible}
        />
      </Popup>
    </React.Fragment>
  );
};

export default MyHistory;
