<script setup>
import Nabvar from '../components/Nabvar.vue';

import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() =>  {
  auth = getAuth();
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


</script>

<template>

<Nabvar/>
  <h1>Profile</h1>
  <div class="d-flex d-flex justify-content-center vh-100">
    <button class="boton1" @click="handleSingOut">
      LOG OUT
    </button>
  </div>

</template>


<style>
.boton1
{
    border: 3px solid #7A60A9;
    color: #7A60A9;
    background-color: #D6C8E1;
    width: 167px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 6px;
    margin-right: 9px;

    /*Atributos del Texto*/
    font-family: 'Comfortaa', cursive;
    font-weight: 900;
    font-size: 13px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: 0.52px;
    text-transform: uppercase;

}
</style>
