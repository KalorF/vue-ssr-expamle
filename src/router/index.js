import Vue from 'vue'
import Router from 'vue-router'
import customer from '../views/Customer.vue'
import index from '../views/Index.vue'
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'customer',
        component: customer
      },
      {
        path: '/index',
        component: index,
        name: 'index2'
      }
      // {
      //   path: '/index/:gid/:key',
      //   component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue'),
      //   name: 'index1'
      // },
      // {
      //   path: '/index/:gid/:key/:appid',
      //   component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue'),
      //   name: 'index3'
      // },
      // {
      //   path: '/index/:gid/:key/:appid/:other',
      //   component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue'),
      //   name: 'index4'
      // },
      // {
      //   path: '/order',
      //   component: () => import(/* webpackChunkName: "Order" */ '../views/Order.vue'),
      //   name: 'order'
      // },
      // {
      //   path: '/serve',
      //   component: () => import(/* webpackChunkName: "Serve" */ '../views/Serve.vue'),
      //   name: 'serve'
      // },
      // {
      //   path: '/404', // 页面不存在的情况下会跳到404页面
      //   component: () => import(/* webpackChunkName: "error" */ '../views/404.vue'),
      //   name: '404'
      // }
    ]
  })
}
