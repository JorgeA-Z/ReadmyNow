<script setup>
import Carruseldiscover from '../components/Carruseldiscover.vue';
import Galerydiscover from '../components/Galerydiscover.vue';
import Nabvar from '../components/Nabvar.vue';
</script>

<template>
  <Nabvar />



  <div class="m-4 row justify-content-center">

    <h1 class="text-center search">Search</h1>

    <input type="text" class="form-control mt-2 busqueda" required placeholder="Search all books">

  </div>

  <div class="m-3">

    <span class="text">ALL RESULTS</span>

    <Galerydiscover/>

  </div>

  <div class="m-3">

    <span class="text">RECOMENDATIONS</span>

    <Carruseldiscover/>

  </div>
</template>

<style scoped>
.centrar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.search {
  color: #7A60A9;
  font-family: Comfortaa;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.54px;
}

.busqueda {
  width: 735px;
  height: 55px;
  flex-shrink: 0;
  border: 2px solid #7A60A9;
  background-color: #fff;

  /*Atributos del texto*/
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.form-control:focus {
  border-color: rgb(122, 96, 169);
  box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
  outline: 0 none;
}

::placeholder {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/* ALL RESULTS */
.text {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 13px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.52px;
  text-transform: uppercase;
}
</style>
