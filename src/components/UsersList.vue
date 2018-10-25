<template>
<div class="container">

  <div class="row">
    <div class="col-lg-8">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bc-tp mt-4">
          <li class="breadcrumb-item active">
            Daftar Pengguna
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{namaHalaman}}</li>
          <li class="breadcrumb-item active" aria-current="page">{{halaman+1}}</li>
        </ol>
      </nav>

    </div>
    <div class="col-lg-4">
      <div class="input-group mt-3">
        <input v-on:keyup.enter="cari()" type="text" class="form-control" placeholder="Cari Sesuatu ..." v-model="searchValue">
        <div class="input-group-append">
          <button v-on:click="cari()" type="submit" class="btn btn-primary">Cari</button>
        </div>
      </div>
    </div>
  </div>
  <hr>

  <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <!-- Button trigger modal -->
    <button v-on:click="tambahModal()" type="button" class="btn btn-outline-primary mb-3" data-backdrop="static" data-toggle="modal" data-target="#exampleModalCenter">
      Tambah Pengguna
    </button>

    <div class="mb-2" role="group" aria-label="First group">
      <button v-on:click="refresh()" type="button" class="btn btn-outline-warning  mb-1">Semua Pengguna</button>
      <button type="button" class="btn btn-outline-warning mb-1" v-on:click="getOnline()">Online</button>
      <button type="button" class="btn btn-outline-warning mb-1" v-on:click="getOffline()">Offline</button>
      <button type="button" class="btn btn-outline-warning mb-1" v-on:click="getBelumDivalidasi()">Belum Divalidasi</button>
      <button type="button" class="btn btn-outline-warning mb-1" v-on:click="getDivalidasi()">Telah Divalidasi</button>
    </div>

    <div class="btn-group mb-3" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-outline-dark" v-bind:disabled="halaman <= 0" v-on:click="getHalamanData(halaman-1)">Sebelumnya</button>
      <button type="button" class="btn btn-outline-dark" v-bind:disabled="halaman >= allData.length-1" v-on:click="getHalamanData(halaman+1)">Selanjutnya</button>
    </div>
  </div>

  <div class="row">
    <div v-if="allData.length == 0" class="col-lg-12 text-center mb-5 mt-5">
      Tidak ada data ditemukan.
    </div>
    <div class="col-lg-4" v-for="user in users" v-if="user.dihapus == 0">
      <div class="card mb-4">
        <h5 class="card-header">
          {{ user.username }}
        </h5>
        <div class="card-body">
          <h5 class="card-title"> {{ user.Nama }} </h5>
          <h6 class="card-subtitle"> {{user.NIM }} </h6>
          <p class="card-text">
            <span v-if="user.password.includes('&#x25C9;')" v-html="user.password"> </span>
            <span v-else v-html="user.password"></span>
            <img v-on:click="changePassInv(user)" src="../assets/eye.png" width="30px" alt="lookPassword" class="img rounded-circle mata">
            <br>
            <span class="badge badge-pill" v-bind:class="[ user.status_login == 1 ? 'badge-success' : 'badge-danger' ]">{{user.status_login == 1 ? 'Online' : 'Offline '}}</span>
            <br>
            {{ aktif[user.aktif] }}
          </p>
          <div class="wrapper text-center">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button v-if="user.status_login == 1" key="set-offline" v-on:click="logout(user)" class="btn btn-outline-danger btn-sm" type="button" name="button">Set Offline</button>
              <button v-if="user.aktif == 1" key="blokir-akun" v-on:click="setAktivasiAkun(user, 2)" class="btn btn-outline-danger btn-sm" type="button" name="button">Blokir Akun</button>
              <button v-else key="validasi-akun" v-on:click="setAktivasiAkun(user, 1)" class="btn btn-outline-success btn-sm" type="button" name="button">Validasi Akun</button>
              <button key="hapus-akun" v-on:click="hapus(user)" class="btn btn-outline-danger btn-sm" type="button" name="button">Hapus Akun</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Tambah Pengguna</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
          <div v-if="alert" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Berhasil!</strong> Pengguna baru berhasil ditambahkan.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <form class="needs-validation" novalidate autocomplete="off">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" v-bind:class="[ username.trim().length == 0 ? 'is-invalid' : errorMessage.username.length > 0 ? 'is-invalid' : 'is-valid' ]" id="username" placeholder="Masukkan username ..." v-model="username">
              <div class="valid-feedback">
                Bagus!
              </div>
              <div class="invalid-feedback">
                {{ errorMessage.username }}
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" v-bind:class="[ password.length == 0 ? 'is-invalid' : 'is-valid' ]" id="password" placeholder="Masukkan password ..." v-model="password">
              <div class="valid-feedback">
                Bagus!
              </div>
              <div class="invalid-feedback">
                {{ errorMessage.password }}
              </div>
            </div>
            <div class="form-group">
              <label for="nama">Nama</label>
              <input type="text" class="form-control" v-bind:class="[ name.trim().length == 0 ? 'is-invalid' : 'is-valid' ]" id="name" placeholder="Masukkan nama ..." v-model="name">
              <div class="valid-feedback">
                Bagus!
              </div>
              <div class="invalid-feedback">
                {{ errorMessage.name }}
              </div>
            </div>
            <div class="form-group">
              <label for="nim">NIM</label>
              <input v-on:keyup.enter="tambah()" type="text" class="form-control" v-bind:class="[ nim.trim().length == 0 ? 'is-invalid' : errorMessage.nim.length > 0 ? 'is-invalid' : 'is-valid' ]" id="nim" placeholder="Masukkan NIM ..." v-model="nim">
              <div class="valid-feedback">
                Bagus!
              </div>
              <div class="invalid-feedback">
                {{ errorMessage.nim }}
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
          <button type="submit" class="btn btn-primary" v-on:click="tambah()" v-bind:disabled="username.trim().length == 0 || password.length == 0 || name.trim().length == 0 || nim.trim().length == 0 || errorMessage.username.length > 0 || errorMessage.nim.length > 0">Tambah</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import lodash from 'lodash'

export default {
  name: 'HelloWorld',
  data() {
    return {
      users: [],
      searchValue: "",
      aktif: [
        'Akun belum divalidasi.',
        'Akun telah divalidasi.',
        'Akun telah diblokir.',
        'Akun terlarang.',
        'Akun bermasalah.'
      ],
      allData: [],
      halaman: 0,
      namaHalaman: "Semua Pengguna",
      username: "",
      password: "",
      name: "",
      nim: "",
      errorMessage: {
        username: "Username harus diisi!",
        password: "Password harus diisi!",
        name: "Nama harus diisi!",
        nim: "NIM harus diisi!"
      },
      alert: false,
      host: 'http://10.5.12.10:3000',
      query: `?token=${localStorage.token}`
    }
  },
  watch: {
    username: function(newUN, oldUN) {
      this.errorMessage.username = "Menunggu selesai mengetik ..."
      this.debouncedGetUsername()
    },
    nim: function(newNIM, oldNIM) {
      this.errorMessage.nim = "Menunggu selesai mengetik ..."
      this.debouncedGetNIM()
    }
  },
  created: function() {
    this.debouncedGetUsername = _.debounce(this.getUsernameCorrection, 500)
    this.debouncedGetNIM = _.debounce(this.getNIMCorrection, 500)
  },
  methods: {
    getUsernameCorrection: function() {
      if (this.username.trim().length == 0) {
        this.errorMessage.username = "Username harus diisi!"
        return
      }
      this.errorMessage.username = "Sedang mencocokkan ..."
      axios.get(`${this.host}/users/nouname/${this.username}${this.query}`)
        .then(response => {
          console.log(response.data);
          if (response.data.nouname) {
            this.errorMessage.username = ""
          } else {
            this.errorMessage.username = "Username sudah digunakan!"
          }
        })
        .catch(error => {
          this.errorMessage.username = "Terjadi kesalahan!"
        })
    },
    getNIMCorrection: function() {
      if (this.nim.trim().length == 0) {
        this.errorMessage.nim = "NIM harus diisi!"
        return
      }
      this.errorMessage.nim = "Sedang mencocokkan ..."
      axios.get(`${this.host}/users/nonim/${this.nim}${this.query}`)
        .then(response => {
          if (response.data.nonim) {
            this.errorMessage.nim = ""
          } else {
            this.errorMessage.nim = "NIM sudah digunakan!"
          }
        })
        .catch(error => {
          this.errorMessage.nim = "Terjadi kesalahan!"
        })
    },
    getHalamanData: function(halaman) {
      this.halaman = halaman
      this.users = this.allData[halaman]
    },
    setAktivasiAkun: function(user, nilai) {
      axios.put(`${this.host}/users/aktif/${user.username}${this.query}`, {
          value: nilai
        })
        .then(response => {
          user.aktif = nilai;
        })
    },
    cari: function() {
      if (this.searchValue.trim().length > 0) {
        axios.get(`${this.host}/users/cari/${this.searchValue}${this.query}`)
          .then(response => {
            this.setData(response)
            this.namaHalaman = "Pencarian Pengguna"
          })
      }
    },
    refresh: function() {
      axios.get(`${this.host}/users${this.query}`)
        .then(response => {
          this.setData(response)
          this.searchValue = ""
          this.namaHalaman = "Semua Pengguna"
        })
    },
    hapus(user) {
      axios.delete(`${this.host}/users/${user.username}${this.query}`)
        .then(function(response) {
          user.dihapus = 1;
        })
        .catch(function(error) {
          console.log(error)
        });
    },
    logout(user) {
      axios.put(`${this.host}/users/login/${user.username}${this.query}`, {
          value: 0
        })
        .then(function(response) {
          user.status_login = 0;
        })
        .catch(function(error) {
          console.log(error)
        });
    },
    getOnline() {
      axios.get(`${this.host}/users/login/1${this.query}`)
        .then(response => {
          this.setData(response)
          this.namaHalaman = "Pengguna Online"
        })
    },
    getOffline() {
      axios.get(`${this.host}/users/login/0${this.query}`)
        .then(response => {
          this.setData(response)
          this.namaHalaman = "Pengguna Offline"
        })
    },
    getBelumDivalidasi() {
      axios.get(`${this.host}/users/aktif/0${this.query}`)
        .then(response => {
          this.setData(response)
          this.namaHalaman = "Pengguna Belum Divalidasi"
        })
    },
    getDivalidasi() {
      axios.get(`${this.host}/users/aktif/1${this.query}`)
        .then(response => {
          this.setData(response)
          this.namaHalaman = "Pengguna Telah Divalidasi"
        })
    },
    tambahModal() {
      this.alert = false
    },
    tambah() {
      if (this.username.trim().length > 0 && this.password.length > 0 && this.name.trim().length > 0 && this.nim.trim().length > 0 && this.errorMessage.username.length == 0 && this.errorMessage.nim.length == 0) {
        axios.post(`${this.host}/users${this.query}`, {
            username: this.username,
            password: this.password,
            name: this.name,
            nim: this.nim
          })
          .then(response => {
            this.username = ""
            this.password = ""
            this.name = ""
            this.nim = ""

            this.alert = true

            axios.get(`${this.host}/users${this.query}`)
              .then(response => {
                this.setData(response)
              })
          })
      }
    },
    hidePassword(user) {
      let hidden = ""
      for (var i = 0; i < user.passInv.length; i++) {
        hidden += "&#x25C9;"
      }
      return hidden
    },
    changePassInv(user) {
      user.password = user.password.includes("&#x25C9;") ? user.passInv : this.hidePassword(user)
    },
    setData(response) {
      this.allData = response.data
      for (var i = 0; i < this.allData.length; i++) {
        for (let user of this.allData[i]) {
          user['passInv'] = user.password
          user.password = this.hidePassword(user)
        }
      }
      this.users = this.allData[0];
      this.halaman = 0
    }
  },
  mounted() {
    if (localStorage.token != null) {
      axios.get(`${this.host}/users${this.query}`)
        .then(response => {
          this.setData(response)
        })
        .catch(err => {})
    }
  },
  created() {
    if (localStorage.token == null) {
      this.$router.push({
        name: 'login',
        query: {
          redirect: 'userslist'
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bc-tp {
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
  margin: 0;
}

.mata:hover {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.mata:active {
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
