import { createWebHistory, createRouter } from "vue-router";
import TodoApp from "../components/todoApp/Todos.vue"
import Register from "../components/register/index.vue"
import Login from "../components/login/index.vue"
import Forgot from "../components/login/forgot.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: TodoApp,

    },
    {
        path: "/register",
        name: "Register",
        component: Register,

    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: '/forgot',
        name: "Forgot",
        component: Forgot
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;
