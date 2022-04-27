import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Login from "@/components/Login";
import pdf_read from "@/components/pdf_read";
import attachment_list from "@/components/attachment_list";
import HelloWorld from "@/components/HelloWorld";
import test_websocket from "@/components/test_websocket";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'test_websocket',
        component: test_websocket
    },
    {
        path: '/hello',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/attachment_list',
        name: 'attachment_list',
        component: attachment_list
    },
    {
        path: '/pdf_read',
        name: 'pdf_read',
        component: pdf_read
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
