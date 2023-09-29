<script setup>
import BtnLogIn from '../components/BtnLogIn.vue';
import BtnRegister from '../components/BtnRegister.vue';

</script>

<template>

  <div class="vh-100 row m-0 align-items-center justify-content-center">
    <div class="col-auto">

      <div class="row justify-content-center posicion">
        <div class="cuadro1"> </div>
        <div class="m-3 cuadro2" id="imgr2"> </div>
        <img class="imagen" src="../components/Logo.png" alt="">
      </div>

      <div class="mb-2 position">

        <router-link to="/Login">
          <BtnLogIn>
          </BtnLogIn>
        </router-link>
        
        <router-link to="/Register">
          <BtnRegister>
          </BtnRegister>
        </router-link>

      </div>

        

    </div>
  </div>
  <!--
  <Burbujas/>-->

</template>

<style scoped>

.cuadro1 {
    width: 251px;
    height: 251px;
    background-color: rgb(214, 200, 225);
    box-shadow: 0 5px 5px rgba(214, 200, 225, 0.075)inset, 0 0 20px rgba(214, 200, 225, 0.6);
    /* Atributos pertenecientes para la animacion */
    -webkit-animation: 8s rotate linear infinite;
    animation: 8s rotate linear infinite;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
}

.cuadro2 {
    width: 220px;
    height: 220px;
    background-color: #7A60A9;
    box-shadow: 0 5px 5px rgba(122, 96, 169, 0.075)inset, 0 0 20px rgba(122, 96, 169, 0.6);
    position: absolute;
    /* Atributos pertenecientes para la animacion */
    -webkit-animation: 8s rotate linear infinite;
    animation: 8s rotate linear infinite;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
}

.imagen {
  width: 251px;
  height: 251px;
  position: absolute;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes rotate {
    from {
        -webkit-transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
    }
}

#imgr2 {
    -webkit-animation-direction: reverse;
    animation-direction: reverse;
}

.position {

  margin-top: 100px;

}

.posicion {
  margin-top: 63px;
}
</style>
