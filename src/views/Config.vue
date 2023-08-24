<script setup>
import Nabvar from '../components/Nabvar.vue';
import Arrow from '../components/icons/Arrow.vue';
import Gear from '../components/icons/Gear.vue';
import Direction from '../components/icons/Direction.vue';
import Plus from '../components/icons/Plus.vue';
import {getAuth} from "firebase/auth";

const auth = getAuth();

const image = auth.currentUser.photoURL;
const name = auth.currentUser.displayName;


</script>

<template>
  <Nabvar />

  <div class="container">

    <div class="mt-4 mb-3 d-flex setting">
      <router-link to="/Profile">
        <Arrow />
      </router-link>

      <h1 class="title">
        <Gear />Settings
      </h1>

      <span class="version">
        Version 1
      </span>


    </div>


    <div class="row">


      <div class="col-lg-4 align-self-center">

        <div class="row justify-content-center">
            <img
              :src=image
              class="m-4 rounded-circle img-fluid img-user" alt="">

            <h1 class=" text-capitalize text-user">{{name}}</h1>
        </div>

        <div class="d-flex responsive">
          <img
          :src=image
            class="ms-2 me-3 rounded-circle img-fluid img-respon" alt="">

          <h1 class=" text-capitalize text-users">{{ name }}</h1>
        </div>


      </div>



      <div class="mt-5 mt-sm-5 mt-md-5 col-md-6 col-lg-4 align-self-center">

        <h4 class="account">Account Settings</h4>

        <div class="mt-5 d-flex justify-content-between">

          <h4 class="text">Edit profile </h4>
          <Direction />

        </div>

        <div class="mt-3 d-flex justify-content-between">

          <h4 class="text">Change password </h4>
          <Direction />

        </div>

        <div class="mt-3 d-flex justify-content-between">

          <h4 class="text">Add a payment method </h4>
          <Plus />

        </div>

      </div>

      <div class="mt-5  mt-sm-5 mt-md-5 col-md-6 col-lg-4 align-self-center">

        <h4 class="account">More</h4>

        <div class="mt-5 d-flex justify-content-between">

          <h4 class="text">About us </h4>
          <Direction />

        </div>

        <div class="mt-3 d-flex justify-content-between">

          <h4 class="text">Privacy policy </h4>
          <Direction />

        </div>

        <div class="mt-3 d-flex justify-content-between">

          <h4 class="text">Terms and conditions </h4>
          <Direction />

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.setting {
  justify-content: space-between;
}

.title {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 50px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 1.75px;
  text-align: center;
}

.version {
  visibility: hidden;
}

.img-user {
  height: auto;
  object-fit: cover;
  width: 300px;
  flex-shrink: 0;
}

.text-user {
  color: #7A60A9;
  text-align: center;
  font-family: 'Comfortaa', cursive;
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.9px;
}

.account {
  color: #ADADAD;
  font-family: 'Comfortaa', cursive;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.text {
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 23px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.img-respon {
  object-fit: cover;
  display: none;
  width: 128px;
  height: 128px;
  box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
}

.text-users {
  display: none;
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 35px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 1.75px;
  text-align: center;
}

@media screen and (max-width: 400px) {
  .setting .title {
    font-size: 45px;
  }
}

@media screen and (max-width: 576px) {

  .setting .version {
    display: none;
  }

  .img-user {
    display: none;
  }

  .text-user {
    display: none;
  }

  .img-respon {
    display: flex;
  }

  .responsive
  {
    align-items: center;
  }

  .text-users {
    display: flex;
  }
}
</style>