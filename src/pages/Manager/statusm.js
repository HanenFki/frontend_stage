import React, { useState } from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow
} from 'devextreme-react/data-grid';
import Button from 'devextreme-react/button';
import Popup from 'devextreme-react/popup';
import TextBox from 'devextreme-react/text-box';

export default function Task() {
  const [leaves, setLeaves] = useState([
    {
      nameemployee: 'mahdi',
      id: 1,
      employeeID: 1,
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-06-05'),
      type: 'Annual Leave',
      status: 'Pending',
      department: 'Sales',
      periodedebut: 'matin',
      periodefin: 'matin',
      rejectionReason: ''
    },
    {
      nameemployee: 'Jhon',
      id: 2,
      employeeID: 2,
      startDate: new Date('2023-07-05'),
      endDate: new Date('2023-07-06'),
      type: 'Sick Leave',
      status: 'Pending',
      department: 'HR',
      periodedebut: 'matin',
      periodefin: 'matin',
      rejectionReason: ''
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
      periodefin: 'matin',
      rejectionReason: ''
    },
    {
      nameemployee: 'wael',
      id: 4,
      employeeID: 1,
      startDate: new Date('2023-04-10'),
      endDate: new Date('2023-04-13'),
      type: 'Annual Leave',
      status: 'Pending',
      department: 'HR',
      periodedebut: 'matin',
      periodefin: 'matin',
      rejectionReason: 'Not enough leave balance'
    }
  ]);

  const [popupVisible, setPopupVisible] = useState(false);
  const [currentLeaveId, setCurrentLeaveId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const onStatusChange = (id, status, reason = '') => {
    console.log(`Leave ID: ${id}, New Status: ${status}, Reason: ${reason}`);
    const updatedLeaves = leaves.map(leave =>
      leave.id === id ? { ...leave, status, rejectionReason: reason } : leave
    );
    setLeaves(updatedLeaves);
  };

  const showRejectPopup = (id) => {
    setCurrentLeaveId(id);
    setPopupVisible(true);
  };

  const handleReject = () => {
    onStatusChange(currentLeaveId, 'Rejected', rejectionReason);
    setPopupVisible(false);
    setRejectionReason('');
  };

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Management of Leave Requests</h2>

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

        <Column dataField={'nameemployee'} caption={'Name'} hidingPriority={3} />
        <Column dataField={'startDate'} caption={'Start Date'} dataType={'date'} hidingPriority={3} />
        <Column dataField={'endDate'} caption={'End Date'} dataType={'date'} hidingPriority={4} />
        <Column dataField={'periodedebut'} caption={'Start Periode'} name={'Priority'} hidingPriority={1} />
        <Column dataField={'periodefin'} caption={'End Periode'} hidingPriority={0} />
        <Column dataField={'type'} caption={'Type'} />
        <Column dataField={'department'} caption={'Department'} allowSorting={false} hidingPriority={7} />
        <Column
          dataField={'status'}
          width={190}
          caption={'Status'}
          cellRender={({ data }) => (
            <span>{data.status}</span>
          )}
        />
        <Column
          caption={'Actions'}
          width={200}
          cellRender={({ data }) => (
            <div>
              {data.status === 'Pending' ? (
                <div>
                  <Button
                    icon="check"
                    color="green"
                    onClick={() => onStatusChange(data.id, 'Approved')}
                  />
                  <Button
  icon="remove"
  style={{ color: "orange" }}
  onClick={() => showRejectPopup(data.id)}
/>

                </div>
              ) : (
                <span>{data.status}</span>
              )}
            </div>
          )}
        />
      </DataGrid>

      <Popup
        visible={popupVisible}
        onHiding={() => setPopupVisible(false)}
        dragEnabled={false}
        closeOnOutsideClick={true}
        showTitle={true}
        title="Reject Leave"
        width={300}
        height={250}
      >
        <div>
          <TextBox
            placeholder="Reason for rejection"
            value={rejectionReason}
            onValueChanged={(e) => setRejectionReason(e.value)}
          />
          <Button
            text="Submit"
            type="default"
            onClick={handleReject}
          />
        </div>
      </Popup>
    </React.Fragment>
  );
}
