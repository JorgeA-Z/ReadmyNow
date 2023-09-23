import {createRouter, createWebHistory, createMemoryHistory} from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth"

const router = createRouter({
    history : createWebHistory(),
    routes:[
        { path: "/", component: () => import("../views/Loggout.vue") },
        
        { path: "/Login", component: () => import("../views/Login.vue") },
        
        { path: "/Register", component: () => import("../views/Register.vue") },
        
        { path: "/Config", component: () => import("../views/Config.vue"), meta: {requiresAuth: true, 
        } },
        { name: "Abook", props: true, path: "/ABook/:ID", component: () => import("../views/ABook.vue"), meta: {requiresAuth: true, 
        } },
        { path: "/Profile", component: () => import("../views/Profile.vue"), meta: {requiresAuth: true, 
        } },
        { path: "/Search", component: () => import("../views/Search.vue"), meta: {requiresAuth: true, 
        } },
        { path: "/Discover", component: () => import("../views/Discover.vue"), meta: {requiresAuth: true,
        } 
        },
        { path: "/Galery", component: () => import("../views/Galery.vue"), meta: {requiresAuth: true,
        } 
        },


    ],
});
const getCurrentUser = () =>
{
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject

        );


    });

};

router.beforeEach(async (to, from, next) =>
{
    if(to.matched.some((record) => record.meta.requiresAuth))
    {
        if(await getCurrentUser())
        {
            next();
        }else
        {
            alert("You dont have access!!");
            next("/");
        }

    }else{
        next();
    }

});

export default router;