import React from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';
import { format } from 'date-fns';

export default function Task() {
  return (
    <React.Fragment>
      <h2 className={'content-block'}>Tasks</h2>

      <DataGrid
        className={'dx-card wide-card'}
        dataSource={leaves}
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
          caption={'name employee'}
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
          caption={'periodedebut'}
          name={'Priority'}
          hidingPriority={1}
        />
         <Column
          dataField={'periodefin'}
          caption={'periodefin'}
          hidingPriority={0}
        />
       
        
        <Column
          dataField={'type'}
          caption={'type'}
         
        />
        
        
        <Column
          dataField={'department'}
          caption={'department'}
          allowSorting={false}
          hidingPriority={7}
        />
        <Column
          dataField={'status'}
          width={190}
          caption={'status'}
          
        />
        
        
        
      </DataGrid>
    </React.Fragment>
)}

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
    status: 'Approved',
    department: 'Sales',
     periodedebut: 'matin',
    periodefin: 'matin'
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
