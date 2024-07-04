import React, { useCallback, useState } from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';
import { format } from 'date-fns';

export default function Historique() {

  const getEmployeeName = (employeeID) => {
    const employee = employees.find((emp) => emp.id === employeeID);
    return employee ? employee.text : '';
  };

  const EmployeeId = 1;
  const [collapsed, setCollapsed] = useState(true);

  const onContentReady = useCallback(
    (e) => {
      if (collapsed) {
        e.component.expandRow([EmployeeId.toString()]); 
        setCollapsed(false);
      }
    },
    [collapsed, EmployeeId],
  );

  const filteredLeaves = leaves.filter(leave => leave.employeeID === EmployeeId);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Historique</h2>

      <DataGrid
        className={'dx-card wide-card'}
        dataSource={filteredLeaves}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />

        <Column 
          dataField={'nameemployee'}
          caption={'Name'}
          hidingPriority={3}
        />
        <Column
          dataField={'startDate'}
          caption={'Start Date'}
          dataType={'date'}
          hidingPriority={3}
          cellRender={(data) => (
            <span>{format(data.data.startDate, 'dd-MM-yyyy')}</span>
          )}
        />
        <Column
          dataField={'endDate'}
          caption={'Due Date'}
          dataType={'date'}
          hidingPriority={4}
          cellRender={(data) => (
            <span>{format(data.data.endDate, 'dd-MM-yyyy')}</span>
          )}
        />
        <Column
          dataField={'periodedebut'}
          caption={'Start Period'}
          name={'Priority'}
          hidingPriority={1}
        />
        <Column
          dataField={'periodefin'}
          caption={'End Period'}
          hidingPriority={0}
        />
        <Column
          dataField={'type'}
          caption={'Type'}
        />
        <Column
          dataField={'department'}
          caption={'Department'}
          allowSorting={false}
          hidingPriority={7}
        />
        <Column
          dataField={'status'}
          width={190}
          caption={'Status'}
        />
      </DataGrid>
    </React.Fragment>
  );
}


export const leaves = [
  {
    nameemployee:'mahdi',
    id: 1,
    employeeID: 1,
    startDate: new Date('2023-12-01'),
    endDate: new Date('2023-06-05'),
    type: 'Annual Leave',
    status: 'Approved',
    department: 'Sales',
    periodedebut:'matin',
    periodefin:'matin',

  },
  {
    nameemployee:'hanen',
    id: 2,
    employeeID: 2,
    startDate: new Date('2023-07-05'),
    endDate: new Date('2023-07-06'),
    type: 'Sick Leave',
    status: 'Approved',
    department: 'HR',
    periodedebut:'matin',
    periodefin:'matin',

  },
  {
    nameemployee:'mahdi',
    id: 3,
    employeeID: 1,
    startDate: new Date('2023-08-12'),
    endDate: new Date('2023-08-15'),
    type: 'Annual Leave',
    status: 'Rejected',
    department: 'Sales',
    periodedebut:'aprés midi',
    periodefin:'matin',

  },
  {
    nameemployee:'mahdi',
    id: 4,
    employeeID: 1,
    startDate: new Date('2023-04-10'),
    endDate: new Date('2023-04-13'),
    type: 'Annual Leave',
    status: 'Rejected',
    department: 'Sales',
    periodedebut:'matin',
    periodefin:'aprés midi',



    },
];


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
export const employee = [
  {
    text: 'John Heart',
    id: 1,
    color: '#56ca85',
    avatar: 'images/gym/coach-man.png',
    age: 27,
    department: 'Sales',
  }]

const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];