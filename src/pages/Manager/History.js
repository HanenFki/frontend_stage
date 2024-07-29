import React, { useState } from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow
} from 'devextreme-react/data-grid';
import { format } from 'date-fns';
import { Button } from 'devextreme-react/button';
import { Popup } from 'devextreme-react/popup';
import ExplanationForm from '../Employe/ExplanationForm';

import FormDemande from '../Form/formDemande';
const employees = [
  {
    name: 'John Heart',
    id: 1,
    color: '#56ca85',
    avatar: 'images/gym/coach-man.png',
    age: 27,
    department: 'Sales',
    fonction: 'Employe'
  },
  {
    name: 'Sandra Johnson',
    id: 2,
    color: '#ff9747',
    avatar: 'images/gym/coach-woman.png',
    age: 25,
    department: 'HR',
    fonction: 'Manager'
  },
  {
    name: 'Hanen',
    id: 3,
    color: '#ff9747',
    avatar: 'images/gym/coach-woman.png',
    age: 25,
    department: 'Sales',
    fonction: 'Employe'
  },
  {
    name: 'Mahdi',
    id: 4,
    color: '#ff9747',
    avatar: 'images/gym/coach-woman.png',
    age: 25,
    department: 'Sales',
    fonction: 'Employe'
  },
  {
    name: 'Firas',
    id: 6,
    color: '#ff9747',
    avatar: 'images/gym/coach-woman.png',
    age: 25,
    department: 'Sales',
    fonction: 'Chef'
  }
];

const initialLeaves = [
  {
    nameemployee: 'mahdi',
    id: 1,
    employeeID: 1,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-06-05'),
    type: 'Annuel',
    status: 'Pending',
    department: 'Sales',
    periodedebut: 'matin',
    periodefin: 'matin',
   
    explanation: 'mmm',
  },
  {
    nameemployee: 'Jhon',
    id: 2,
    employeeID: 7,
    startDate: new Date('2023-07-05'),
    endDate: new Date('2023-07-06'),
    type: 'Sick Leave',
    status: 'Approved',
    department: 'HR',
    periodedebut: 'matin',
    periodefin: 'matin',

    explanation: 'mmm',
  },
  {
    nameemployee: 'Hanen',
    id: 3,
    employeeID: 1,
    startDate: new Date('2023-08-12'),
    endDate: new Date('2023-08-15'),
    type: 'Annuel',
    status: 'Pending',
    department: 'Sales',
    periodedebut: 'matin',
    periodefin: 'matin',
    attachment: 'null',
    explanation: 'mmm',
    
  },
  {
    nameemployee: 'm',
    id: 4,
    employeeID: 1,
    startDate: new Date('2023-04-10'),
    endDate: new Date('2023-04-13'),
    type: 'Annual Leave',
    status: 'Rejected',
    department: 'HR',
    periodedebut: 'matin',
    periodefin: 'matin'
  },
  {
    nameemployee: 'Firas',
    id: 6,
    employeeID: 6,
    startDate: new Date('2023-08-01'),
    endDate: new Date('2023-08-03'),
    type: 'Annuel',
    status: 'Approved',
    department: 'Sales',
    periodedebut: 'matin',
    periodefin: 'matin',
    attachment: null,
    explanation: 'mmm',
  },{
    nameemployee: 'Firas',
    id: 7,
    employeeID: 6,
    startDate: new Date('2023-08-01'),
    endDate: new Date('2023-08-03'),
    type: 'Annuel',
    status: 'Pending',
    department: 'Sales',
    periodedebut: 'matin',
    periodefin: 'matin',
    attachment: null,
    explanation: 'mmm',
  },
  ,{
    nameemployee: 'Firas',
    id: 8,
    employeeID: 6,
    startDate: new Date('2023-07-27'),
    endDate: new Date('2023-07-30'),
    type: 'Annuel',
    status: 'Rejected',
    department: 'Sales',
    periodedebut: 'matin',
    periodefin: 'matin',
   
    explanation: 'mmm',
  },
  {
    nameemployee: 'Sandra Johnson',
    id: 2,
    employeeID: 2,
    startDate: new Date('2023-07-05'),
    endDate: new Date('2023-07-06'),
    type: 'Maladie',
    status: 'Approved',
    department: 'HR',
    periodedebut: 'matin',
    periodefin: 'matin'
  }
    
];

export default function Task() {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [formDemandeVisible, setFormDemandeVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [leaves, setLeaves] = useState(initialLeaves);

  const EmployeeId =2;

  const filteredLeaves = leaves.filter(leave => leave.employeeID === EmployeeId);
  
  const plusClick = () => {
    setFormDemandeVisible(true);
    setSelectedRowData(null);
  };

  const handleEditClick = (rowData) => {
    setSelectedRowData(rowData);
    if (rowData.status === 'Approved') {
      setPopupVisible(true);
    } else if (rowData.status === 'Pending') {
      setFormDemandeVisible(true);
    }
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
        leave.id === updatedData.id ? { ...leave, ...updatedData } : leave
      )
    );
    setFormDemandeVisible(false);
    setPopupVisible(false);
  };

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
      cellRender: (data) => <span>{format(new Date(data.data.startDate), 'dd-MM-yyyy')}</span>,
    },
    {
      dataField: 'endDate',
      caption: 'Due Date',
      dataType: 'date',
      cellRender: (data) => <span>{format(new Date(data.data.endDate), 'dd-MM-yyyy')}</span>,
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
        onClick: ({ row }) => handleEditClick(row.data),
        visible: ({ row }) => row.data.status !== 'Rejected'
      }],
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
        dataSource={filteredLeaves}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        keyExpr="id"
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
}

