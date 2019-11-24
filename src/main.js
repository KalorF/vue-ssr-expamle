import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import './common/css/normalize.css'
import { Button } from 'vant'
import 'vant/lib/index.css'
Vue.use(Button)
// .use(Loading)
// .use(Dialog)
// .use(Toast)
// .use(Swipe)
// .use(SwipeItem)
// .use(Lazyload, {
//   loading: 'https://res.heywoodsminiprogram.com/shopping/h5/haohuoLoading.gif',
//   error: 'https://res.heywoodsminiprogram.com/shopping/h5/gray-leida.png'
// })
Vue.config.productionTip = false

export function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router }
}
