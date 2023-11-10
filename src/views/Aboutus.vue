<script setup>
import Nabvar from "../components/Nabvar.vue";
</script>

<template>
  <Nabvar />


  <div class="container text-center">

    <div class="row">

      <h1 class="mt-4 mb-5 about__title">The Royal Court</h1>

      <div class="m-3 col">
        <img src="../img/Angel.jpeg" class="rounded-circle about__members" alt="">
        <h3 class="mt-3 mb-3 about__members--names">Angel Zepeda</h3>
        <p class="text-break about__members--description">Formado en ciencias y fundamentos lógicos, soy una persona apasionada por las bases estructurales y las reglas que rigen la existencia, lo que me ha llevado a dedicar mi vida al conocimiento: desde la Filosofía, a las Matemáticas y el arte. Mi objetivo es experimentar y buscar aquellas historias de las ciencias y el arte que expresan los comportamientos y emociones del ser humano.</p>
        <a href="https://github.com/JorgeA-Z" target="_blank" class="m-3 about__members--icon"><i class="uil uil-github"></i></a>
        <a href="https://instagram.com/angel.jzn" target="_blank" class="m-3 about__members--icon"><i class="uil uil-instagram"></i></a>
      </div>

      
      <div class="m-3 col">
        <img src="../img/Diego.jpeg" class="rounded-circle about__members" alt="">
        <h3 class="mt-3 mb-3 about__members--names">Diego Ortega</h3>
        <p class="text-break about__members--description">Me considero una persona que le gusta ver que sus conocimientos dan frutos, por eso mismo me gusta indagar en nuevas tecnologías y conocimientos para dar con buenos resultados, en este caso soy apasionado del Frontend por lo cual me gusta que el diseño de una página quede lo más semejante posible al diseño previo, también trato de que toda la parte de UX/UI sea cómoda para el usuario.</p>
        <a href="https://github.com/Henry0604" target="_blank" class="m-3 about__members--icon"><i class="uil uil-github"></i></a>
        <a href="https://instagram.com/enrique_trese" target="_blank" class="m-3 about__members--icon"><i class="uil uil-instagram"></i></a>
      </div>

      <div class="m-3 col">
        <img src="../img/Alberto.webp" class="rounded-circle about__members" alt="">
        <h3 class="mt-3 mb-3 about__members--names">Alberto Romo</h3>
        <p class="text-break about__members--description">Soy Alberto Romo, un desarrollador de software, tengo habilidad con la inteligencia artificial, gestion de algoritmos y optimizacion</p>
        <a href="https://github.com/Albertio" target="_blank" class="m-3 about__members--icon"><i class="uil uil-github"></i></a>
        <a href="https://instagram.com/alberto_thatsme" target="_blank" class="m-3 about__members--icon"><i class="uil uil-instagram"></i></a>
      </div>

    </div>

  </div>
  
</template>

<style scoped>

.about__title {
  color: #7a60a9;
  font-family: "Comfortaa", cursive;
  font-size: 50px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 1.75px;
  text-align: center;
}

.about__members {
  border: 4px solid #9B88BE;
  height: 200px;
  object-fit: cover;
  width: 200px;
  flex-shrink: 0;
}

.about__members--names {
  color: #7a60a9;
  font-family: "Comfortaa", cursive;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 1.75px;
  text-align: center;
}

.about__members--description {
  color: #D6C8E1;
  font-family: "Comfortaa", cursive;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 1.75px;
  text-align: center;

}

.about__members--icon {
  font-size: 40px;
  color: #7a60a9;
}
</style>
