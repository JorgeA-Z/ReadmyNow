<script setup>
import BtnLogIn from '../components/BtnLogIn.vue';
import BtnRegister from '../components/BtnRegister.vue';
import Logotipo from '../components/Logotipo.vue'


</script>

<template>
  <div class="d-flex d-flex justify-content-center vh-100">
    <div class="d-flex d-flex justify-content-center align-items-center">
      <Logotipo />

      <div class="position">
        <BtnLogIn />
        <BtnRegister/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.position 
{
  margin-top: 10%;
}



@media screen and (min-width: 1001px) {
  .position {
    margin-top: 55%;
  }
}

@media screen and (max-width: 1000px) {
  .position {
    margin-top: 90%;
  }
}

@media screen and (max-width: 500px) {
  .position {
    margin-top: 90%;
  }
}


</style>
