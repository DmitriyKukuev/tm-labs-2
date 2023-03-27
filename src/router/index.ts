import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Lab11 from '../views/Lab11.vue';
import Lab12 from '../views/Lab12.vue';
import Lab2 from '../views/Lab2.vue';
import Lab3 from '../views/Lab3.vue';
import Lab4 from '../views/Lab4.vue';
import Lab5 from '../views/Lab5.vue';
import Lab6 from '../views/Lab6.vue';

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
        {
            path: '/lab2',
            name: 'Лаб 2',
            component: Lab2,
        },
        {
            path: '/lab3',
            name: 'Лаб 3',
            component: Lab3,
        },
        {
            path: '/lab4',
            name: 'Лаб 4',
            component: Lab4,
        },
        {
            path: '/lab5',
            name: 'Лаб 5',
            component: Lab5,
        },
        {
            path: '/lab6',
            name: 'Лаб 6',
            component: Lab6,
        },
    ]
})

export default router
