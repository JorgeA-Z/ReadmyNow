<script>
import Text from '../components/Text.vue';
import Nabvar from '../components/Nabvar.vue';
import Carruseldiscover from '../components/Carruseldiscover.vue';
import Galerydiscover from '../components/Galerydiscover.vue';
import { defineComponent, ref, onUnmounted } from 'vue'
import Loading from '../components/Loading.vue';
export default defineComponent({
  props:
  {

  },
  components: {
    Galerydiscover,
    Carruseldiscover,
    Nabvar,
    Loading,
    Text,
    Nabvar,
  },
  methods:
  {

  },
  data: () => ({
    isLoading: ref(true)

  }),
  mounted() {
    setTimeout(() => {
      this.isLoading = false; // Cambia el estado de isLoading cuando la carga esté completa
    }, 1500); // Simulamos una carga de 2 segundos
  },
})
</script>

<template>
  <Loading v-if="isLoading"></Loading>
  
  <Text />
  <Nabvar/>
  <div class="m-3">

    <span class="text">What’s new today</span>


    <Carruseldiscover />


  </div>

  <div class="m-3">
    <span class="text">my bookshelf</span>

    <Galerydiscover></Galerydiscover>


  </div>
</template>

<style scoped>
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
