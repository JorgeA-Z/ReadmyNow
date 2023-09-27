<script>
import { defineComponent, ref, onUnmounted } from 'vue'
import { getFirestore, onSnapshot, collection, doc, deleteDoc, query, getDocs, getDoc } from 'firebase/firestore';

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


        LibrosRecomendados(generos, libreroPopular) {
            var orden = [];

            for (var i = 0; i < generos.length; i++) {
                var temp = [];
                for (var j = 0; j < libreroPopular.length; j++) {
                    if (libreroPopular[j].Genero == generos[i].genero || libreroPopular[j].Subgenero == generos[i].genero) {
                        temp.push(libreroPopular[j]);
                        libreroPopular.splice(j, 1);
                        j--;
                    }
                }

                var mixed = this.mezclarFisherYates(temp);

                for (var k = 0; k < mixed.length; k++) {
                    orden.push(mixed[k]);
                }
            }

            return orden;
        },

        RecomendacionesPopulares(libreroPopular, generosLiterarios) {
            var popularidad = [];
            var generosPopularidad =
                [{
                    genero: "",
                    popularidad: 0
                }];
            generosPopularidad.splice(0, 1);
            for (var i = 0; i < 30; i++) {
                var objeto = { genero: generosLiterarios[i], popularidad: 0 };
                generosPopularidad.push(objeto);
            }
            for (var i = 0; i < libreroPopular.length; i++) {
                var libro = libreroPopular[i];
                var sumaPopularidad = 0;

                //Por cada favorito agregamos 0.25 a la suma
                sumaPopularidad += libro.Likes * 0.25;

                // Cada min de lectura es un punto para su popularidad
                sumaPopularidad += libro.TiempoGlobal / 60;

                // Agregar la suma de popularidad al arreglo
                popularidad.push(sumaPopularidad);

                // Obtener la posición del género en el arreglo y sumar la popularidad al arreglo de génerosPopularidad
                var generoIndex = generosLiterarios.indexOf(libro.Genero);
                //console.log(libro.Genero, generoIndex, sumaPopularidad);
                if (generoIndex !== -1) {
                    generosPopularidad[generoIndex].popularidad += sumaPopularidad;
                }
                var subGeneroIndex = generosLiterarios.indexOf(libro.Subgenero);
                if (subGeneroIndex !== -1) {
                    generosPopularidad[subGeneroIndex].popularidad += sumaPopularidad;
                }
            }

            var generosResultantes = this.quickSortInverso(generosPopularidad);

            return generosResultantes;
        },

        Recomendaciones(usuario, popular, influenciaUsuario, influenciaPopularidad, generosLiterarios) {
            const arreglo_1 = {};
            const arreglo_2 = {};

            usuario.forEach(item => {
                arreglo_1[item.genero] = item.popularidad;
            });

            popular.forEach(item => {
                arreglo_2[item.genero] = item.popularidad;
            });

            // Crear el tercer arreglo ponderado
            var nuevoArreglo =
                [{
                    genero: "",
                    popularidad: 0
                }];
            nuevoArreglo.splice(0, 1);

            for (let i = 0; i < 30; i++) {
                // Calcular el valor ponderado
                var pU = arreglo_1[generosLiterarios[i]];

                var pG = arreglo_2[generosLiterarios[i]];
                if (pU == null) {
                    pU = 0;
                }
                if (pG == null) {
                    pG = 0;
                }
                const valorPonderado = (influenciaUsuario * pU) + (influenciaPopularidad * pG);

                //console.log(generosLiterarios[i], pU, pG, valorPonderado);

                // Agregar el valor ponderado al nuevo arreglo si no está presente
                if (!nuevoArreglo.includes(valorPonderado)) {
                    var objeto = { genero: generosLiterarios[i], popularidad: valorPonderado };
                    nuevoArreglo.push(objeto);
                }
            }

            var generosResultantes = this.quickSortInverso(nuevoArreglo);
            // Devolver arreglos de géneros y subgéneros ordenados por popularidad
            return generosResultantes;
        },

        mezclarFisherYates(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        },

        quickSortInverso(lista) {
            if (lista.length <= 1) {
                return lista;
            }

            var stack = [];
            stack.push({ left: 0, right: lista.length - 1 });

            while (stack.length > 0) {
                var { left, right } = stack.pop();
                var pivotIndex = this.partitionInverso(lista, left, right);

                if (left < pivotIndex - 1) {
                    stack.push({ left, right: pivotIndex - 1 });
                }
                if (pivotIndex < right) {
                    stack.push({ left: pivotIndex, right });
                }
            }

            return lista;
        },

        partitionInverso(lista, left, right) {
            var pivot = lista[Math.floor((left + right) / 2)];
            while (left <= right) {
                while (lista[left].popularidad > pivot.popularidad) {
                    left++;
                }
                while (lista[right].popularidad < pivot.popularidad) {
                    right--;
                }
                if (left <= right) {
                    var temp = lista[left];
                    lista[left] = lista[right];
                    lista[right] = temp;
                    left++;
                    right--;
                }
            }
            return left;
        },

        Vectorizar(books) {
            var generosLiterariosV =
                ["Romance", "Poesia", "Epistola", "Ensayo", "Teatro", "Drama", "Novela",
                    "Filosofia", "Espiritual", "Religion", "Aventura", "Viajes",
                    "Exploracion", "Ciencia", "Educacion", "Infantil",
                    "Cuentos", "Clasicos", "Fantasia", "H.Alternativa", "C.Ficcion",
                    "Utopica", "Distopia", "Gotica", "PostApocalipsis", "Suspenso",
                    "Terror", "Misterio", "Erotica", "Help"];

            for (var elemento of books) {
                var bookV = generosLiterariosV.indexOf(elemento.Genero);
                var bookV2 = generosLiterariosV.indexOf(elemento.Subgenero);

                elemento.Genero = bookV;
                elemento.Subgenero = bookV2;
            }
            return books;
        },

        async IA() {
            var generosLiterarios =
                [0, 1, 2, 3, 4, 5, 6,
                    7, 8, 9, 10, 11,
                    12, 13, 14, 15,
                    16, 17, 18, 19, 20,
                    21, 22, 23, 24, 25,
                    26, 27, 28, 29];

            var influenciaUsuario = 0.9;
            var influenciaPopularidad = 0.1;

            var libreroPopular = await this.getGlobalShelf();

            var generosPopulares = this.RecomendacionesPopulares(libreroPopular, generosLiterarios);
            var generosRecomendados = this.Recomendaciones(generosPopulares, generosPopulares, influenciaUsuario, influenciaPopularidad, generosLiterarios);
            this.Libros = this.LibrosRecomendados(generosRecomendados, libreroPopular);
            this.isLoading = false;
        },
        async getGlobalShelf() {
            const q = query(collection(db, "Libro"));
            const querySnapshot = await getDocs(q);

            const autorRefs = querySnapshot.docs.map((doc) => doc.get('Autor'));
            const autorDocs = await Promise.all(autorRefs.map((ref) => getDoc(ref)));

            const books = querySnapshot.docs.map((doc, i) => {
                const { TiempoGlobal, Likes, Genero, Subgenero, About, Caratula, Nombre, Url } = doc.data();
                const AutorRef = doc.get('Autor');
                const AutorDoc = autorDocs[i];

                return {
                    TiempoGlobal,
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

            return this.Vectorizar(books);
        },
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
        this.IA();
    },
    mounted() {
    },
})
</script>

<template>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="(Libro, index) in Libros" :key="index">
            <div v-if="index <= 10" class="m-2 carrusel">
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