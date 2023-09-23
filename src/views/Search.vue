<script>
import Nabvar from '../components/Nabvar.vue';
import { getFirestore, onSnapshot, collection, doc, query, getDoc, where, or } from 'firebase/firestore';
import Results from '../components/Results.vue';
import {ref } from 'vue'

const db = getFirestore();
export default {

  data() {
    return {
      searchQuery: '',
      Books: ref([]),
      results: ref([]),
      indice: {},


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

      
      const Query = this.searchQuery.trim().toLocaleLowerCase()
      
      console.log(Query)
      

      this.results = this.indice[Query] || [];

    }
  },
  created() {
    const q = query(collection(db, "Libro"));
    onSnapshot(q, async (snapshot) => {
      snapshot.forEach( async (doc) => {
        
        const AutorDoc = await getDoc(doc.get("Autor"));

        var book =
        {
          //Datos solicitados para la IA organizados en la estructura del algoritmo
          Genero: doc.get("Genero"),
          Subgenero: doc.get("Subgenero"),


          ID: doc.id,

          About: doc.get("About"),
          
          AutorName: AutorDoc.get("Nombre"),
          AutorLastname: AutorDoc.get("Apellido"),

          Caratula: doc.get("Caratula"),
          
          Nombre: doc.get("Nombre"),
          
          Libro: doc.get("Url"),
        }
        
        const palabras = [book.Genero.toLowerCase(), book.Subgenero.toLowerCase(), book.AutorName.toLowerCase(), book.AutorLastname.toLowerCase(), book.AutorName.toLowerCase() + " " + book.AutorLastname.toLowerCase(), book.Nombre.toLowerCase()]
      
        for(const palabra of palabras)
        {
          if(!this.indice[palabra])
          {
            this.indice[palabra] = []
          }
          this.indice[palabra].push(book);
        }

      })

    })

  },
  mounted() 
  {

  },
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

    <span v-if="results.length > 0" class="text">ALL RESULTS</span>
    <span v-if="results.length == 0" class="text">NO RESULTS</span>
    <Results :books="results"></Results>
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
