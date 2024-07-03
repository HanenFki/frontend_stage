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