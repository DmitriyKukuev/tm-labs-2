import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Lab1 from '../views/Lab1.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Главная',
            component: HomeView,
        },
        {
            path: '/lab1',
            name: 'Лабораторная работа №1',
            component: Lab1,
        },
    ]
})

export default router
