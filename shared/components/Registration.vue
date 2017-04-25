<template>
	<div id="registration">
		<v-card v-if="!$store.state.isAuthenticated">
			<v-card-text>
				<h6>Signin</h6>
				<form id="signin" @submit.prevent="signIn">
					<v-text-field
						type="text"
						name="username"
						label="Username"
						@keyup.native.enter="signIn"
						v-model="signInUsername"/>
					<v-text-field
						type="password"
						name="password"
						label="Password"
						append-icon="visibility"
						@keyup.native.enter="signIn"
						v-model="signInPassword"/>
					<v-btn
						light
						default
						id="submitReg"
						name="submit"
						@click.native="signIn"
					>Submit</v-btn>
				</form>
				<br><br>
				<h6>Register</h6>
				<form id="signup" @submit.prevent="register">
					<v-text-field
						type="text"
						name="username"
						label="Username"
						@keyup.native.enter="register"
						v-model="registerUsername"/>
					<v-text-field
						type="email"
						name="email"
						label="Email"
						@keyup.native.enter="register"
						v-model="registerEmail"/>
					<v-text-field
						type="password"
						name="password"
						label="Password"
						append-icon="visibility"
						@keyup.native.enter="register"
						v-model="registerPassword"/>
					<v-btn
						light
						default
						id="submitSign"
						name="submit"
						@click.native="register"
						@keyup.native.enter="register"
					>Submit</v-btn>
				</form>
				
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			signInUsername: '',
			signInPassword: '',

			registerUsername: '',
			registerEmail: '',
			registerPassword: '',
		}
	},
	methods: {
		signIn(e) {
			this.$store.dispatch('signIn', {
				username: this.signInUsername,
				password: this.signInPassword
			})
			this.signInUsername = ''
			this.signInPassword = ''
		},
		register(e) {
			this.$store.dispatch('register', {
				username: this.registerUsername,
				email: this.registerEmail,
				password: this.registerPassword
			})
			this.registerUsername = ''
			this.registerEmail = ''
			this.registerPassword = ''
		}
	}
}
</script>

<style>
	
</style>