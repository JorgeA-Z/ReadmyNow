<script setup>
import Carruselprofile from '../components/Carruselprofile.vue';
import Nabvar from '../components/Nabvar.vue';

import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);

const auth = getAuth();

const image = auth.currentUser.photoURL;
const name = auth.currentUser.displayName;
const email = auth.currentUser.email;

onMounted(() =>  {
  onAuthStateChanged(auth, (user) => {
    if(user)
    {
      isLoggedIn.value = true;

    }else
    {
      isLoggedIn.value = false;
    }
  });
});

const handleSingOut = () =>
{
  signOut(auth).then(()=>{
    router.push("/");
  });


};
console.log(image)

</script>

<template>
  <Nabvar />

  <div class="container">
    <div class="row">
      <div class="col-lg-5">
        
        <div class="row justify-content-center align-self-center">

          <img :src=image class="m-4 rounded-circle img-fluid img-user" alt="">



          <h1 class="mt-4 text-center text-capitalize text-user">{{name}}</h1>

          <h2 class="mt-4 text-center text-location">{{email}}</h2>
          
          <router-link class="mt-4 mx-2 config" to="/Config">
              <div class="btn text">
              CONFIG
              </div>
          </router-link>
            
          

          <button class="mt-4 mx-2 btn log-out"  @click="handleSingOut">
            LOG OUT
          </button>

        </div>






      </div>

      <div class="col-lg-7">

        <div class="m-3 mt-sm-5 mt-lg-4">
          <h4 class="text-left text-uppercase favorities">Favorites</h4>

          <Carruselprofile/>

        </div>

        <div class="m-3 mt-sm-5 mt-lg-4">

          <h4 class="text-left text-uppercase reading">Reading</h4>

          <Carruselprofile/>

        </div>



      </div>
    </div>
  </div>
</template>

<style scoped>
.img-user {
  height: auto;
  object-fit: cover;
  width: 384px;
  flex-shrink: 0;
}

.text-user {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.9px;
}

.text-location {
  color: #D6C8E1;
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

/* Style for bottons */
.config {
  width: 343px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 3px solid #7A60A9;
  background: #7A60A9;

  /*Atributos del Texto*/
  color: #FFF;
  text-align: center;
  font-family: 'Comfortaa', cursive;
  font-size: 17px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.text
{
  color: #FFF;
}
.config:focus {
  border-color: rgb(122, 96, 169);
  box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
  outline: 0 none;
}

.log-out {
  width: 343px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 3px solid #7A60A9;
  background: #D6C8E1;

  /*Atributos del Texto*/
  color: #7A60A9;
  text-align: center;
  font-family: 'Comfortaa', cursive;
  font-size: 17px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.log-out:focus {
  border-color: rgb(122, 96, 169);
  box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
  outline: 0 none;
}

/* Part Carrusels */
.favorities {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.8px;
}

.reading {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.8px;
}
</style>
