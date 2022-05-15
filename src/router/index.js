import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import NewPage from "../pages/NewPage";
import TutorPage from "../pages/TutorPage";
import OrganizationsPage from "../pages/OrganizationsPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'main',
    component: MainPage
  },
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
  },
  {
      path: '/users',
      name: 'users',
      component: NewPage
  },
  {
    path: '/tutor',
    name: 'tutor',
    component: TutorPage
  },
  {
    path: '/organizations',
    name: 'organizations',
    component: OrganizationsPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
