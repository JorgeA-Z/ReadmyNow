<script setup>
import Text from '../components/Text.vue';
import IconGoo from './icons/IconGoo.vue';

</script>

<template>
  
  <Text/>

  <button type="submit" class="btn google">
    <IconGoo/>
    </button>

</template>

<style scoped>

.google
{
    width: 167px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 6px;
    background: #7A60A9;
    border: 3px solid #7A60A9;
}

.btn:focus {
    border-color:rgb(122, 96, 169);
    box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169,0.6);
    outline: 0 none;
}

</style>