import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import MainBody from './components/MainBody.vue';
import Equipment from './components/Equipment.vue';
import Diff from './components/Diff.vue';
import GitFunctions from './components/GitFunctions.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'MainContent',
        component: MainBody
    },
    {
        path: '/equipment',
        name: 'Equipment',
        component: Equipment
    },
    {
        path: '/diff',
        name: 'Diff',
        component: Diff
    },
    {
        path: '/git',
        name: 'GitFunctions',
        component: GitFunctions
    },
    // Add more routes here
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
