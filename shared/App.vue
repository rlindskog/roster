<template>
  <v-app id="app">
    <v-toolbar class="grey">
      <v-toolbar-title>LU</v-toolbar-title>
      <v-toolbar-items>
        <v-toolbar-item ripple router :to="{ name: 'roster' }" v-if="$store.state.isAuthenticated">Roster</v-toolbar-item>
        <v-toolbar-item ripple router :to="{ name: 'lineups' }" v-if="$store.state.isAuthenticated">Lineups</v-toolbar-item>
        <v-toolbar-item ripple v-if="$store.state.isAuthenticated" @click.native="signOut">Sign out</v-toolbar-item>
      </v-toolbar-items>
    </v-toolbar>
    <main id="main" class="top">
      <v-sidebar fixed drawer v-model="nav" id="sidebar">
        <v-list>
          <v-list-item v-for="i in 3" :key="i" >
            <v-list-tile ripple>
              <v-list-tile-title>Item {{ i }}</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-sidebar>
      <v-content id="content">
        <v-row>
          <v-col xs10 offset-xs1 sm8 offset-sm2 md6 offset-md3>
            <registration/>
          </v-col>
        </v-row>
        <transition name="fade" mode="out-in">
          <router-view class="view" v-if="$store.state.isAuthenticated"></router-view>
        </transition>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import Registration from './components/Registration.vue'
export default {
  components: {
    Registration
  },
  data() {
    return {
      nav: false
    }
  },
  methods: {
    signOut(e) {
      this.$store.commit('signOut')
    }
  },
}
</script>

<style>
#sidebar {
  margin-top: 62px;
  z-index: 1;
}
.top {
  margin-top: 62px;
}
#content {
  margin-top: 12px;
}
/*body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 15px;
  margin: 0;
  padding-top: 55px;
  color: #34495e;
  overflow-y: scroll;
}
a {
  text-decoration: none;
}
.header {
  position: fixed;
  z-index: 999;
  height: 55px;
  top: 0;
  left: 0;
  right: 0;
}
.logo {
  width: 24px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}
.view {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}*/
</style>
