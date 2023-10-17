<script >
import Text from '../components/Text.vue';
import { defineComponent, ref } from 'vue'
import ePub from 'epubjs';
import { getFirestore, collection, query, where, getDoc, doc, getDocs, setDoc, addDoc, and } from "firebase/firestore";;

import { useDark} from '@vueuse/core'

const isDark = useDark()

const db = getFirestore();

export default defineComponent({
  components:
  {
    Text,
  },
  props:
  {
    link: String,
    user: String,
    id: String,
    lastPage: Array,
    marcadores: Array,

  },

  methods:
  {

    async actualiza() {

      const bookRef = doc(db, "Libro", this.id);
      const q = query(collection(db, "DetalleLibrero"), and(where("Libro", "==", bookRef), where("User", "==", this.user)));
      const querySnapshot = await getDocs(q);

      const bookDoc = await getDoc(bookRef);

      let p;

      p = this.rendition.location.start.cfi

      this.handleMarks(p)

      var page = [p, this.pageNumber]

      querySnapshot.forEach((docS) => {

        setDoc(doc(db, 'DetalleLibrero', docS.id), {

          Favorito: docS.get('Favorito'),

          Libro: docS.get('Libro'),

          Marcadores: this.marcadores,

          Page: page,

          TiempoIndividual: docS.get('TiempoIndividual') + this.time(),

          User: docS.get('User'),

          Visita: docS.get('Visita'),
        })

        setDoc(doc(db, 'Libro', bookDoc.id), {

          About: bookDoc.get("About"),
          Autor: bookDoc.get("Autor"),
          Caratula: bookDoc.get("Caratula"),
          Genero: bookDoc.get("Genero"),

          Likes: bookDoc.get("Likes"),

          Nombre: bookDoc.get("Nombre"),
          Subgenero: bookDoc.get("Subgenero"),
          TiempoGlobal: bookDoc.get("TiempoGlobal") + this.time(),
          Url: bookDoc.get("Url"),

        })

      })

    },
    next() {

      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (this.rendition.location.atEnd != true) {
        this.rendition.next();

        this.pageNumber = this.pageNumber + 1;
        this.actualiza()
      }



    },
    prev() {

      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // 'smooth' proporciona un desplazamiento suave


      if (this.rendition.location.atStart != true) {
        this.rendition.prev();
        this.pageNumber = this.pageNumber - 1;
        this.actualiza()
      }

    },


    marcador() {

      let p = this.rendition.location.start.cfi;

      if (!this.IsMarked(p)) {
        this.marcadores.push(p);
        this.actualiza();
      } else {

        const indiceAEliminar = this.marcadores.indexOf(p);

        this.marcadores.splice(indiceAEliminar, 1); // Elimina 1 elemento en el índice especificado


        this.actualiza();
      }

    },
    handleMarks(p) {

      //console.log(this.book.archive)
      //console.log(this.rendition)
      this.bookmark = this.IsMarked(p);
    },

    IsMarked(pagina) {
      if (this.marcadores.includes(pagina)) {
        return true;

      } else {
        return false;
      }
    },

    handleResize() {
      // Actualizar la propiedad windowWidth con el nuevo ancho de la ventana
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      // Redimensiona la vista del libro
      this.rendition.resize(windowWidth, windowHeight)


    },
    time() {
      const date = Date();

      var horaSalida = new Date();

      // Calcula la diferencia en segundos
      var tiempoEnLaPagina = (horaSalida - this.horaEntrada) / 1000;

      return tiempoEnLaPagina

    },
  },
  data() {
    return {

      w: ref(window.innerWidth),
      h: ref(window.innerHeight),
      pageNumber: ref(0),
      rendition: ref(),
      book: ref(),
      horaEntrada: ref(),
      bookmark: ref(false),
    };
  },

  created() {
    // Agregar un event listener para el evento de redimensionamiento de la ventana
    window.addEventListener('resize', this.handleResize);

    this.horaEntrada = new Date();


  },
  beforeDestroy() {
    // Asegurarse de quitar el event listener cuando el componente se destruye para evitar fugas de memoria
    window.removeEventListener('resize', this.handleResize);

  },
  mounted() {
    this.book = ePub(this.link);
    this.rendition = this.book.renderTo("area", {
      manager: "continuous",
      flow: "paginated", spread: "none", allowScriptedContent: true, width: this.w, height: this.h
    });

    if(isDark.value)
    {
      this.rendition.themes.default({ "body": { "color": "white !important"}});
    }else
    {
      this.rendition.themes.default({ "body": { "color": "black !important"}});

    }

    if (this.lastPage[1] != 0) {
      var displayed = this.rendition.display(this.lastPage[0]);
      this.pageNumber = this.lastPage[1];

      this.handleMarks(this.lastPage[0])

    } else {
      var displayed = this.rendition.display();
      this.pageNumber = 0;
    }
  }
})
</script>

<template>
  <Text />

  <header class="header-read">
    <nav>
      <div class="d-flex m-1 contenedor">

        <div class="cruz">

          <router-link to="/Discover">
            <!-- Icono perteneciente para volver -->
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none" class="equis">
              <g clip-path="url(#clip0_370_335)">
                <path
                  d="M26.1095 13.585C26.0918 13.154 25.9315 12.7265 25.6013 12.3975C25.2724 12.0685 24.8448 11.9071 24.4138 11.8892C23.934 11.869 23.4484 12.0305 23.0826 12.3975L19 16.4813L14.9174 12.3975C14.5505 12.0305 14.066 11.8702 13.5862 11.8892C13.1551 11.907 12.7276 12.0674 12.3987 12.3975C12.0698 12.7265 11.9083 13.154 11.8904 13.585C11.8702 14.0648 12.0317 14.5492 12.3987 14.9162L16.4813 19L12.3987 23.0826C12.0317 23.4495 11.8714 23.9341 11.8904 24.4138C11.9082 24.8448 12.0685 25.2724 12.3987 25.6013C12.7276 25.9302 13.1551 26.0917 13.5862 26.1095C14.066 26.1297 14.5505 25.9683 14.9174 25.6013L19 21.5187L23.0838 25.6025C23.4508 25.9694 23.9353 26.1297 24.415 26.1108C24.846 26.093 25.2735 25.9326 25.6025 25.6025C25.9315 25.2735 26.0929 24.846 26.1108 24.415C26.131 23.9352 25.9695 23.4508 25.6025 23.0838L21.5187 19L25.6013 14.9174C25.9683 14.5505 26.1297 14.066 26.1095 13.585ZM19 0C8.50728 0 0 8.50728 0 19C0 29.4927 8.50728 38 19 38C29.4927 38 38 29.4927 38 19C38 8.50728 29.4927 0 19 0ZM19 34.4375C10.488 34.4375 3.5625 27.512 3.5625 19C3.5625 10.488 10.488 3.5625 19 3.5625C27.512 3.5625 34.4375 10.488 34.4375 19C34.4375 27.512 27.512 34.4375 19 34.4375Z"
                  fill="#7A60A9" />
              </g>
              <defs>
                <clipPath id="clip0_370_335">
                  <rect width="38" height="38" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </router-link>

        </div>



        <!-- Logotipo ReadMeNow! -->
        <div class="botones">

          <svg id="prev" @click="prev()" xmlns="http://www.w3.org/2000/svg" width="70" height="45" viewBox="0 0 67 44"
            fill="none" class="pe-2 flechas">
            <path
              d="M33.5 14.6667L22.3333 22M22.3333 22L33.5 29.3333M22.3333 22H44.6667M21.775 38.5H45.225C49.9154 38.5 52.2607 38.5 54.0522 37.9005C55.628 37.3732 56.9092 36.5318 57.7122 35.4969C58.625 34.3204 58.625 32.7803 58.625 29.7V14.3C58.625 11.2197 58.625 9.67957 57.7122 8.50305C56.9092 7.46816 55.628 6.62677 54.0522 6.09946C52.2607 5.5 49.9154 5.5 45.225 5.5H21.775C17.0846 5.5 14.7393 5.5 12.9478 6.09946C11.372 6.62677 10.0908 7.46816 9.28782 8.50305C8.375 9.67957 8.375 11.2197 8.375 14.3V29.7C8.375 32.7803 8.375 34.3204 9.28782 35.4969C10.0908 36.5318 11.372 37.3732 12.9478 37.9005C14.7393 38.5 17.0846 38.5 21.775 38.5Z"
              stroke="#7A60A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <h5 class="m-0 readme">ReadMeNow!</h5>

          <svg id="next" @click="next()" xmlns="http://www.w3.org/2000/svg" width="70" height="45" viewBox="0 0 67 44"
            fill="none" class="ps-2 flechas">
            <path
              d="M33.5 29.3333L44.6667 22M44.6667 22L33.5 14.6667M44.6667 22H22.3333M21.775 38.5H45.225C49.9154 38.5 52.2607 38.5 54.0522 37.9005C55.628 37.3732 56.9092 36.5318 57.7122 35.4969C58.625 34.3204 58.625 32.7803 58.625 29.7V14.3C58.625 11.2197 58.625 9.67957 57.7122 8.50305C56.9092 7.46816 55.628 6.62677 54.0522 6.09946C52.2607 5.5 49.9154 5.5 45.225 5.5H21.775C17.0846 5.5 14.7393 5.5 12.9478 6.09946C11.372 6.62677 10.0908 7.46816 9.28782 8.50305C8.375 9.67957 8.375 11.2197 8.375 14.3V29.7C8.375 32.7803 8.375 34.3204 9.28782 35.4969C10.0908 36.5318 11.372 37.3732 12.9478 37.9005C14.7393 38.5 17.0846 38.5 21.775 38.5Z"
              stroke="#7A60A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </div>


        <!-- Icono para marcar libro -->

        <!--
        <svg v-if="bookmark" @click="marcador" xmlns="http://www.w3.org/2000/svg" width="40" height="35"
          viewBox="0 0 40 35" fill="#7A60A9" class="marcador">
          <path
            d="M6.66663 11.375C6.66663 8.92477 6.66663 7.69966 7.21159 6.76379C7.69096 5.94058 8.45586 5.27129 9.39667 4.85185C10.4662 4.375 11.8664 4.375 14.6666 4.375H25.3333C28.1336 4.375 29.5337 4.375 30.6032 4.85185C31.5441 5.27129 32.309 5.94058 32.7883 6.76379C33.3333 7.69966 33.3333 8.92477 33.3333 11.375V30.625L28.75 27.7083L24.5833 30.625L20 27.7083L15.4166 30.625L11.25 27.7083L6.66663 30.625V11.375Z"
            stroke="#7A60A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <svg v-else @click="marcador" xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 40 35"
          fill="none" class="marcador">
          <path
            d="M6.66663 11.375C6.66663 8.92477 6.66663 7.69966 7.21159 6.76379C7.69096 5.94058 8.45586 5.27129 9.39667 4.85185C10.4662 4.375 11.8664 4.375 14.6666 4.375H25.3333C28.1336 4.375 29.5337 4.375 30.6032 4.85185C31.5441 5.27129 32.309 5.94058 32.7883 6.76379C33.3333 7.69966 33.3333 8.92477 33.3333 11.375V30.625L28.75 27.7083L24.5833 30.625L20 27.7083L15.4166 30.625L11.25 27.7083L6.66663 30.625V11.375Z"
            stroke="#7A60A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>-->

        <div class="m-0">

          <svg v-if="bookmark" @click="marcador" xmlns="http://www.w3.org/2000/svg" width="50" height="41"
            viewBox="0 0 50 41" fill="none" class="marcador">
            <g opacity="0.4">
              <path
                d="M32.8125 35.875L21.8736 29.4688L10.9375 35.875V11.5313C10.9375 11.1914 11.1021 10.8656 11.3951 10.6253C11.6882 10.385 12.0856 10.25 12.5 10.25H31.25C31.6644 10.25 32.0618 10.385 32.3549 10.6253C32.6479 10.8656 32.8125 11.1914 32.8125 11.5313V35.875Z"
                fill="#7A60A9" />
            </g>
            <path
              d="M31.25 8.96875H12.5C11.6715 8.96953 10.8772 9.23975 10.2913 9.72015C9.70549 10.2005 9.37595 10.8519 9.375 11.5312V35.875C9.37501 36.1104 9.45412 36.3413 9.60364 36.5423C9.75315 36.7432 9.96731 36.9065 10.2226 37.0143C10.4779 37.122 10.7644 37.1699 11.0507 37.1529C11.3371 37.1358 11.6122 37.0544 11.8458 36.9176L21.8737 31.0433L31.9044 36.9176C32.138 37.0544 32.4131 37.1358 32.6994 37.1529C32.9857 37.1699 33.2723 37.122 33.5275 37.0142C33.7828 36.9065 33.9969 36.7432 34.1464 36.5422C34.2959 36.3413 34.375 36.1104 34.375 35.875V11.5312C34.3741 10.8519 34.0445 10.2005 33.4587 9.72015C32.8728 9.23975 32.0785 8.96953 31.25 8.96875ZM31.25 33.3855L22.7817 28.4262C22.5167 28.2709 22.1991 28.1875 21.8735 28.1875C21.5478 28.1875 21.2303 28.2709 20.9653 28.4262L12.5 33.3851V11.5312H31.25V33.3855Z"
              fill="#7A60A9" />
            <path
              d="M37.5 3.84375H17.1875C16.7731 3.84375 16.3757 3.97874 16.0826 4.21902C15.7896 4.4593 15.625 4.78519 15.625 5.125C15.625 5.46481 15.7896 5.7907 16.0826 6.03098C16.3757 6.27126 16.7731 6.40625 17.1875 6.40625H37.5V30.75C37.5 31.0898 37.6646 31.4157 37.9576 31.656C38.2507 31.8963 38.6481 32.0312 39.0625 32.0312C39.4769 32.0312 39.8743 31.8963 40.1674 31.656C40.4604 31.4157 40.625 31.0898 40.625 30.75V6.40625C40.6241 5.72687 40.2945 5.07554 39.7087 4.59515C39.1228 4.11475 38.3285 3.84453 37.5 3.84375Z"
              fill="#7A60A9" />
          </svg>

          <svg v-else @click="marcador" xmlns="http://www.w3.org/2000/svg" width="50" height="41" viewBox="0 0 50 41"
            fill="none" class="marcador">
            <g opacity="0.0">
              <path
                d="M32.8125 35.875L21.8736 29.4688L10.9375 35.875V11.5313C10.9375 11.1914 11.1021 10.8656 11.3951 10.6253C11.6882 10.385 12.0856 10.25 12.5 10.25H31.25C31.6644 10.25 32.0618 10.385 32.3549 10.6253C32.6479 10.8656 32.8125 11.1914 32.8125 11.5313V35.875Z"
                fill="#7A60A9" />
            </g>
            <path
              d="M31.25 8.96875H12.5C11.6715 8.96953 10.8772 9.23975 10.2913 9.72015C9.70549 10.2005 9.37595 10.8519 9.375 11.5312V35.875C9.37501 36.1104 9.45412 36.3413 9.60364 36.5423C9.75315 36.7432 9.96731 36.9065 10.2226 37.0143C10.4779 37.122 10.7644 37.1699 11.0507 37.1529C11.3371 37.1358 11.6122 37.0544 11.8458 36.9176L21.8737 31.0433L31.9044 36.9176C32.138 37.0544 32.4131 37.1358 32.6994 37.1529C32.9857 37.1699 33.2723 37.122 33.5275 37.0142C33.7828 36.9065 33.9969 36.7432 34.1464 36.5422C34.2959 36.3413 34.375 36.1104 34.375 35.875V11.5312C34.3741 10.8519 34.0445 10.2005 33.4587 9.72015C32.8728 9.23975 32.0785 8.96953 31.25 8.96875ZM31.25 33.3855L22.7817 28.4262C22.5167 28.2709 22.1991 28.1875 21.8735 28.1875C21.5478 28.1875 21.2303 28.2709 20.9653 28.4262L12.5 33.3851V11.5312H31.25V33.3855Z"
              fill="#7A60A9" />
            <path
              d="M37.5 3.84375H17.1875C16.7731 3.84375 16.3757 3.97874 16.0826 4.21902C15.7896 4.4593 15.625 4.78519 15.625 5.125C15.625 5.46481 15.7896 5.7907 16.0826 6.03098C16.3757 6.27126 16.7731 6.40625 17.1875 6.40625H37.5V30.75C37.5 31.0898 37.6646 31.4157 37.9576 31.656C38.2507 31.8963 38.6481 32.0312 39.0625 32.0312C39.4769 32.0312 39.8743 31.8963 40.1674 31.656C40.4604 31.4157 40.625 31.0898 40.625 30.75V6.40625C40.6241 5.72687 40.2945 5.07554 39.7087 4.59515C39.1228 4.11475 38.3285 3.84453 37.5 3.84375Z"
              fill="#7A60A9" />
          </svg>

          <span class="version-reader">
            Pag. {{ pageNumber }}
          </span>

        </div>





      </div>
    </nav>

  </header>


  <!-- Lector Epub -->
  <div class="lector">

    <div id="area"></div>

  </div>
</template>

<style scoped>
.dark .header-read
{
  background: #2C2C20;
}

.dark #area
{
  color: white;
}
button {
  display: inline;
  padding: 0.5rem 1rem;
  margin: 0 auto;
  text-decoration: none;
  border: none;
  background-color: white;
}

.cruz {
  display: flex;
  align-items: center;
}

.botones {
  user-select: none;
  margin-left: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.version-reader {
  user-select: none;
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.375px;
}

.flechas {
  cursor: pointer;

}

.marcador {
  cursor: pointer;
}

.lector {
  margin-top: 65px;
  width: 100%;
}

.header-read {
  background-color: #F7F7F7;
  height: 58px;
  padding: 5px 10%;
  z-index: 99;
  position: fixed;
  width: 100%;
  top: 0;

}

.contenedor {
  justify-content: space-between;
  align-items: center;
}

.readme {
  user-select: none;
  display: inline-block;
  align-items: center;
  color: #7A60A9;
  font-family: 'Comfortaa', cursive;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.375px;
  align-content: center;
  text-align: center;
}

@media screen and (max-width: 760px) {
  .equis {
    width: 30px;
    height: 30px;
  }

  .flechas {
    width: 60px;
    height: 35px;
  }

  .botones {
    margin-left: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .botones .readme {
    font-size: 20px;
  }

  .marcador {
    width: 40px;
    height: 30px;
  }

  .version-reader {
    font-size: 15px;
  }

}

@media screen and (max-width: 525px) {
  .equis {
    width: 25px;
    height: 25px;
  }

  .flechas {
    width: 60px;
    height: 35px;
  }

  .botones {
    margin-left: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .botones .readme {
    display: none;
  }

  .marcador {
    width: 40px;
    height: 28px;
  }

  .version-reader {
    font-size: 15px;
  }

}

@media screen and (max-width: 480px) {

  .equis {
    width: 25px;
    height: 25px;
  }

  .flechas {
    width: 60px;
    height: 35px;
  }

  .botones {
    margin-left: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .botones .readme {
    display: none;
  }

  .marcador {
    width: 40px;
    height: 28px;
  }

  .version-reader {
    font-size: 15px;
  }

}
</style>