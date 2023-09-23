<script setup>
import Text from '../components/Text.vue';
import IconHouse from '../components/icons/IconHouse.vue';
import IconSearch from '../components/icons/IconSearch.vue';
import IconRead from '../components/icons/IconRead.vue';
import IconProfile from '../components/icons/IconProfile.vue';



</script>

<template>

    <Text/>
    <!---->
    <header class="header">
      <div class="logo">
        <span>ReadMeNow!</span>
      </div>

      <nav>
        <ul class="nav-links">
          <li><router-link class="link" to="/Discover"><IconHouse/> <span class="nombre">Home</span></router-link></li>
          <li><router-link class="link" to="/Search"><IconSearch/> <span class="nombre">Search</span></router-link></li>
            <li><router-link class="link" to="/Galery"><IconRead/> <span class="nombre">Read</span></router-link></li>
          <li><router-link class="link" to="/Profile"><IconProfile/> <span class="nombre">Profile</span></router-link></li>
        </ul>
      </nav>

      <span class="version">
        Version 1
      </span>

    </header>


    

    


</template>



<style scoped>

*
{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.header
{
  background-color: #F7F7F7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  padding: 5px 10%;
}

.logo
{
    display: flex;
    align-items: center;
    margin-right: 3px;

    /* Atributo Letra */
    color: #7A60A9;
    font-family: 'Comfortaa', cursive;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.375px;
}

.header .nav-links
{
  list-style: none;
}

.header .nav-links li
{
  display: inline-block;
  padding: 0 20px;
}

.header .nav-links li:hover
{
  transform: scale(1.1);
}

.header .nav-links .link
{
  font-size: 18px;
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  text-decoration: none;

  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.27px;
}

.header .nav-links li .link:hover
{
  color: #D6C8E1;
}

.header .version
{
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.27px;
  visibility:hidden;
}

/* Navbar Mobile */

@media screen and (max-width: 936px) {
  .logo
  {
    display: none;
  }
  .version
  {
    display: none;
  }

  .header 
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width: 800px) {
  .logo
  {
    display: none;
  }
  .version
  {
    display: none;
  }

  .header 
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header .nav-links .nombre
  {
    display: none;
  }
}
</style>