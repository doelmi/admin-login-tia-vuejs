<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-4">
                <h1>Tentang</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5">
            </div>
            <div class="col-md-2">
                <img style="width:100%" src="../assets/favicon.png" alt="ikon" />
            </div>
            <div class="col-md-5">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h3>Admin Login TIA</h3>
                <br />
                <p>Aplikasi Admin Login TIA dibuat oleh seorang mahasiswa angkatan 2014 sekaligus mantan Admin Lab TIA yang bernama Abdullah Fahmi,</p>
                <p>Dibuat dengan menggunakan framework Node.js, Vue.js dan Bootstrap</p>
                <br />
                <p style="font-weight:bold;">Contact</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <a href="https://www.facebook.com/doelmidoel/" target="_blank"><img src="../assets/facebook-logo-button.png" alt="fb" /></a>
            </div>
            <div class="col-md-3">
                <a href="https://api.whatsapp.com/send?phone=62895326308925" target="_blank"><img src="../assets/whatsapp-logo.png" alt="wa" /></a>
            </div>
            <div class="col-md-3">
                <a href="https://github.com/doelmi" target="_blank"><img src="../assets/git-logo.png" alt="git" /></a>
            </div>
            <div class="col-md-3">
                <a href="https://www.instagram.com/doelmi/" target="_blank"><img src="../assets/instagram-logo.png" alt="ig" /></a>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-md-12">
                <p id="year">&copy;{{ini}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import Vue from 'vue'

    var date = new Date()


    export default {
        name: 'HelloWorld',
        data() {
            return {
                host: 'http://10.5.12.10:3000',
                username: "",
                password: "",
                alert: false,
                ini: date.getFullYear(),
                popup : function (number){
                    alert(number)
                }
            }
        }
    }
    //var tahun = new Vue({
    //    el: '#year',
    //    data: {
    //        ini:year.getFullYear()
    //    }
    //})

</script>
<style>
    p,
    h1,
    h3 {
        text-align: center;
    }

    .col-md-3 {
        text-align: center;
    }

</style>
