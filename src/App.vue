<script setup>
</script>

<template>
  <header>
    <nav class="nav nav-pills flex-column flex-sm-row Navigation">
      <router-link class="flex-sm-fill text-sm-center text" to="/">
            Loggout
      </router-link>
      
      <router-link class="flex-sm-fill text-sm-center text" to="/Config"> Config </router-link>
      
      <router-link class="flex-sm-fill text-sm-center text" to="/ABook"> ABook </router-link>

      <router-link class="flex-sm-fill text-sm-center text" to="/Profile"> Profile</router-link>

      <router-link class="flex-sm-fill text-sm-center text" to="/Results"> Results</router-link>

      <router-link class="flex-sm-fill text-sm-center text" to="/Search"> Search</router-link>

      <router-link class="flex-sm-fill text-sm-center text" to="/Discover"> Discover</router-link>

    </nav>


  </header>

  <main>
    <RouterView></RouterView>
  </main>
</template>

<style>

</style>
