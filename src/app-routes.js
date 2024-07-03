import { HomePage, TasksPage, ProfilePage,Agenda,FormDemande,VueConges,VueCongesManager,Historique} from './pages';
import { withNavigationWatcher } from './contexts/navigation';


const routes = [
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
    
    

];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
