<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>


<template>
  <header>
  </header>

  <main>

    <RouterView></RouterView>


  </main>
</template>

<style scoped></style>
