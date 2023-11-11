<script>
import Text from '../components/Text.vue';
import Nabvar from '../components/Nabvar.vue';
import Carruseldiscover from '../components/Carruseldiscover.vue';
import GaleryList from '../components/GaleryList.vue';
import { defineComponent, ref, onUnmounted } from 'vue'
import Loading from '../components/Loading.vue';
export default defineComponent({
  props:
  {

  },
  components: {
    GaleryList,
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
    isLoading: ref(true),
    generos: ["Novela", "Ensayo",  "Terror",
                    "Filosofia", 
                    "Cuentos", "C.Ficcion",
                    "Poesia", "Teatro", "Help"],
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

  

  <div class="m-4" v-for="(genero, index) in generos" :key="index">
    <span class="text">{{ genero }} COLLECTION</span>
      <GaleryList :Categoria="genero"></GaleryList>
      
  </div>

</template>

<style scoped>
.text {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.52px;
  text-transform: uppercase;
  margin-left: 30px;
}
</style>
