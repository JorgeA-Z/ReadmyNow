<script>
import { defineComponent, ref, onUnmounted } from 'vue'
import { getFirestore, onSnapshot, collection, doc, deleteDoc, query, getDoc } from 'firebase/firestore';

import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

const db = getFirestore();

export default defineComponent({
    name: 'Breakpoints',
    components: {
        Carousel,
        Slide,
        Navigation,
    },
    methods: {
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
    mounted() {
        const latestQuery = query(collection(db, "Libro"));
        const liveLibros = onSnapshot(latestQuery, async (snapshot) => {
            this.Libros = await Promise.all(snapshot.docs.map(async (bookDoc) => {
                const AutorRef = bookDoc.get('Autor'); // Supongo que 'Genero' es una referencia a otro documento

                const AutorDoc = await getDoc(AutorRef); // Obtener el documento referenciado

                return {

                    id: bookDoc.id,
                    Caratula: bookDoc.get('Caratula'),
                    Genero: bookDoc.get('Genero'),
                    Nombre: bookDoc.get('Nombre'),
                    Subgenero: bookDoc.get('Subgenero'),
                    Url: bookDoc.get('Url'),
                    AutorName: AutorDoc.get('Nombre'),
                    AutorLastName: AutorDoc.get('Apellido'),
                    AutorURL: AutorDoc.get('Url')
                }
            }));
        });
        onUnmounted(liveLibros)
    }

})
</script>

<template>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="(Libro, index) in Libros" :key="index">
            <div v-if="index <= 10" class="m-2 carrusel">
                <router-link class="link" :to="'/Abook/' + Libro.id">

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
  
<style scoped>
.link {
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