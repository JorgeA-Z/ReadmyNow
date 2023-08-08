<script setup>
import Boton from '../components/Boton.vue';
import Google from '../components/Google.vue';
import Text from '../components/Text.vue';
import Flecha from '../components/icons/Flecha.vue';

</script>

<template>
    <Text />
    
    <div class="d-flex d-flex justify-content-center vh-100">
        <div class="d-flex d-flex justify-content-center align-items-center">
            <form action="">

                <Flecha/>

                <div class="mb-3 mt-3">
                    <h1 class="text">Log in</h1>
                </div>

                <div class="mb-3">
                    <input type="email" class="form-control general" required placeholder="email">
                </div>

                <div class="mb-3">
                    <input type="password" class="form-control general" required placeholder="password">
                </div>

                <Boton />

                <Google />

            </form>
        </div>
    </div>
</template>

<style scoped>
.text {
    color: #7A60A9;
    font-family: 'Comfortaa', cursive;
    font-size: 36px;
    font-weight: 500;
    letter-spacing: -0.54px;
}

.general {
    width: 343px;
    height: 52px;
    flex-shrink: 0;
    border: 2px solid #7A60A9;
    background-color: #fff;

    /*Atributos del texto*/
    color: #7A60A9;
    font-family: 'Comfortaa', cursive;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

/** Para evitar el sombreado cuando el input tiene el foco **/
.form-control:focus {
    border-color: rgb(122, 96, 169);
    box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
    outline: 0 none;
}



::placeholder {
    color: #7A60A9;
    font-family: 'Comfortaa', cursive;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>