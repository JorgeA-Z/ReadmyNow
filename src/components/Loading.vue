<script setup>
import Text from '../components/Text.vue';
</script>

<template>

<div class="vh-100 row m-0 align-items-center justify-content-center todo">
    <div class="col-auto">

      <div class="row justify-content-center posicion">

        <span class="loader">ReadMeN &nbsp; w!</span>

      </div>

    </div>
  </div>

</template>

<style scoped>

.todo
{
    top: 0;
    position: fixed;
    z-index: 99;
    height: 100%;
    width: 100%;
    background-color: white;
    display: grid;
    left: 0;

}

/* Animation */
.loader {
  display: inline-block;
  font-size: 48px;
  font-family: 'Comfortaa', cursive;
  font-weight: bold;
  color: #D6C8E1;
  position: relative;
}

.loader::before {
  content: '';  
  position: absolute;
  /* Position */
  left: 265px;
  top: 21px;
  /* Size */
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 5px solid #D6C8E1;
  border-bottom-color: #7A60A9;
  box-sizing: border-box;
  animation: rotation 0.6s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}   

</style>