<script>
import { defineComponent, ref, onUnmounted, toHandlers } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import { getFirestore, collection, query, where, onSnapshot, getDocs, getDoc } from "firebase/firestore";

import 'vue3-carousel/dist/carousel.css'

const db = getFirestore();

export default defineComponent({
    props:
    {
        Categoria: String,

    },

    name: 'Breakpoints',
    components: {
        Carousel,
        Slide,
        Navigation,
    },
    methods:
    {
        async getGlobalShelf() {
            const q = query(collection(db, "Libro"), where('Genero', '==', this.Categoria));
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
            return books;
        },

        async getBooks()
        {
            this.Libros = await this.getGlobalShelf();
        }

    },
    data: () => ({
        Libros: ref([]),

        // carousel settings
        settings: {
            itemsToShow: 1.5,
            snapAlign: 'center',
        },
        // breakpoints are mobile first
        // any settings not specified will fallback to the carousel settings
        breakpoints: {
            // 600px and up
            600: {
                itemsToShow: 2.5,
                snapAlign: 'center',
            },
            // 700px and up
            745: {
                itemsToShow: 3.5,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 4.5,
                snapAlign: 'center',
            },
            1200: {
                itemsToShow: 5.5,
                snapAlign: 'start',
            },
        },
    }),
    created() {


    },
    mounted()
    {
        this.getBooks()
        console.log(this.Libros)

    },
    
})

</script>

<template>

    <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="(Libro, index) in Libros" :key="index">
            <div class="m-2 carrusel">

                <router-link class="link" :to="'/Abook/' + Libro.ID">

                    <img :src="Libro.AutorURL" class="img-autor" alt="">

                    <picture>
                        <img :src="Libro.Caratula" class="img-libro" alt="">
                    </picture>
                    <div class="mt-3 general">

                        <span class="text-capitalize titulo">{{ Libro.Nombre }}</span>

                        <span class="text-capitalize autor">{{ Libro.AutorName }} {{ Libro.AutorLastName }}</span>

                    </div>
                </router-link>
            </div>
        </Slide>

        <template #addons>
            <Navigation />
        </template>
    </Carousel>
</template>
  
<style scoped>.link {
    margin: 0;
    padding: 0;
    text-decoration: none;
}


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
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: block;
}

.img-autor {
    object-fit: cover;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 28px;
    border: 3px solid #D6C8E1;

    /* Sobreposicion sobre img-libro */
    position: absolute;
    z-index: 1;
    margin-top: 275px;
    margin-left: 80px;
}

.carrusel .link .img-libro {
    object-fit: cover;
    height: 300px;
    width: 200px;
    border-radius: 15px;
    border: 3.5px solid #7A60A9;
    box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
    transition: .3s ease-in-out;
}
</style>