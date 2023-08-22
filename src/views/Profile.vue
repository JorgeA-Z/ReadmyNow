<script setup>
import Carruselprofile from '../components/Carruselprofile.vue';
import Nabvar from '../components/Nabvar.vue';

</script>

<template>
  <Nabvar />

  <div class="container">
    <div class="row">
      <div class="col-lg-5">

        <div class="row justify-content-center align-self-center">
          <img
            src="https://brightspotcdn.byu.edu/dims4/default/08176f1/2147483647/strip/true/crop/1600x1600+404+0/resize/1200x1200!/quality/90/?url=https%3A%2F%2Fbrigham-young-brightspot.s3.amazonaws.com%2Fa9%2F65%2Fd053ce8e8fc85827b50b449b47cb%2F1609-26-32.jpg"
            class="m-4 rounded-circle img-fluid img-user" alt="">



          <h1 class="mt-4 text-center text-capitalize text-user">angel</h1>

          <h2 class="mt-4 text-center text-location">guadalajara, jal</h2>

          <button type="submit" class="mt-4 mx-2 btn config">
            CONFIG
          </button>

          <button type="submit" class="mt-4 mx-2 btn log-out">
            LOG OUT
          </button>

        </div>






      </div>

      <div class="col-lg-7">

        <div class="m-3 mt-sm-5 mt-lg-4">
          <h4 class="text-left text-uppercase favorities">Favorites</h4>

          <Carruselprofile/>

        </div>

        <div class="m-3 mt-sm-5 mt-lg-4">

          <h4 class="text-left text-uppercase reading">Reading</h4>

          <Carruselprofile/>

        </div>



      </div>
    </div>
  </div>
</template>

<style scoped>
.img-user {
  height: auto;
  object-fit: cover;
  width: 384px;
  flex-shrink: 0;
}

.text-user {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.9px;
}

.text-location {
  color: #D6C8E1;
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

/* Style for bottons */
.config {
  width: 343px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 3px solid #7A60A9;
  background: #7A60A9;

  /*Atributos del Texto*/
  color: #FFF;
  text-align: center;
  font-family: 'Comfortaa', cursive;
  font-size: 17px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.config:focus {
  border-color: rgb(122, 96, 169);
  box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
  outline: 0 none;
}

.log-out {
  width: 343px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 3px solid #7A60A9;
  background: #D6C8E1;

  /*Atributos del Texto*/
  color: #7A60A9;
  text-align: center;
  font-family: 'Comfortaa', cursive;
  font-size: 17px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.log-out:focus {
  border-color: rgb(122, 96, 169);
  box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
  outline: 0 none;
}

/* Part Carrusels */
.favorities {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.8px;
}

.reading {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.8px;
}
</style>
