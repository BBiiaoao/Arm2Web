import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage'
import History from './views/History'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            redirect:'/homePage'
        },
        {
            path:'/homePage',
            name:'Home',
            component:HomePage
        },
        {
            path:'/history/:id',
            name:'History',
            component:History
        }
    ],
    mode:"history"
})
