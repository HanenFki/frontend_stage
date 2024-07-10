import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from 'devextreme-react/button';
import DataGrid, { Column, Pager, Paging, FilterRow } from 'devextreme-react/data-grid';
import { Popup } from 'devextreme-react/popup';
import ExplanationForm from './ExplanationForm';
import EmployeeLeaveForm from './employeleaveForm';
import FormDemande from '../Form/formDemande';


const initialLeaves = [
  {
    nameemployee:'mahdi',
    id: 1,
    employeeID: 1,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-06-05'),
    type: 'Annual Leave',
    subType:null,
    status: 'Approved',
    department: 'Sales',
    periodedebut:'matin',
    periodefin:'matin',
    explanation: 'mmm',
    attachment: null,
  },
  {
    nameemployee:'mahdi',
    id: 2,
    employeeID: 1,
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-05'),
    type: 'Décès',
    subType:'Grand parent',
    status: 'Pending',
    department: 'Sales',
    periodedebut:'matin',
    periodefin:'matin',
    explanation: 'hh',
    attachment:'certif.txt'
  },
  {
    nameemployee:'hanen',
    id: 3,
    employeeID: 2,
    startDate: new Date('2023-07-05'),
    endDate: new Date('2023-07-06'),
    type: 'Sick Leave',
    status: 'Approved',
    department: 'HR',
    periodedebut:'matin',
    periodefin:'matin',
    explanation: 'null'
  },
  {
    nameemployee:'mahdi',
    id: 4,
    employeeID: 1,
    startDate: new Date('2023-08-12'),
    endDate: new Date('2023-08-15'),
    type: 'Annuel',
    subType:null,
    status: 'Pending',
    department: 'Sales',
    periodedebut:'Après-midi',
    periodefin:'matin',
    explanation: 'null',
    attachment: null,
  },
  {
    nameemployee:'mahdi',
    id: 5,
    employeeID: 1,
    startDate: new Date('2023-04-10'),
    endDate: new Date('2023-04-13'),
    type: 'Annual Leave',
    subType:null,
    status: 'Rejected',
    department: 'Sales',
    periodedebut:'matin',
    periodefin:'aprés midi',
    explanation: 'null',
    attachment: null,
  },
  {
    nameemployee:'mahdi',
    id: 6,
    employeeID: 1,
    startDate: new Date('2024-07-12'),
    endDate: new Date('2024-07-15'),
    type: 'Maladie',
    subType:null,
    status: 'Pending',
    department: 'Sales',
    periodedebut:'Après-midi',
    periodefin:'matin',
    explanation: 'null',
    attachment: null,
  },
];

const Historique = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [formDemandeVisible, setFormDemandeVisible] = useState(false);
  const [leaves, setLeaves] = useState(initialLeaves); 

  const EmployeeId = 1;

  const filteredLeaves = leaves.filter(leave => leave.employeeID === EmployeeId);

  const plusClick = () => {
    setFormDemandeVisible(true);
    setSelectedRowData(null);
  };

  const editClick = (rowData) => {
    setSelectedRowData(rowData);
    setFormDemandeVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const closeFormDemande = () => {
    setFormDemandeVisible(false);
  };

  const handleSaveLeave = (updatedData) => {
    setLeaves(prevLeaves => {
      const updatedLeaves = prevLeaves.map(leave =>
        leave.id === updatedData.id ? { ...leave, ...updatedData } : leave
      );
      return updatedLeaves;
    });
    setPopupVisible(false);
  };
  const hasSubtype = leaves.filter(leave => leave.subType !== undefined && leave.subType !== null);
  
  
  const columns = [
    {
      dataField: 'nameemployee',
      caption: 'Name',
      hidingPriority: 3,
    },
    {
      dataField: 'startDate',
      caption: 'Start Date',
      dataType: 'date',
     
      cellRender: (data) => <span>{format(data.data.startDate, 'dd-MM-yyyy')}</span>,
    },
    {
      dataField: 'endDate',
      caption: 'Due Date',
      dataType: 'date',
      cellRender: (data) => <span>{format(data.data.endDate, 'dd-MM-yyyy')}</span>,
    },
    {
      dataField: 'periodedebut',
      caption: 'Start Period',
     
    },
    {
      dataField: 'periodefin',
      caption: 'End Period',
     
    },
    {
      dataField: 'type',
      caption: 'Type',
    },
    {
     
      dataField: 'subType',
      caption: 'Subtype',
      visible:hasSubtype,
      hidingPriority: 3,
    },
    {
      dataField: 'explanation',
      caption: 'Explanation',
      hidingPriority: 1,
    },
    {
      dataField: 'attachment',
      caption: 'Attachment',
      hidingPriority: 4,

    },
    {
      dataField: 'status',
      width: 190,
      caption: 'Status',
    },
    {
      caption: 'Actions',
      type: 'buttons',
      buttons: [{
        hint: 'Edit',
        icon: 'edit',
        onClick: ({ row }) => editClick(row.data),
        visible: ({ row }) => row.data.status !== 'Rejected'
      }],
    },
  ];

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Historique</h2>
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
        dataSource={filteredLeaves}
        keyExpr="id"
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
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
        <ExplanationForm rowData={selectedRowData}   
         onClose={closePopup}
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
/>

      </Popup>
    </React.Fragment>
  );
};

export default Historique;

export const employees = [
  {
    text: 'John Heart',
    id: 1,
    color: '#56ca85',
    avatar: 'images/gym/coach-man.png',
    age: 27,
    department: 'Sales',
  },
  {
    text: 'Sandra Johnson',
    id: 2,
    color: '#ff9747',
    avatar: 'images/gym/coach-woman.png',
    age: 25,
    department: 'HR',
  },
];

const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];
