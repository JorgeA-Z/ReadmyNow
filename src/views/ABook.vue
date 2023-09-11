<script setup>

import Nabvar from '../components/Nabvar.vue';
import Reader from '../components/Reader.vue';
import { ref, onMounted } from 'vue'
import { getFirestore, collection, query, where, getDoc, doc, getDocs, setDoc, addDoc, and } from "firebase/firestore";;

import { getAuth } from "firebase/auth";

const props = defineProps(['ID'])

const db = getFirestore();

const bookData = ref([]);
const AutorData = ref([]);
const bookRef = doc(db, "Libro", props.ID);
const fav = ref(false);

const auth = getAuth();

const User = auth.currentUser.uid;

const q = query(collection(db, "DetalleLibrero"), and(where("Libro", "==", bookRef), where("User", "==", User)));



onMounted(async () => {
  try {
    const bookDoc = await getDoc(bookRef);
    if (bookDoc.exists()) {
      bookData.value = {
        ID: bookDoc.id,
        Caratula: bookDoc.get('Caratula'),
        Genero: bookDoc.get('Genero'),
        Nombre: bookDoc.get('Nombre'),
        Subgenero: bookDoc.get('Subgenero'),
        Url: bookDoc.get('Url'),
        About: bookDoc.get('About')
      };

      const autDoc = await getDoc(bookDoc.get('Autor'));

      if (autDoc.exists()) {
        AutorData.value = {
          Apellido: autDoc.get('Apellido'),
          Nombre: autDoc.get('Nombre'),
          Url: autDoc.get('Url'),
          About: autDoc.get('About')
        };

      };


      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((shefDoc) => {
          fav.value = shefDoc.get('Favorito')
        }

        )

      }




    } else {
      console.log('El documento no existe.');
    }
  } catch (error) {
    console.error('Error al obtener el documento:', error);
  }
});

const reading = ref(false);



const popbook = async () => {

  reading.value = !reading.value;


  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {

    const DetalleRef = await addDoc(collection(db, 'DetalleLibrero'), {
      Favorito: fav.value,
      Libro: bookRef,
      Marcadores: [],
      TiempoIndividual: 0,
      User: User,
      Visita: 1,
    });

    const p = query(collection(db, "Librero"), where("User", "==", User));

    const qs = await getDocs(p);

    qs.forEach((docR) => {

      var libros = docR.get('Libros')

      libros.splice(0, 0, DetalleRef);

      setDoc(doc(db, 'Librero', docR.id), {
        Libros: libros,
        User: docR.get('User')

      })
    });


  } else {
    console.log("Actualiza pero tambien probamos, y actualizamos")

    querySnapshot.forEach((docS) => {

      setDoc(doc(db, 'DetalleLibrero', docS.id), {
        Favorito: fav.value,
        Libro: docS.get('Libro'),
        Marcadores: docS.get('Marcadores'),
        TiempoIndividual: docS.get('TiempoIndividual'),
        User: docS.get('User'),
        Visita: docS.get('Visita') + 1,

      })
    }

    )
  }

}

const favorites = async () => {

  fav.value = !fav.value;
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {

    const DetalleRef = await addDoc(collection(db, 'DetalleLibrero'), {
      Favorito: fav.value,
      Libro: bookRef,
      Marcadores: [],
      TiempoIndividual: 0,
      User: User,
      Visita: 1,
    });

    const p = query(collection(db, "Librero"), where("User", "==", User));

    const qs = await getDocs(p);

    qs.forEach((docR) => {

      var libros = docR.get('Libros')

      libros.splice(0, 0, DetalleRef);

      setDoc(doc(db, 'Librero', docR.id), {
        Libros: libros,
        User: docR.get('User')

      })
    });


  } else {
    console.log("Actualiza")

    querySnapshot.forEach((docS) => {

      setDoc(doc(db, 'DetalleLibrero', docS.id), {
        Favorito: fav.value,
        Libro: docS.get('Libro'),
        Marcadores: docS.get('Marcadores'),
        TiempoIndividual: docS.get('TiempoIndividual'),
        User: docS.get('User'),
        Visita: docS.get('Visita'),

      })
    }

    )
  }
}

</script>

<template>
  <div v-if="reading == true">
    <Reader :link="bookData.Url"></Reader>

  </div>

  <div v-if="reading == false">

    <Nabvar />

    <!-- Foto y datos del libro y su autor -->
    <div class="d-flex acomodo">
      <img :src="AutorData.Url" class="mt-3 ms-3 me-2 mx-sm-3 img-auto" alt="IMG-AUTOR">

      <div class="mt-3 mt-sm-4">
        <h5 class="text-capitalize text-break titulo">{{ bookData.Nombre }}</h5>

        <h5 class="text-capitalize text-break autor">{{ AutorData.Nombre }} {{ AutorData.Apellido }}</h5>
      </div>

    </div>

    <!-- Iconos para favoritos y para cerrar -->
    <div class="d-flex icons">

      <svg v-if="fav == false" @click="favorites" xmlns="http://www.w3.org/2000/svg" width="30" height="34"
        viewBox="0 0 22 20" fill="none" class="mx-2 equis">
        <path
          d="M15.1111 1C18.6333 1 21 4.3525 21 7.48C21 13.8138 11.1778 19 11 19C10.8222 19 1 13.8138 1 7.48C1 4.3525 3.36667 1 6.88889 1C8.91111 1 10.2333 2.02375 11 2.92375C11.7667 2.02375 13.0889 1 15.1111 1Z"
          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <svg v-if="fav == true" @click="favorites" xmlns="http://www.w3.org/2000/svg" width="30" height="34"
        viewBox="0 0 22 20" fill="none" class="mx-2 equis">
        <path
          d="M15.1111 1C18.6333 1 21 4.3525 21 7.48C21 13.8138 11.1778 19 11 19C10.8222 19 1 13.8138 1 7.48C1 4.3525 3.36667 1 6.88889 1C8.91111 1 10.2333 2.02375 11 2.92375C11.7667 2.02375 13.0889 1 15.1111 1Z"
          stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <router-link to="/Discover">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="34" viewBox="0 0 24 24" fill="none" class="equis">
          <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </router-link>

    </div>

    <!-- Gradiante que ira encima de la imagen -->
    <div class="gradient"></div>

    <!-- Imagen del libro -->
    <img :src="bookData.Caratula" class="img-fluid imagenbook" alt="img-libro">

    <div class="container">

      <!-- Botones para leer y compartir -->
      <div class="my-4 row justify-content-center">

        <button class="me-4 me-sm-5 btn read" @click="popbook">
          READ
        </button>

        <button class="btn share">
          SHARE
        </button>

      </div>

      <div class="row">

        <!-- Info del libro -->
        <div class="col-lg-6">

          <h5 class="py-3 ps-2 ps-md-0 text-uppercase about">About The book</h5>

          <p class="px-2 px-md-0 pe-lg-4 text-break about-text">{{ bookData.About }}</p>

        </div>
        <div class="col-lg-6">

          <h5 class="py-3 ps-2 ps-md-0 text-uppercase about">About the autor</h5>

          <p class="px-2 px-md-0 text-break about-text">{{ AutorData.About }}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.acomodo {
  position: absolute;
  z-index: 2;
}

.icons {
  position: absolute;
  z-index: 2;
  top: 76px;
  right: 15px;
}

.equis {
  cursor: pointer;
}

.img-auto {
  object-fit: cover;
  width: 48px;
  height: 48px;
  border-radius: 28px;
}

.titulo {
  color: #FFF;
  font-family: 'Comfortaa', cursive;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.autor {
  color: rgba(255, 255, 255, 0.80);
  font-family: 'Comfortaa', cursive;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.gradient {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 500px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.829) 0%, rgba(196, 196, 196, 0.00) 100%);
}

.imagenbook {
  object-fit: cover;
  width: 100%;
  height: 500px;
}

.read {
  width: 163px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #7A60A9;
  border: 3px solid #7A60A9;

  /*Atributos del Texto*/
  color: #FFF;
  text-align: center;
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.52px;
  text-transform: uppercase;
}

.read:focus {
  border-color: rgb(122, 96, 169);
  box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
  outline: 0 none;
}

.share {
  border: 3px solid #7A60A9;
  color: #7A60A9;
  background-color: #D6C8E1;
  width: 162px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 6px;

  /*Atributos del Texto*/
  font-family: 'Comfortaa', cursive;
  font-weight: 900;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.52px;
  text-transform: uppercase;
}

.share:focus {
  border-color: rgb(122, 96, 169);
  box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
  outline: 0 none;
}

.about {
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.8px;
}

.about-text {
  color: #000;
  text-align: justify;
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

@media screen and (max-width: 576px) {
  .img-auto {
    object-fit: cover;
    width: 36px;
    height: 36px;
    border-radius: 28px;
  }

  .titulo {
    font-size: 11px;
  }

  .autor {
    font-size: 9px;
  }

  .equis {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

}
</style>
