<script setup>
import ePub from 'epubjs';

const props = defineProps(['link'])
var w = 500;
var h  = 650;

var book = ePub(props.link);
var rendition = book.renderTo("area", { spread:"none", allowScriptedContent: true, width: w, height: h});
var displayed = rendition.display();


let p;

const next = () => {

  rendition.next();

};


const prev = () => {
  rendition.prev();
};
const marcador = () => 
{
  p = rendition.location.start.cfi
  console.log(p)
}


/*
const ret = () => 
{
  rendition.display(p);

}
function handleResize() {
  // Obtener el ancho y alto actual de la ventana
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  
  // Realizar ajustes según sea necesario
  if (windowWidth < 1440) {
    // Si el ancho de la ventana es menor que 768 píxeles (por ejemplo, en dispositivos móviles)
    // Realizar ajustes específicos para pantallas pequeñas
    
  }
}
window.addEventListener("resize", function () {

});
*/




</script>

<template>
  <header class="header-read">
    <nav>
      <div class="d-flex m-1 contenedor">

        <router-link to="/Discover">
          <!-- Icono perteneciente para volver -->
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="41" viewBox="0 0 38 41" fill="none" class="return">
            <path
              d="M4.75 15.3753H26.125C30.06 15.3753 33.25 18.8171 33.25 23.0628C33.25 27.3085 30.06 30.7503 26.125 30.7503H19M4.75 15.3753L11.0833 8.54199M4.75 15.3753L11.0833 22.2087"
              stroke="#7A60A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </router-link>

        <!-- Logotipo ReadMeNow! -->
        <h5 class="readme">ReadMeNow!</h5>

        <!-- Icono para marcar libro -->
        <svg @click="marcador" xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 40 35" fill="none" class="marcador">
          <path
            d="M6.66663 11.375C6.66663 8.92477 6.66663 7.69966 7.21159 6.76379C7.69096 5.94058 8.45586 5.27129 9.39667 4.85185C10.4662 4.375 11.8664 4.375 14.6666 4.375H25.3333C28.1336 4.375 29.5337 4.375 30.6032 4.85185C31.5441 5.27129 32.309 5.94058 32.7883 6.76379C33.3333 7.69966 33.3333 8.92477 33.3333 11.375V30.625L28.75 27.7083L24.5833 30.625L20 27.7083L15.4166 30.625L11.25 27.7083L6.66663 30.625V11.375Z"
            stroke="#7A60A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </nav>

  </header>

  <!-- Lector Epub -->

  <div class="container mt-6 lector">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card">
          <button @click="prev">
            «
          </button>
          <div class="card-body">
            <div id="area"></div>
          </div>
          <button @click="next">
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.return {
  cursor: pointer;
}

.marcador {
  cursor: pointer;
}

.lector {
  margin-top: 60px;
}

.header-read {
  background-color: #F7F7F7;
  height: 58px;
  padding: 5px 10%;
  z-index: 99;
  position: fixed;
  width: 100%;
  top: 0;

}

.contenedor {
  justify-content: space-between;
  align-items: center;
}

.readme {
  display: flex;
  align-items: center;
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.375px;
}
</style>