import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';
import Character from '../views/Character.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home,
            name: "Home"
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/"
        },
        {
            path: "/characters/:id",
            component: Character,
            name: "Character"
        },
        {
            path: "/saved",
            component: () => import("../views/Saved.vue"),
            name: "Saved"
        }
    ]
})

export default router;