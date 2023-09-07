<script setup>
import Text from '../components/Text.vue';
import Nabvar from '../components/Nabvar.vue';
import Carruseldiscover from '../components/Carruseldiscover.vue';
import Galerydiscover from '../components/Galerydiscover.vue';

</script>

<template>

  <Text/>

  <Nabvar/>

  <div class="m-3">

    <span class="text">What’s new today</span>


      <Carruseldiscover/>


  </div>

  <div class="m-3">
    <span class="text">my bookshelf</span>
    
    <Galerydiscover></Galerydiscover>

    
  </div>

</template>

<style scoped>

.text
{
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
