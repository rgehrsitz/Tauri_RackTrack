import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import MainBody from './components/MainBody.vue';
import EquipmentList from './components/EquipmentList.vue';
import Diff from './components/DiffView.vue';
import GitFunctions from './components/GitFunctions.vue';
import FileFunctions from './components/FileFunctions.vue';
import Settings from './components/Settings.vue';
// ... import other components

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'MainContent',
        component: MainBody
    },
    {
        path: '/equipment',
        name: 'EquipmentList',
        component: EquipmentList
    },
    {
        path: '/diff',
        name: 'DiffView',
        component: Diff
    },
    {
        path: '/git',
        name: 'GitFunctions',
        component: GitFunctions
    },
    {
        path: '/file',
        name: 'FileFunctions',
        component: FileFunctions
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
