import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history : createWebHistory(),
    routes:[
        { path: "/", component: () => import("../views/Loggout.vue") },
        { path: "/Config", component: () => import("../views/Config.vue") },
        { path: "/ABook", component: () => import("../views/ABook.vue") },
        { path: "/Profile", component: () => import("../views/Profile.vue") },
        { path: "/Results", component: () => import("../views/Results.vue") },
        { path: "/Search", component: () => import("../views/Search.vue") },
        { path: "/Discover", component: () => import("../views/Discover.vue") },
    ],
});
export default router;