<script setup>
  import ePub from 'epubjs';
  
  const props = defineProps(['link'])

  
  var book = ePub(props.link);

  var rendition =  book.renderTo("area", { flow: "scrolled-doc" });
  


  
  var displayed = rendition.display();
  
  const next = () =>
  {
    rendition.next();
    console.log("Next")
  }; 

  
  const prev = () =>
  {
    rendition.prev();
    
  };
</script>

<template>


</template>

<style scoped>

</style>