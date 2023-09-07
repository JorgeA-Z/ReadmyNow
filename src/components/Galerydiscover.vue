<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted} from 'vue';
import {getFirestore, collection, query, where, getDocs } from "firebase/firestore";

let books = ref([]);

const db = getFirestore();

const q = query(collection(db, "Libro"));

getDocs(q).then((querySnapshot) => {
  const promises = [];
  querySnapshot.forEach((doc) => {

    var book =
    {
        ID: doc.id,
        Nombre: doc.get('Nombre'),
        Caratula: doc.get('Caratula'),
        Libro: doc.get('Url'),
        Autor: doc.get('Autor'),

    }
    promises.push(book)

  });
  
  Promise.all(promises).then((booksData) => {
        
        books.value = booksData;
  });

});

const visita = () => {
    console.log("Visita")

}

</script>

<template>
    <div class="container mt-4">
        <div class="row">

            <div class="col-lg-2 col-md-3 col-6 col-sm" v-for="(b, index) in books" :key="index">
                <router-link @click="visita" class="link" :to="'/Abook/'+ b.ID">
                    <img class="img-fluid m-2" :src="b.Caratula" :alt="b.Nombre">
                </router-link>
            </div>
        </div>
    </div>

    <div class="m-4 row justify-content-center">

        <button type="submit" class="btn general">
            SEE MORE
        </button>

    </div>
</template>

<style scoped>
.link {
    margin: 0;
    padding: 0;
    text-decoration: none;
}

/*Boton */
.general
{
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
    border-color:rgb(122, 96, 169);
    box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169,0.6);
    outline: 0 none;
}
</style>