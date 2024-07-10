export const leaveTypes = [
    { id: 1, name: 'Annuel', nbjour :20},
    { id: 2, name: 'Maladie',nbjour :3 },
    { id: 3, name: 'Sans solde'},
    { id: 4, name: 'Maternité',nbjour:30},
    { id: 5, name: 'Paternité' ,nbjour :3},
    { id: 6, name: 'Décès', subtypes: [
      { id: 61, name: 'Parent', nbjour: 5 },
      { id: 62, name: 'Grand parent', nbjour: 3 },
      { id: 63, name: 'Fils', nbjour: 5 },
      { id: 64, name: 'Oncle', nbjour: 2 }
    ]
  }
];
export const employees = [
  {
    name: 'John Heart',
    id: 1,
    color: '#56ca85',
    avatar: 'images/gym/coach-man.png',
    age: 27,
    department: 'Sales',
    fonction: 'Employe',
    managerId :3,
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
