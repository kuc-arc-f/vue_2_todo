import Vue from 'vue'
import Router from 'vue-router'

import home from '../components/Home'
import about from '../components/About'
//import top_page from '../components/Blogs/top'
import show from '../components/Blogs/show'

/* blogs */
import blogsIndex from '../components/Blogs/Index'
import blogsNew from '../components/Blogs/new'
//import blogsShow from '../components/Blogs/show'
import blogsEdit from '../components/Blogs/edit'
/* todos */
import todosIndex from '../components/Todos/Index'
import todosNew from '../components/Todos/new'
import todosShow from '../components/Todos/show'
import todosEdit from '../components/Todos/edit'
import todosTest from '../components/Todos/test'

Vue.use(Router)
//
export default new Router({
    /* mode: 'history', */
    routes: [
        { path: '/', component: todosIndex },
        { path: '/show/:id', component: show },
        //
        { path: '/home', component: home },
        { path: '/about', component: about },
        /* blogs */
        { path: '/blogs', component: blogsIndex },
        { path: '/blogs/new', component: blogsNew },
//        { path: '/blogs/show/:id', component: blogsShow },
        { path: '/blogs/edit/:id', component: blogsEdit },
        /* todos */
        { path: '/todos', component: todosIndex },
        { path: '/todos/new', component: todosNew },
        { path: '/todos/show/:id', component: todosShow },
        { path: '/todos/edit/:id', component: todosEdit },  
        { path: '/todos/test', component: todosTest },   

    ]
})
