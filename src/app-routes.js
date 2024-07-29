import { HomePage, TasksPage, ProfilePage,Agenda,FormDemande,VueConges,VueCongesManager,Historique,Statusm,MyHistory,History} from './pages';
import { withNavigationWatcher } from './contexts/navigation';


export  const routes = [
    {
        path: '/tasks',
        element: TasksPage
    },
  
    
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/scheduler',
        element: Agenda
    },
    {
        path: '/historyMng',
        element: History
    },
    {
        path: '/formDemande',
        element: FormDemande
    },
    {
        path: '/vuecongés',
        element: VueConges
    },
    {
        path: '/vuecongésManager',
        element: VueCongesManager
    },
    {
        path: '/historique',
        element: Historique
    },
    {
        path: '/history',
        element: MyHistory
    },
    
    

];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});

