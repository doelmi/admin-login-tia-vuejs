import Vue from 'vue'
import Router from 'vue-router'
import UsersList from './components/UsersList.vue'
import LogsList from './components/LogsList.vue'
import LoginPage from './components/LoginPage.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'userslist',
      component: UsersList
    },
    {
      path: '/logs',
      name: 'logslist',
      component: LogsList
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})
