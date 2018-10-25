<template>
<div class="container">
  <div class="row">

    <div class="col-lg-8">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bc-tp mt-4">
          <li class="breadcrumb-item active">
            Log Aktivitas
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{halaman+1}}</li>
        </ol>
      </nav>
    </div>
    <div class="col-lg-4">
      <!-- <div class="input-group mt-3">
        <input v-on:keyup.enter="cari()" type="text" class="form-control" placeholder="Cari Sesuatu ..." v-model="searchValue">
        <div class="input-group-append">
          <button v-on:click="cari()" type="submit" class="btn btn-primary">Cari</button>
        </div>
      </div> -->
    </div>
  </div>
  <hr>
  <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <div class="mb-2" role="group" aria-label="First group">
      <button v-on:click="refresh()" type="button" class="btn btn-outline-warning  mb-1">Semua Log</button>
    </div>
    <div class="btn-group mb-3" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-outline-dark" v-bind:disabled="halaman <= 0" v-on:click="getHalamanData(halaman-1)">Sebelumnya</button>
      <button type="button" class="btn btn-outline-dark" v-bind:disabled="halaman >= allData.length-1" v-on:click="getHalamanData(halaman+1)">Selanjutnya</button>
    </div>
  </div>
  <div v-if="allData.length == 0" class="text-center mb-5 mt-5">
    Tidak ada data ditemukan.
  </div>
  <table v-else class="table">
    <thead>
      <tr>
        <th scope="col">ID Log</th>
        <th scope="col">Username</th>
        <th scope="col">Nama PC</th>
        <th scope="col">Jam</th>
        <th scope="col">Tanggal</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="log in logs">
        <th scope="row">{{ log.id_log }}</th>
        <td>{{ log.username }}</td>
        <td>{{ log.no_pc }}</td>
        <td>{{ log.jam }}</td>
        <td>{{ log.tanggal }}</td>
      </tr>
    </tbody>
  </table>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      logs: [],
      allData: [],
      halaman: 0,
      searchValue: "",
      host: 'http://10.5.12.10:3000',
      query: `?token=${localStorage.token}`
    }
  },
  methods: {
    getHalamanData: function(halaman) {
      this.halaman = halaman
      this.logs = this.allData[halaman]
    },
    refresh: function() {
      axios.get(`${this.host}/logs${this.query}`)
        .then(response => {
          this.setData(response)
          this.searchValue = ""
        })
    },
    setData(response) {
      this.allData = response.data
      this.logs = this.allData[0];
      for (var i = 0; i < this.allData.length; i++) {
        for (let log of this.allData[i]) {
          let waktu = this.setTime(log.waktu)
          log['tanggal'] = waktu.tanggal
          log['jam'] = waktu.jam
        }
      }
      this.halaman = 0
    },
    setTime(waktu) {
      let data = new Date(waktu)
      let tanggal = `${data.getDate()} ${this.getBulan(data.getMonth())} ${data.getFullYear()}`
      let jam = `${this.pad2(data.getHours())}:${this.pad2(data.getMinutes())}:${this.pad2(data.getSeconds())}`

      return {
        tanggal: tanggal,
        jam: jam
      }
    },
    getBulan(bulan) {
      switch (bulan) {
        case 0:
          return "Januari"
        case 1:
          return "Februari"
        case 2:
          return "Maret"
        case 3:
          return "April"
        case 4:
          return "Mei"
        case 5:
          return "Juni"
        case 6:
          return "Juli"
        case 7:
          return "Agustus"
        case 8:
          return "September"
        case 9:
          return "Oktober"
        case 10:
          return "November"
        case 11:
          return "Desember"
      }
    },
    pad2(number) {
      return (number < 10 ? '0' : '') + number
    }
  },
  mounted() {
    if (localStorage.token != null) {
      axios.get(`${this.host}/logs${this.query}`)
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
          redirect: 'logslist'
        }
      });
    }
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
