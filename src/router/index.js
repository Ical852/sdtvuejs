import Vue from 'vue'
import VueRouter from 'vue-router'
import { Create, Edit, Editpic, Home } from '../views'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
  },
  {
    path: '/edit/:id',
    name : 'Edit',
    component: Edit
  },
  {
    path: '/editpic/:id',
    name: 'Edit Pic',
    component : Editpic
  }
]

const router = new VueRouter({
  routes
})

export default router
