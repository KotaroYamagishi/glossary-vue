import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '../views/LoginForm'
import Main from '../views/Main'
import Note from '../views/Note'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginForm',
    component:LoginForm
  },
  {
    path:'/main',
    name:'Main',
    component:Main
  }, 
  {
    path:'/note',
    name:"Note",
    component:Note
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router