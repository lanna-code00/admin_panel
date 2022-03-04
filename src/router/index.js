import Vue from 'vue'
import VueRouter from 'vue-router'
import PaidUsers from "../views/users/PaidUsers.vue"
import AllUsers from "../views/users/AllUsers.vue"
import UnpaidUsers from "../views/users/UnpaidUsers.vue"
import OverdueUsers from "../views/users/OverdueUsers.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'users',
    component: AllUsers
  },
  {
    path: '/paid_users',
    name: 'paidUsers',
    component: PaidUsers
  },
  {
    path: '/unpaid_users',
    name: 'unpaidUsers',
    component: UnpaidUsers
  },
  {
    path: '/overdue_users',
    name: 'overdue',
    component: OverdueUsers
  }
]

const router = new VueRouter({
  routes
})

export default router
