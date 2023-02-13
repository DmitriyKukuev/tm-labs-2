import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Lab11 from '../views/Lab11.vue';
import Lab12 from '../views/Lab12.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Главная',
            component: HomeView,
        },
        {
            path: '/lab1/1',
            name: 'Лаб 1-1',
            component: Lab11,
        },
        {
            path: '/lab1/2',
            name: 'Лаб 1-2',
            component: Lab12,
        },
    ]
})

export default router
