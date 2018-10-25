<template>
<div class="container">
  <div class="row">
    <div class="col-lg-8">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bc-tp mt-4">
          <li class="breadcrumb-item active">
            Halaman Login
          </li>
        </ol>
      </nav>
    </div>
  </div>
  <hr>

  <div class="form">
    <div v-if="alert" class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Gagal!</strong> Kombinasi username dan password salah.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" id="username" aria-describedby="username" placeholder="Masukkan username admin ..." v-model="username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Masukkan password admin ..." v-model="password">
    </div>
    <button v-on:click="login()" type="button" class="btn btn-primary">Login</button>
  </div>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      host: 'http://10.5.12.10:3000',
      username : "",
      password : "",
      alert : false
    }
  },
  methods: {
    login(){
      if (this.username.trim().length > 0 && this.password.length > 0) {
        axios.post(`${this.host}/login/cek`, {
          username: this.username,
          password: this.password
        })
        .then(response => {
          localStorage.token = response.data.token
          this.$router.push({ name: this.$route.query.redirect ? this.$route.query.redirect : 'userslist'})
        })
        .catch(err => {this.alert = true})
      }
    }
  },
  mounted() {

  },
  created(){

  }
}
</script>

<style scoped>
.bc-tp {
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
  margin: 0;
}
</style>
