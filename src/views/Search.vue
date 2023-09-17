<script>
import Nabvar from '../components/Nabvar.vue';
import { getFirestore, onSnapshot, collection, doc, query, getDoc, where, or } from 'firebase/firestore';
import Results from '../components/Results.vue';
const db = getFirestore();
export default {

  data() {
    return {
      searchQuery: '',
      searchResults: []
    };
  },
  components:
  {
    Nabvar,
    Results,

  },
  methods: {
    search() {

      // Realiza la búsqueda en Firebase Firestore aquí
      this.searchResults = [];

      const Query = this.searchQuery.trim()
      
      const latestQuery = query(collection(db, 'Libro'), or(where('Nombre', '==', Query), where('Genero', '==', Query), where('Subgenero', '==', Query)));
      const unsubscribe = onSnapshot(latestQuery, async (snapshot) => {
        snapshot.forEach((doc) => {
          var book =
          {
            ID: doc.id,
            Nombre: doc.get('Nombre'),
            Caratula: doc.get('Caratula'),
            Libro: doc.get('Url'),
            Autor: doc.get('Autor'),

          }
          console.log(doc)
          this.searchResults.push(book)
        });


      })

    }
  }
};

</script >


<template>
  <Nabvar />

  <div class="m-4 row justify-content-center">

    <h1 class="text-center search">Search</h1>

    <input v-model="searchQuery" @input="search" type="text" class="form-control mt-2 busqueda" required
      placeholder="Search all books">

  </div>

  <div class="m-3">

    <span class="text">ALL RESULTS</span>
    <Results :books="searchResults" ></Results>
  </div>
</template>

<style scoped>
.centrar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.search {
  color: #7A60A9;
  font-family: Comfortaa;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.54px;
}

.busqueda {
  width: 735px;
  height: 55px;
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

/* ALL RESULTS */
.text {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 13px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.52px;
  text-transform: uppercase;
}
</style>
