<script>
import { defineComponent, ref, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router';
import { getFirestore, collection, query, where, onSnapshot} from "firebase/firestore";

const db = getFirestore();

export default defineComponent({
    props:
    {
      books: Array,

    },
    methods:
    {


    },
    data: () => ({

    }),
})

//Ordenar libros deacuerdo a parámetros

</script>

<template>
    <!--
    <div class="container mt-4">
        <div class="row">

            <div class="col-lg-2 col-md-3 col-6 col-sm" v-for="(b, index) in books" :key="index">
                <router-link class="link" :to="'/Abook/' + b.ID">
                    <img class="img-fluid m-2" :src="b.Caratula" :alt="b.Nombre">
                </router-link>
            </div>
        </div>
    </div>-->

    <div class="container mt-4">
        <div class="row">
            <article class="col-lg-2 col-md-3 col-6 col-sm" v-for="(b, index) in books" :key="index">
                <span class="material-symbols-outlined open">
                    open_in_new
                </span>
                <router-link class="link" :to="'/Abook/' + b.ID">
                    
                    <!-- OJO Y VISTAS-->
                    <div class="views">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path
                                d="M19.5 5C15.489 5.00584 11.5936 6.48486 8.42582 9.20459C5.25809 11.9243 2.99772 15.7305 2 20.025C3.00624 24.3102 5.27027 28.1052 8.43722 30.8152C11.6042 33.5252 15.495 34.997 19.5 35C23.511 34.9942 27.4064 33.5151 30.5742 30.7954C33.7419 28.0757 36.0023 24.2695 37 19.975C35.9938 15.6898 33.7297 11.8948 30.5628 9.18482C27.3958 6.47481 23.505 5.00298 19.5 5ZM19.5 10C21.8992 10 24.2002 11.0536 25.8967 12.9289C27.5932 14.8043 28.5463 17.3478 28.5463 20C28.5463 22.6522 27.5932 25.1957 25.8967 27.0711C24.2002 28.9464 21.8992 30 19.5 30C17.1008 30 14.7998 28.9464 13.1033 27.0711C11.4068 25.1957 10.4537 22.6522 10.4537 20C10.4537 17.3478 11.4068 14.8043 13.1033 12.9289C14.7998 11.0536 17.1008 10 19.5 10Z"
                                fill="#7A60A9" />
                            <path
                                d="M24.0231 20C24.0231 21.3261 23.5466 22.5979 22.6983 23.5355C21.8501 24.4732 20.6996 25 19.5 25C18.3004 25 17.1499 24.4732 16.3017 23.5355C15.4534 22.5979 14.9769 21.3261 14.9769 20C14.9769 18.6739 15.4534 17.4021 16.3017 16.4645C17.1499 15.5268 18.3004 15 19.5 15C20.6996 15 21.8501 15.5268 22.6983 16.4645C23.5466 17.4021 24.0231 18.6739 24.0231 20Z"
                                fill="#7A60A9" />
                        </svg>
                        <span class="likes">{{ b.TiempoGlobal }}</span>
                    </div>


                    <!-- TITULO Y AUTOR -->
                    <div class="contenedorLibro">
                        <span class="text-capitalize titulo">{{b.Nombre}}</span>
                        <span class="text-capitalize autor">{{b.AutorName}}</span>
                    </div>

                    <!-- PORTADA LIRBO -->
                    <img class="img-fluid m-2 first-child" :src="b.Caratula" :alt="b.Nombre">

                    <!-- IMAGEN AUTOR-->
                    <img class="last-child" :src="b.AutorURL" alt="">

                </router-link>
            </article>
        </div>
    </div>
</template>

<style scoped>
.link {
    margin: 0;
    padding: 0;
    text-decoration: none;
}

/* Simbolo abrir */
.open {
    position: absolute;
    right: 5%;
    top: 7%;
    margin: auto;
    transform: translateY(10%);
    transition: .3s ease;
    color: aliceblue;
    visibility: hidden;
}

/* Ojo y Likes */
.views {
    position: absolute;
    top: 3%;
    left: 12%;
    margin: auto;
    transform: translateY(10%);
    transition: .3s ease;
    opacity: 0;

    align-self: center;
    align-items: center;
}

.likes {
    color: #D6C8E1;
    font-family: 'Comfortaa', cursive;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
}

/* DIV CONTENEDOR DE TITULO Y AUTOR */
.titulo {
    color: #7A60A9;
    font-family: 'Comfortaa', cursive;
    font-size: 11px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;

}

.autor {
    color: #D6C8E1;
    font-family: 'Comfortaa', cursive;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: block;
}

.contenedorLibro {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0%;
    top: 65%;
    margin: auto;
    transform: translateY(25%);
    transition: .3s ease;
    opacity: 0;
    text-align: center;
}

/* Animation de la card*/
article {
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer */
    -khtml-user-select: none;
    /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none;
    /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none;
    /* Disable Android and iOS callouts*/
    position: relative;
    transition: all .3s ease;
}

article img:first-child {
    box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
    border-radius: 4px;
    object-fit: cover;
}

article img:last-child {
    object-fit: cover;
    position: absolute;
    top: 15%;
    bottom: 0;
    left: 0;
    right: 0%;
    margin: auto;
    transform: translateY(25%);
    transition: .3s ease;
    opacity: 0;

    width: 45px;
    height: 45px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 3px solid #7A60A9;

}

article:hover,
article:focus {
    transform:
        perspective(250px) rotateX(10deg) translateY(-5%) translateZ(0);
}

article::before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 96%;
    background-image:
        linear-gradient(to bottom,
            transparent 10%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0) 95%);
    opacity: 0;
    transition: all .3s ease;
}

article:hover::before,
article:focus::before {
    opacity: 1;
}

article:hover img:last-child,
article:focus img:last-child {
    opacity: 1;
    transform: translateY(10%);
}

article:hover .contenedorLibro,
article:focus .contenedorLibro {
    opacity: 1;
    transform: translateY(10%);
}

article:hover .views,
article:focus .views {
    opacity: 1;
    transform: translateY(10%);
}

/* Active */
article:active {
    transform:
        perspective(250px) rotateX(10deg) translateY(-5%) translateZ(0);
}

article:active::before {
    opacity: 1;
}

article:active img:last-child {
    opacity: 1;
    transform: translateY(10%);
}

article:active .contenedorLibro {
    opacity: 1;
    transform: translateY(10%);
}

article:active .views {
    opacity: 1;
    transform: translateY(10%);
}

/* Responsive de corazon, likes y simbolo abrir*/
@media screen and (max-width: 800px) {

    .open {
        visibility: visible;
    }

}
</style>