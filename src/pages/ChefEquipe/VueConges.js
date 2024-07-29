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
import TextBox from 'devextreme-react/text-box';
import ExplanationForm from '../Employe/ExplanationForm';
import PopupReject from '../popup/Popup.Reject';
import FormDemande from '../Form/formDemande';

export default function VueConges() {
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
      attachment :'robots.txt'
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
      periodefin: 'matin',
      attachment :'null'
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
      attachment :'null'
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
    }
  ];

  const chef = employees.find(emp => emp.fonction === 'Chef');
  const department = chef ? chef.department : null;
  const leavesFiltered = initialLeaves.filter(leave => leave.department === department);

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [formDemandeVisible, setFormDemandeVisible] = useState(false);
  const [leaves, setLeaves] = useState(leavesFiltered);
  const [rejectionReason, setRejectionReason] = useState('');
  const [currentLeave, setCurrentLeave] = useState(null);
  const onStatusChange = (id, status, reason = '') => {
    const updatedLeaves = leaves.map(leave =>
      leave.id === id ? { ...leave, status, rejectionReason: reason } : leave
    );
    setLeaves(updatedLeaves);
  };

  const plusClick = () => {
    setFormDemandeVisible(true);
    setSelectedRowData(null);
  };

  const closeFormDemande = () => {
    setFormDemandeVisible(false);
  };

  const editClick = (rowData) => {
    setSelectedRowData(rowData);
    setFormDemandeVisible(true);
  };
  const showRejectPopup = (leave) => {
    setCurrentLeave(leave);
    setPopupVisible(true);
  };

  const handleReject = () => {
    onStatusChange(currentLeave.id, 'Rejected', rejectionReason);
    setPopupVisible(false);
    setRejectionReason('');
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

  const handleSaveLeave = (updatedData) => {
    setLeaves(prevLeaves => {
      const updatedLeaves = prevLeaves.map(leave =>
        leave.id === updatedData.id ? { ...leave, ...updatedData } : leave
      );
      return updatedLeaves;
    });
    setPopupVisible(false);
  };

  const renderCell = (data, field) => {
    if (field === 'startDate' || field === 'endDate') {
      return <span>{format(new Date(data.data[field]), 'dd-MM-yyyy')}</span>;
    }
    return data.data[field];
  };
  const handleApprove = (rowData) => {
    onStatusChange(rowData.id, 'Approved');
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
      buttons: [
        {
          hint: 'Update',
          icon: 'edit',
          onClick: ({ row }) => handleEditClick(row.data),
          visible: ({ row }) => row.data.status !== 'Rejected',
        },
        {
          hint: 'Check',
          icon: 'check',
          onClick: ({ row }) => handleApprove(row.data),
          visible: ({ row }) => row.data.status === 'Pending',
        },
        {
          hint: 'Remove',
          icon: 'remove',
          onClick: ({ row }) => showRejectPopup(row.data),
          visible: ({ row }) => row.data.status === 'Pending'  ,
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Management of Leave Requests</h2>
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
    handleSaveLeave={handleSaveLeave}
    setFormDemandeVisible={setFormDemandeVisible}
  />
</Popup>
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
   <PopupReject
        visible={popupVisible && currentLeave !== null}
        onClose={closePopup}
        onSubmit={handleReject}
        reason={rejectionReason}
        setReason={setRejectionReason}
      />
    </React.Fragment>
  );
}