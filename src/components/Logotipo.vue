<script setup>
</script>

<template>

            <div class="cuadro1"> </div>
            <div class="cuadro2" id="imgr2"> </div>
            <img class="imagen" src="../components/Logo.png" alt="">

</template>

<style scoped>
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

.cuadro1 {
    width: 251px;
    height: 251px;
    background-color: rgb(214, 200, 225);
    box-shadow: 0 5px 5px rgba(214, 200, 225, 0.075)inset, 0 0 20px rgba(214, 200, 225, 0.6);
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    margin: 0 auto;
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
    top: 22%;
    left: 0;
    right: 0;
    margin: 0 auto;
    /* Atributos pertenecientes para la animacion */
    -webkit-animation: 8s rotate linear infinite;
    animation: 8s rotate linear infinite;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
}

.imagen
{
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    margin: 0 auto;
}

#imgr2 {
    -webkit-animation-direction: reverse;
    animation-direction: reverse;
}
</style>