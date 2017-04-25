import Vue from 'vue'
import Vuex, { mapActions } from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

Vue.use(Vuex)


// console.log(Cookies.get('token'))

const store = new Vuex.Store({
  state: {
  	isAuthenticated: false,
  	token: '',
  	items: [
				 	{
				  	value: false,
				  	name: 'Player1',
				  	pitcher: false,
				  	inningPitching: null,
				   	preferredPositions: [],
				   	positionsToAvoid: [],
				 },
				 {
				   value: false,
				   name: 'Player1',
				   pitcher: false,
				   inningPitching: null,
				   preferredPositions: [],
				   positionsToAvoid: [],
				 },
				 {
				   value: false,
				   name: 'Player1',
				   pitcher: false,
				   inningPitching: null,
				   preferredPositions: [],
				   positionsToAvoid: [],
				 },
				 {
				  	value: false,
				  	name: 'Player1',
				  	pitcher: false,
				  	inningPitching: null,
				   	preferredPositions: [],
				   	positionsToAvoid: [],
				 },
				 {
				   value: false,
				   name: 'Player1',
				   pitcher: false,
				   inningPitching: null,
				   preferredPositions: [],
				   positionsToAvoid: [],
				 },
				 {
				   value: false,
				   name: 'Player1',
				   pitcher: false,
				   inningPitching: null,
				   preferredPositions: [],
				   positionsToAvoid: [],
				 },
				 {
				  	value: false,
				  	name: 'Player1',
				  	pitcher: false,
				  	inningPitching: null,
				   	preferredPositions: [],
				   	positionsToAvoid: [],
				 },
				 {
				   value: false,
				   name: 'Player1',
				   pitcher: false,
				   inningPitching: null,
				   preferredPositions: [],
				   positionsToAvoid: [],
				 },
				 {
				   value: false,
				   name: 'Player1',
				   pitcher: false,
				   inningPitching: null,
				   preferredPositions: [],
				   positionsToAvoid: [],
				 },
				 {
				  	value: false,
				  	name: 'Player1',
				  	pitcher: false,
				  	inningPitching: null,
				   	preferredPositions: [],
				   	positionsToAvoid: [],
				 },
				 {
				   value: false,
				   name: 'Player1',
				   pitcher: false,
				   inningPitching: null,
				   preferredPositions: [],
				   positionsToAvoid: [],
				 },
				 {
				   value: false,
				   name: 'Player1',
				   pitcher: false,
				   inningPitching: null,
				   preferredPositions: [],
				   positionsToAvoid: [],
				 }
				],
  	user: {}
  },
	mutations: {
		register() {

		},
		signIn(state, { token, user }) {
			state.token = token
			state.user = user
			state.isAuthenticated = true
		},
		signOut(state) {
			Cookies.remove('token')
			state.isAuthenticated = false
			state.token = ''
			state.user = {}
		}
  },
  actions: {
  	register(context, { username, email, password }) {
  		console.log(username)
  		axios.post('/api/users/', {
  			username,
  			email,
  			password
  		}).then(user => {
  			console.log(user)
  		}).catch(error => {
  			console.log(error)
  		})
  	},
  	signIn(context, { username, password}) {
  		axios.post('/api/auth', {
  			username,
  			password
  		}).then(res => {
  			let token = res.data.token.toString()
  			let user = res.data.user
  			if (process.env.VUE_ENV === 'client') {
  				Cookies.set('token', token)
  				context.commit('signIn', { token, user })
  			}
  		}).catch(error => {
  			console.log(error)
  		})
  	}
  },
  getters: {
  }
})

export default store
