<script setup>
import Text from '../components/Text.vue';

</script>

<template>
  
  <Text/>

  <button type="submit" class="btn register">
    REGISTER
    </button>

</template>

<style scoped>

.register
{
    width: 167px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 6px;
    background: #7A60A9;
    border: 3px solid #7A60A9;

    /*Atributos del Texto*/
    color: #FFF;
    text-align: center;
    font-family: 'Comfortaa', cursive;
    font-size: 13px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: 0.52px;
    text-transform: uppercase;
}

@media screen and (max-width: 366px) {
  .register {
    width: 130px;
    height: 52px;
  }
}

.btn:focus {
    border-color:rgb(122, 96, 169);
    box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169,0.6);
    outline: 0 none;
}

</style>