import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// let view = name => {
//   () => System.import('../views/' + name + '.vue')
// }
let view = name => {
  return process.env.VUE_ENV === 'client' ?
  () => System.import('../views/' + name + '.vue') :
  require('../views/' + name + '.vue')
}

export default new Router({
  mode: 'history',
  routes: [
  	{ path: '/', component: view('Home')},
    { path: '/roster', name: 'roster', component: view('RosterView') },
    { path: '/lineups', name: 'lineups', component: view('Lineups') }
  ]
})
