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
import FormDemande from '../Form/formDemande';
import { Popup } from 'devextreme-react/popup';
import ExplanationForm from '../Employe/ExplanationForm';
import EmployeeLeaveForm from '../Employe/employeleaveForm';

export default function Task() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [formDemandeVisible, setFormDemandeVisible] = useState(false);
  const [leave, setLeave] = useState(leaves); 

  const plusClick = () => {
    setFormDemandeVisible(true);
    setSelectedRowData(null);
  };

  const closeFormDemande = () => {
    setFormDemandeVisible(false);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const editClick = (rowData) => {
    setSelectedRowData(rowData);
    setPopupVisible(true);
  };

  const handleSaveLeave = (updatedData) => {
    setLeave(prevLeaves => {
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
      <h2 className={'content-block'}>Leave History</h2>
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
        dataSource={leave}
        showBorders={false}
         keyExpr="id"
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        {columns.map((column, index) => (
          <Column key={index} {...column} />
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
          onClose={closePopup}
          onSave={handleSaveLeave}
        />
      </Popup>
      <Popup
        visible={popupVisible && (!selectedRowData || selectedRowData.status === 'Pending')}
        onHiding={closePopup}
        showCloseButton={true}
        title="Employee Leave Form"
        width={900}
        height={600}
      >
        <EmployeeLeaveForm
          rowData={selectedRowData}
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
        <FormDemande onClose={closeFormDemande} />
      </Popup>
    </React.Fragment>
  );
}

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

const leaves = [
  {
    nameemployee: 'mahdi',
    id: 1,
    employeeID: 1,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-06-05'),
    type: 'Annual Leave',
    status: 'Approved',
    department: 'Sales',
    periodedebut: 'matin',
    periodefin: 'matin'
  },
  {
    nameemployee: 'Jhon',
    id: 2,
    employeeID: 2,
    startDate: new Date('2023-07-05'),
    endDate: new Date('2023-07-06'),
    type: 'Sick Leave',
    status: 'Approved',
    department: 'HR',
    periodedebut: 'matin',
    periodefin: 'matin'
  },
  {
    nameemployee: 'Hanen',
    id: 3,
    employeeID: 1,
    startDate: new Date('2023-08-12'),
    endDate: new Date('2023-08-15'),
    type: 'Annual Leave',
    status: 'Pending',
    department: 'Sales',
    periodedebut: 'matin',
    periodefin: 'matin'
  },
  {
    nameemployee: 'wael',
    id: 4,
    employeeID: 1,
    startDate: new Date('2023-04-10'),
    endDate: new Date('2023-04-13'),
    type: 'Annual Leave',
    status: 'Rejected',
    department: 'HR',
    periodedebut: 'matin',
    periodefin: 'matin'
  }
];
