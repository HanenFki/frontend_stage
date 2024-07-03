import React, { useCallback, useState } from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';

export default function Historique() {
  // Fonction pour obtenir le nom de l'employé à partir de son ID
const getEmployeeName = (employeeID) => {
  const employee = employees.find((emp) => emp.id === employeeID);
  return employee ? employee.text : '';
};


  const EmployeeId = 1; // ID de l'employé dont vous voulez afficher les congés
  const [collapsed, setCollapsed] = useState(true);

  // Fonction exécutée lorsque le contenu est prêt
  const onContentReady = useCallback(
    (e) => {
      if (collapsed) {
        e.component.expandRow([EmployeeId.toString()]); // ID de l'employé à développer par défaut
        setCollapsed(false);
      }
    },
    [collapsed, EmployeeId],
  );

  // Filtrer les congés de l'employé connecté ou sélectionné
  const filteredLeaves = leaves.filter(leave => leave.employeeID === EmployeeId);

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Tasks</h2>

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
          caption={'name employee'}
          hidingPriority={3}
         />
        <Column
          dataField={'startDate'}
          caption={'Start Date'}
          dataType={'date'}
          hidingPriority={3}
        />
        <Column
          dataField={'endDate'}
          caption={'Due Date'}
          dataType={'date'}
          hidingPriority={4}
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

export const leaves = [
  {
    nameemployee:'mahdi',
    id: 1,
    employeeID: 1,
    startDate: new Date('2023-06-01'),
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

  },
  {
    nameemployee:'mahdi',
    id: 3,
    employeeID: 1,
    startDate: new Date('2023-08-12'),
    endDate: new Date('2023-08-15'),
    type: 'Annual Leave',
    status: 'Approved',
    department: 'Sales',

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



    },
  // autres demandes de congés
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
  // autres employés
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