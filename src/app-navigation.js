export const navigation = [
  {
    text: 'Home',
    path: '/scheduler',
    icon: 'home'
  },
  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile'
      },
    ]
  },
  {
    text: 'Chef Equipe',
    icon: 'folder',
    items: [
      {
        text: 'Vue Congés',
        path: '/vuecongés'
      },
      {
        text: 'My History',
        path: '/history'
      },
    ],
    visible: (roles) => Array.isArray(roles) && roles.includes('TeamLead') // Show if user is a team lead
  },
  {
    text: 'Manager',
    icon: 'folder',
    items: [
      {
        text: 'Vue Congés',
        path: '/vuecongésManager'
      },
      {
        text: 'My History',
        path: '/historyMng'
      },
    ],
    visible: (roles) => Array.isArray(roles) && roles.includes('Manager') // Show if user is a manager
  },
  {
    text: 'Employe',
    icon: 'folder',
    items: [
      {
        text: 'Historique',
        path: '/historique'
      }
    ],
    visible: (roles) => Array.isArray(roles) && roles.includes('Employee') // Show if user is an employee
  },
];
