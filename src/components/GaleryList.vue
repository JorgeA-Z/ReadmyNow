<script>
import { defineComponent, ref, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router';
import { getFirestore, collection, query, where, onSnapshot, getDocs, getDoc } from "firebase/firestore";
const db = getFirestore();

export default defineComponent({
    props:
    {
        User: String,

    },
    methods:
    {
        async getGlobalShelf() {       
            const q = query(collection(db, "Libro"));
            const querySnapshot = await getDocs(q);

            const autorRefs = querySnapshot.docs.map((doc) => doc.get('Autor'));
            const autorDocs = await Promise.all(autorRefs.map((ref) => getDoc(ref)));

            const books = querySnapshot.docs.map((doc, i) => {
                const { TiempoGlobal, Likes, Genero, Subgenero, About, Caratula, Nombre, Url } = doc.data();
                const AutorRef = doc.get('Autor');
                const AutorDoc = autorDocs[i];
                
                var t = Math.ceil(TiempoGlobal);
                return {
                    TiempoGlobal: t,
                    Likes,
                    Genero,
                    Subgenero,
                    ID: doc.id,
                    About,
                    Autor: AutorRef,
                    AutorName: AutorDoc.get('Nombre'),
                    AutorLastName: AutorDoc.get('Apellido'),
                    AutorURL: AutorDoc.get('Url'),
                    Caratula,
                    Nombre,
                    Url,
                };
            });
            this.books = books
        },


    },
    data: () => ({
        books: ref([]),

    }),
    mounted() {
        this.getGlobalShelf()

    },
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
                    
                    <!-- CORAZON Y lIKES-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="42" viewBox="0 0 22 20" fill="none"
                        class="mx-2 corazon">
                        <path
                            d="M15.1111 1C18.6333 1 21 4.3525 21 7.48C21 13.8138 11.1778 19 11 19C10.8222 19 1 13.8138 1 7.48C1 4.3525 3.36667 1 6.88889 1C8.91111 1 10.2333 2.02375 11 2.92375C11.7667 2.02375 13.0889 1 15.1111 1Z"
                            stroke="#7A60A9" fill="#7A60A9" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <span class="likes">{{b.TiempoGlobal}}</span>


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

/* Corazon y Likes */
.corazon {
    position: absolute;
    top: 4%;
    left: 8%;
    margin: auto;
    transform: translateY(10%);
    transition: .3s ease;
    opacity: 0;
}

.likes {
    color: #D6C8E1;
    font-family: 'Comfortaa', cursive;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;

    position: absolute;
    top: 8%;
    left: 14%;
    margin: auto;
    transform: translateY(25%);
    transition: .3s ease;
    opacity: 0;
}

/* DIV CONTENEDOR DE TITULO Y AUTOR */
.titulo {
    color: #7A60A9;
    font-family: 'Comfortaa', cursive;
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
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

article:hover, article:focus {
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

article:hover::before, article:focus::before {
    opacity: 1;
}

article:hover img:last-child, article:focus img:last-child {
    opacity: 1;
    transform: translateY(10%);
}

article:hover .contenedorLibro, article:focus .contenedorLibro {
    opacity: 1;
    transform: translateY(10%);
}

article:hover .likes, article:focus .likes {
    opacity: 1;
    transform: translateY(10%);
}

article:hover .corazon, article:focus .corazon {
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

article:active .likes {
    opacity: 1;
    transform: translateY(10%);
}

article:active .corazon {
    opacity: 1;
    transform: translateY(10%);
}

/* Responsive de corazon, likes y simbolo abrir*/
@media screen and (max-width: 1200px) {
    .likes {
        top: 10%;
        left: 16%;
    }
}

@media screen and (max-width: 800px) {

    .open {
        visibility: visible;
    }

}

@media screen and (max-width: 768px) {
    .likes {
        top: 8.5%;
        left: 13.5%;
    }
}

@media screen and (max-width: 460px) {
    .likes {
        top: 9%;
        left: 14%;
    }
}

@media screen and (max-width: 388px) {
    .likes {
        top: 9%;
        left: 15.2%;
    }
}
</style>