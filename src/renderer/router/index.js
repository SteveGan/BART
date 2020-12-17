import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import PreferencePage from '@/views/PreferencePage'


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {title: 'BART - Balloon Analogue Risk Task'}
    },
    {
      path: '/preferencepage',
      name: 'PreferencePage',
      component: PreferencePage,
      meta: {title: 'BART - Preference'}
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

Vue.use(Router)
