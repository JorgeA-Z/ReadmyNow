<script>
import { defineComponent, ref, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router';
import { getFirestore, collection, query, where, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

const auth = getAuth();

export default defineComponent({
    props:
    {


    },
    methods:
    {
        LibrosRecomendados(generos, libreroPopular) {
            var orden = [];

            var generoStep = 0;
            //Tomamos todos los libros en el librero que coincidan con el genero
            for (var i = 0; i < generos.length; i++) {
                var temp = [];
                for (var j = 0; j < libreroPopular.length; j++) {
                    if (libreroPopular[j].Genero == generos[i].genero || libreroPopular[j].Subgenero == generos[i].genero) {
                        temp.push(libreroPopular[j]);
                        libreroPopular.splice(j, 1);
                        j--;
                    }
                }
                //Aleatorizamos el orden de recomendacion del paso por genero
                var mixed = this.mezclarFisherYates(temp);

                for (var k = 0; k < mixed.length; k++) {
                    if (generoStep <= 0) {
                        orden.push(mixed[k]);
                    }
                    else if (k < generoStep) {
                        //Establecemos haciendo uso del cambio de genero con un step
                        orden.push(mixed[k]);
                    }
                }
            }

            return orden;
        },

        RecomendacionesUsuario(libreroUsuario, generosLiterarios) {
            var popularidad = [];
            var generosPopularidad =
                [{
                    genero: "",
                    popularidad: 0
                }];
            generosPopularidad.splice(0, 1);
            for (var i = 0; i < generosLiterarios.length; i++) {
                var objeto =
                {
                    genero: generosLiterarios[i], popularidad: 0
                };
                generosPopularidad.push(objeto);
            }

            for (let i = 0; i < libreroUsuario.length; i++) {
                var libro = libreroUsuario[i];
                var sumaPopularidad = 0;


                if (libro.Favorito == true) {
                    sumaPopularidad += 2.5;
                }

                // Cada 7 min de lectura es un punto para su popularidad
                sumaPopularidad += libro.TiempoIndividual / 2;

                // Agregar la suma de popularidad al arreglo
                popularidad.push(sumaPopularidad);

                // Obtener la posición del género en el arreglo y sumar la popularidad al arreglo de génerosPopularidad
                var generoIndex = generosLiterarios.indexOf(libro.Genero);

                if (generoIndex != -1) {
                    generosPopularidad[generoIndex].popularidad = sumaPopularidad;
                }

                var subGeneroIndex = generosLiterarios.indexOf(libro.Subgenero);
                if (subGeneroIndex != -1) {
                    generosPopularidad[subGeneroIndex].popularidad = sumaPopularidad;
                }
            }
            if (libreroUsuario.length > 0) {
                var generosResultantes = this.quickSortInverso(generosPopularidad);
            }
            else {
                generosResultantes = libreroUsuario;
            }
            // Devolver arreglos de géneros y subgéneros ordenados por popularidad
            return generosResultantes; // Popularidad por género
        },

        RecomendacionesPopulares(libreroPopular, generosLiterarios) {
            var popularidad = [];
            var generosPopularidad =
                [{
                    genero: "",
                    popularidad: 0
                }];
            generosPopularidad.splice(0, 1);
            for (var i = 0; i < generosLiterarios.length; i++) {
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
            // Devolver arreglos de géneros y subgéneros ordenados por popularidad

            return generosResultantes; // Popularidad por género
        },

        Recomendaciones(usuario, popular, influenciaUsuario, influenciaPopularidad, generosLiterarios) {
            // Paso 1: Crear diccionarios de popularidad
            const arreglo_1 = {};
            const arreglo_2 = {};

            usuario.forEach(item => {
                arreglo_1[item.genero] = item.popularidad;
            });

            popular.forEach(item => {
                arreglo_2[item.genero] = item.popularidad;
            });
            /*
            var arreglo1 = [];
            var arreglo2 = [];

            usuario.forEach(item => {
                arreglo1.push(item.genero);
            });

            popular.forEach(item => {
                arreglo2.push(item.genero);
            });
            */

            // Calcular la longitud de los arreglos
            const totalLength = generosLiterarios.length;

            // Crear el tercer arreglo ponderado
            var nuevoArreglo =
                [{
                    genero: "",
                    popularidad: 0
                }];
            nuevoArreglo.splice(0, 1);

            for (let i = 0; i < totalLength; i++) {
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

        jaccardSimilarity(arr1, arr2, influence1, influence2) {
            const set1 = new Set(arr1);
            const set2 = new Set(arr2);

            const intersection = new Set([...set1].filter(item => set2.has(item)));
            const union = new Set([...set1, ...set2]);

            const jaccardIndex = intersection.size / union.size;
            const weightedSimilarity = (jaccardIndex * influence1) + ((1 - jaccardIndex) * influence2);

            return weightedSimilarity;
        },

        mezclarFisherYates(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        },

        quickSort(lista) {
            var n = lista.length;
            for (var i = 0; i < n - 1; i++) {
                for (var j = 0; j < n - i - 1; j++) {
                    if (lista[j].popularidad > lista[j + 1].popularidad) {
                        // Intercambiar elementos si están en el orden incorrecto
                        var temp = lista[j];
                        lista[j] = lista[j + 1];
                        lista[j + 1] = temp;
                    }
                }
            }
            return lista;
        },
        /* Es practicamente BubbleSort
        quickSortInverso(lista) {
            var n = lista.length;
            for (var i = 0; i < n - 1; i++) {
                for (var j = 0; j < n - i - 1; j++) {
                    if (lista[j].popularidad < lista[j + 1].popularidad) { // Cambio de '>' a '<'
                        // Intercambiar elementos si están en el orden incorrecto
                        var temp = lista[j];
                        lista[j] = lista[j + 1];
                        lista[j + 1] = temp;
                    }
                }
            }
            return lista;
        },
        */
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
        async IA() {


            var generosLiterarios =
                ["Romance", "Poesia", "Epistola", "Ensayo", "Teatro", "Drama", "Novela",
                    "Filosofia", "Espiritual", "Religion", "Aventura", "Viajes",
                    "Exploracion", "Ciencia", "Educacion", "Infantil",
                    "Cuentos", "Clasicos", "Fantasia", "H.Alternativa", "C.Ficcion",
                    "Utopica", "Distopia", "Gotica", "PostApocalipsis", "Suspenso",
                    "Terror", "Misterio", "Erotica", "Help"];

            var influenciaUsuario = 0.9;
            var influenciaPopularidad = 0.1;

            var libreroPopular = await this.getGlobalShelf();

            var libreroUsuario = await this.GetUserShelf();

            var generosUsuario = this.RecomendacionesUsuario(libreroUsuario, generosLiterarios);


            var generosPopulares = this.RecomendacionesPopulares(libreroPopular, generosLiterarios);

            var generosRecomendados = this.Recomendaciones(generosUsuario, generosPopulares, influenciaUsuario, influenciaPopularidad, generosLiterarios);

            this.books = this.LibrosRecomendados(generosRecomendados, libreroPopular);

            //console.log(generosUsuario, generosPopulares, generosRecomendados, this.books);
        },
        async getGlobalShelf() {
            var libreroPopular = [];
            const q = query(collection(db, "Libro"));
            const querySnapshot = await getDocs(q);

            for (const doc of querySnapshot.docs) {
                var book =
                {
                    //Datos solicitados para la IA organizados en la estructura del algoritmo
                    TiempoGlobal: doc.get("TiempoGlobal"),
                    Likes: doc.get("Likes"),
                    Genero: doc.get("Genero"),
                    Subgenero: doc.get("Subgenero"),


                    ID: doc.id,

                    About: doc.get("About"),
                    Autor: doc.get("Autor"),
                    Caratula: doc.get("Caratula"),
                    Nombre: doc.get("Nombre"),
                    Libro: doc.get("Url"),
                }
                libreroPopular.push(book);

            }

            return libreroPopular;
        },


        async GetUserShelf() {
            var libreroUsuario = [];
            const q = query(collection(db, "DetalleLibrero"), where("User", "==", this.User));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                for (const doc of querySnapshot.docs) {
                    const BookRef = doc.get('Libro');
                    const BookDoc = await getDoc(BookRef);
                    // Datos solicitados para la IA organizados en la estructura del algoritmo
                    var book = {
                        TiempoIndividual: doc.get('TiempoIndividual'),
                        Favorito: doc.get('Favorito'),
                        Genero: BookDoc.get("Genero"),
                        Subgenero: BookDoc.get("Subgenero"),
                        Visita: doc.get('Visita'),
                    };
                    libreroUsuario.push(book);
                }
            }
            return libreroUsuario;
        }



    },
    data: () => ({
        books: ref([]),
        User: auth.currentUser.uid,

    }),
    created() {


        this.IA();
    },
    mounted() {
    },
})

//Ordenar libros deacuerdo a parámetros

</script>

<template>
    <div class="container mt-4">
        <div class="row">

            <div class="col-lg-2 col-md-3 col-6 col-sm" v-for="(b, index) in books" :key="index">
                <router-link class="link" :to="'/Abook/' + b.ID">
                    <img class="img-fluid m-2" :src="b.Caratula" :alt="b.Nombre">
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.link {
    margin: 0;
    padding: 0;
    text-decoration: none;
}

/*Boton */
.general {
    border: 3px solid #7A60A9;
    color: #7A60A9;
    background-color: #D6C8E1;
    width: 343px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 6px;
    margin-right: 9px;

    /*Atributos del Texto*/
    font-family: 'Comfortaa', cursive;
    font-weight: 900;
    font-size: 13px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: 0.52px;
    text-transform: uppercase;
}

.btn:focus {
    border-color: rgb(122, 96, 169);
    box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
    outline: 0 none;
}
</style>