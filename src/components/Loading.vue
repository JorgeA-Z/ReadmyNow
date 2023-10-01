<script setup>
import Text from '../components/Text.vue';
</script>

<template>
  <div class="vh-100 row m-0 align-items-center justify-content-center todo">
    <div class="col-auto">

      <div class="row justify-content-center posicion">

        <div class="cont">
          <h1 class="title">ReadMeNow!</h1>
        </div>

        <span class="loader"></span>

      </div>

    </div>
  </div>
</template>

<style scoped>
.todo {
  top: 0;
  position: fixed;
  z-index: 99;
  height: 100%;
  width: 100%;
  background-color: white;
  display: grid;
  left: 0;

}

.cont
{
  display: flex;
  justify-content: center;
}

.title {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.375px;
}

/* Animation */
.loader {
  width: 200px;
  height: 140px;
  background: #7A60A9;
  box-sizing: border-box;
  position: relative;
  border-radius: 8px;
  perspective: 1000px;
}

.loader:before {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
  border-radius: 8px;
  background: #f5f5f5 no-repeat;
  background-size: 60px 10px;
  background-image: linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0);

  background-position: 15px 30px, 15px 60px, 15px 90px,
    105px 30px, 105px 60px, 105px 90px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}

.loader:after {
  content: '';
  position: absolute;
  width: calc(50% - 10px);
  right: 10px;
  top: 10px;
  bottom: 10px;
  border-radius: 8px;
  background: #fff no-repeat;
  background-size: 60px 10px;
  background-image: linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0);
  background-position: 50% 30px, 50% 60px, 50% 90px;
  transform: rotateY(0deg);
  transform-origin: left center;
  animation: paging 1s linear infinite;
}


@keyframes paging {
  to {
    transform: rotateY(-180deg);
  }
}
</style>