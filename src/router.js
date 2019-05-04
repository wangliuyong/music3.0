import Vue from 'vue'
import Router from 'vue-router'
import Recomend from './views/Recomend'
import Singer from './views/Singer'
import Rank from './views/Rank'
import Search from './views/Search'
import Singr_detail from './components/Singer-detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/recomend' },
    {
      path: '/recomend',
      name: 'recomend',
      component: Recomend
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children:[
        {
          path:':id',
          component:Singr_detail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
