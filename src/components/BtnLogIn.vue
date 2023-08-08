<script setup>
import Text from '../components/Text.vue';

</script>

<template>
  
  <Text/>

  <button type="submit" class="btn general">
    LOG IN
    </button>

</template>

<style scoped>

.general
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

.btn:focus {
    border-color:rgb(122, 96, 169);
    box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169,0.6);
    outline: 0 none;
}

</style>

