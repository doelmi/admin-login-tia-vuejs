<template>
<div id="app">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <span class="navbar-brand">Admin Login TIA</span>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <router-link tag="li" active-class="active" class="nav-link" to="/users">Daftar Pengguna</router-link>
          <router-link tag="li" active-class="active" class="nav-link" to="/logs">Log Aktivitas</router-link>
          <router-link tag="li" active-class="active" class="nav-link" to="/about">Tentang</router-link>
        </ul>
        <ul class="navbar-nav">
          <span v-if="login" class="navbar-text">Halo, Admin!</span>
          <li v-if="login" v-on:click="logout()" tag="li" active-class="active" class="nav-link">Logout</li>
          <router-link v-else tag="li" active-class="active" class="nav-link" to="/login">Login</router-link>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data() {
    return {
      login: false,
      host: 'http://10.5.12.10:3000'
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.login = false
      this.redirectLogin()
    },
    redirectLogin() {
      this.$router.push({
        name: 'login',
        query: {
          redirect: this.$router.currentRoute.name
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      if (localStorage.token != null) {
        axios.get(`${this.host}/login/cektoken/${localStorage.token}`)
          .then(response => {
            this.login = response.data
          })
          .catch(error => {
            this.login = false
            this.redirectLogin()
          })
      }
    }
  },
  created() {
    if (localStorage.token != null) {
      axios.get(`${this.host}/login/cektoken/${localStorage.token}`)
        .then(response => {
          this.login = response.data
        })
        .catch(error => {
          this.login = false
          this.redirectLogin()
        })
    }
  }
}
</script>

<style lang="scss">
body {
    overflow-y: scroll;
}

ul li {
    cursor: pointer;
}
</style>
