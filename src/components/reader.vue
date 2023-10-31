<script >
import Text from '../components/Text.vue';
import { defineComponent, ref } from 'vue'
import ePub from 'epubjs';
import { getFirestore, collection, query, where, getDoc, doc, getDocs, setDoc, addDoc, and } from "firebase/firestore";;

import { useDark } from '@vueuse/core'

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

      this.handleTheme()

      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (this.rendition.location.atEnd != true) {
        this.rendition.next();

        this.pageNumber = this.pageNumber + 1;
        this.actualiza()
      }



    },
    prev() {

      this.handleTheme()

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
      //this.rendition.resize(windowWidth)
      this.handleTheme();


    },
    time() {
      const date = Date();

      var horaSalida = new Date();

      // Calcula la diferencia en segundos
      var tiempoEnLaPagina = (horaSalida - this.horaEntrada) / 1000;

      return tiempoEnLaPagina

    },
    changeReader(reader) {

      switch (reader) {
        case true:
          this.rendition.spread("none")
          break;
        case false:
          this.rendition.spread("auto")
          break;
      }
    },
    changeFont(operation) {

      if(operation)
      {
        this.font = this.font - 1;

      }else
      {
        this.font = this.font + 1;
      }

      switch (this.font) {
        case -1:
            this.font = 0;
          break;

        case 0:
          this.rendition.themes.default({ "p": { "font-size": "10px" } });
          break;
        case 1:
          this.rendition.themes.default({ "p": { "font-size": "15px" } });
          break;
        case 2:
          this.rendition.themes.default({ "p": { "font-size": "20px" } });
          break;
        case 3:
          this.rendition.themes.default({ "p": { "font-size": "25px" } });
          break;
        case 4:
          this.rendition.themes.default({ "p": { "font-size": "30px" } });
          break;
        case 5:
            this.font = 4;
          break;
      }
    },
    handleTheme() {
      if (isDark.value) {
        this.rendition.themes.default({ "body": { "color": "white !important" } });
      } else {
        this.rendition.themes.default({ "body": { "color": "black !important" } });

      }
    },
    handleSwipe() {

    },
    addBookmark() {


    },
    reloadPage() {
    window.location.reload();
  }

  },
  data() {
    return {
      w: ref(900),
      h: ref(500),
      pageNumber: ref(0),
      rendition: ref(),
      book: ref(),
      horaEntrada: ref(),
      bookmark: ref(false),
      font: ref(1)
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
      flow: "paginated", spread: "none", allowScriptedContent: true, width: "100%", height: "100%"
    });

    this.rendition.themes.default({ "p": { "font-size": "15px" } });

    this.handleTheme()

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

  <!-- HEADER AND NABVAR-->
  <header class="header-read">
    <nav>
      <div class="d-flex m-1 contenedor">

        <div class="cruz" @click="reloadPage">
            <!-- Icono perteneciente para volver -->
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none"
              class="equis" style="cursor: pointer;">
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
    <div id="area" class="spreads"></div>
    <!--
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-primary" @click="changeReader">Cambiar vista</button>
    <button type="button" class="btn btn-primary" @click="changeFont">Cambiar letra</button>
  </div>-->
  </div>

  <!-- Extra Functions -->
  <footer class="extras">
    <div class="d-flex contenedor">

      <!-- Reader 2 page -->
      <div>

        <button class="botonesLector" @click="changeReader(false)">
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="47" viewBox="0 0 49 54" fill="none"
            class="dosPaginas">
            <g clip-path="url(#clip0_400_445)">
              <path
                d="M47.656 5.80957H1.34396C0.602098 5.80957 0 6.50997 0 7.37296V42.3059C0 43.1529 0.602098 43.8693 1.34396 43.8693H17.8638C18.6057 43.8693 19.2078 44.5697 19.2078 45.4164V50.188C19.2078 51.051 19.7539 51.4255 20.412 51.0346L23.31 49.2596C23.9681 48.8686 25.046 48.8686 25.7041 49.2596L27.5382 50.3833L28.6023 51.0346C29.2044 51.3928 29.7084 51.0997 29.7784 50.3833C29.7925 50.3182 29.7925 50.2531 29.7925 50.188V45.4164C29.7925 44.5694 30.3946 43.8693 31.1364 43.8693H47.6563C48.3985 43.8693 49.0003 43.1529 49.0003 42.3059V7.37296C49 6.50997 48.3982 5.80957 47.656 5.80957ZM4.52206 40.4658C3.79426 40.4658 3.1781 39.7494 3.1781 38.9024V10.7932C3.1781 9.92986 3.79398 9.22979 4.52206 9.22979H20.5802C21.3361 9.22979 21.9241 9.93019 21.9241 10.7932V38.9024C21.9241 39.3421 21.7562 39.7654 21.4902 40.0425C21.2523 40.3032 20.9444 40.4658 20.5802 40.4658H4.52206ZM45.8222 38.9024C45.8222 39.749 45.2201 40.4658 44.4782 40.4658H28.4201C27.6782 40.4658 27.0902 39.7494 27.0902 38.9024V10.7932C27.0902 9.92986 27.6782 9.22979 28.4201 9.22979H44.4782C45.2201 9.22979 45.8222 9.93019 45.8222 10.7932V38.9024Z"
                fill="#7A60A9" />
              <path
                d="M16.7859 28.0233C16.7859 28.4957 16.604 28.919 16.3239 29.1961C16.0859 29.4404 15.7921 29.587 15.4557 29.587H9.66C8.91786 29.587 8.31604 28.8866 8.31604 28.0236C8.31604 27.4047 8.62398 26.8675 9.08603 26.6231C9.25392 26.5253 9.44993 26.4766 9.66 26.4766H15.456C15.7921 26.4766 16.0859 26.6068 16.3241 26.8675C16.604 27.1279 16.7859 27.5512 16.7859 28.0233Z"
                fill="#7A60A9" />
              <path
                d="M16.7859 21.6554C16.7859 22.1278 16.604 22.5511 16.3239 22.8279C16.0859 23.0723 15.778 23.2188 15.4419 23.2188H9.64594C8.91786 23.2188 8.31604 22.5184 8.31604 21.6554C8.31604 20.7921 8.91814 20.1084 9.64594 20.1084H15.4419C15.778 20.1084 16.0859 20.255 16.3239 20.4993C16.604 20.7758 16.7859 21.183 16.7859 21.6554Z"
                fill="#7A60A9" />
              <path
                d="M40.6981 28.0236C40.6981 28.496 40.5161 28.9357 40.222 29.2124C39.984 29.4404 39.6899 29.587 39.3541 29.587H33.5581C33.222 29.587 32.9282 29.4404 32.6902 29.2124C32.3964 28.9353 32.2144 28.496 32.2144 28.0236C32.2144 27.5676 32.3823 27.1606 32.6483 26.8999C32.7603 26.7697 32.8722 26.6719 33.0122 26.6231C33.1801 26.5253 33.3624 26.4766 33.5581 26.4766H39.3541C39.6902 26.4766 39.984 26.6068 40.222 26.8511C40.5161 27.1282 40.6981 27.5515 40.6981 28.0236Z"
                fill="#7A60A9" />
              <path
                d="M40.684 21.6558C40.684 22.1281 40.502 22.5515 40.2219 22.8282C39.984 23.0726 39.6899 23.2191 39.3541 23.2191H33.5581C33.1801 23.2191 32.844 23.0399 32.6061 22.7631C32.3682 22.47 32.2141 22.0791 32.2141 21.6558C32.2141 21.151 32.4101 20.7113 32.7321 20.4342C32.956 20.2226 33.2501 20.1084 33.5581 20.1084H39.3541C39.6901 20.1084 39.984 20.255 40.2219 20.4993C40.502 20.7761 40.684 21.1834 40.684 21.6558Z"
                fill="#7A60A9" />
            </g>
            <defs>
              <clipPath id="clip0_400_445">
                <rect width="49" height="57" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>

      </div>

      <!-- input range -->
      <div class="d-flex contenedor">

        <div @click="changeFont(true)">
          <span class="letraMinuscula">A</span>
        </div>
        <div @click="changeFont(false)">
          <span class="letraMayuscula">A</span>
        </div>

      </div>

      <!-- Reader 1 page -->
      <div>

        <button class="botonesLector"  @click="changeReader(true)">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="33" viewBox="0 0 42 35" fill="none"
            class="unaPagina">
            <path
              d="M34.3742 8.36426C33.3799 8.36426 32.5743 9.03618 32.5743 9.86418V33.5C32.5743 34.3282 33.3799 34.9999 34.3742 34.9999C35.3686 34.9999 36.1742 34.328 36.1742 33.5V9.86418C36.1742 9.03598 35.3686 8.36426 34.3742 8.36426Z"
              fill="#7A60A9" />
            <path
              d="M39.0096 13.04C38.0153 13.04 37.2097 13.712 37.2097 14.54V33.5C37.2097 34.3282 38.0153 34.9999 39.0096 34.9999C40.0039 34.9999 40.8095 34.328 40.8095 33.5V14.54C40.8095 13.712 40.0039 13.04 39.0096 13.04Z"
              fill="#7A60A9" />
            <path
              d="M21.5056 10.1504H10.4907C9.49638 10.1504 8.6908 10.8223 8.6908 11.6503C8.6908 12.4783 9.49638 13.1502 10.4907 13.1502H21.5059C22.5002 13.1502 23.3058 12.4783 23.3058 11.6503C23.3058 10.8223 22.5 10.1504 21.5056 10.1504Z"
              fill="#7A60A9" />
            <path
              d="M21.5056 16H10.4907C9.49638 16 8.6908 16.6719 8.6908 17.4999C8.6908 18.3279 9.49638 18.9998 10.4907 18.9998H21.5059C22.5002 18.9998 23.3058 18.3279 23.3058 17.4999C23.3058 16.6719 22.5 16 21.5056 16Z"
              fill="#7A60A9" />
            <path
              d="M18.0475 21.8496H10.6741C9.67973 21.8496 8.87415 22.5215 8.87415 23.3495C8.87415 24.1775 9.67973 24.8495 10.6741 24.8495H18.0475C19.0418 24.8495 19.8474 24.1775 19.8474 23.3495C19.8474 22.5215 19.0418 21.8496 18.0475 21.8496Z"
              fill="#7A60A9" />
            <path
              d="M27.163 0H5.18496C2.9825 0 1.19055 1.49309 1.19055 3.32807V31.6719C1.19055 33.5069 2.98226 35 5.18496 35H27.163C29.3655 35 31.1574 33.5069 31.1574 31.6719V3.32807C31.1572 1.49309 29.3655 0 27.163 0ZM27.5574 31.6719C27.5574 31.8525 27.3804 32 27.163 32H5.18496C4.96754 32 4.79061 31.8525 4.79061 31.6719V3.32807C4.79061 3.14749 4.96754 3.00005 5.18496 3.00005H27.163C27.3804 3.00005 27.5574 3.14749 27.5574 3.32807V31.6719Z"
              fill="#7A60A9" />
          </svg>
        </button>

      </div>

    </div>

  </footer>
</template>

<style scoped>


/* Header */
.header-read {
  background-color: #F7F7F7;
  height: 58px;
  padding: 5px 10%;
  z-index: 99;
  position: fixed;
  width: 100%;
  top: 0;

}

.dark .header-read {
  background: #2C2C20;
}

.contenedor {
  justify-content: space-between;
  align-items: center;
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

.flechas {
  cursor: pointer;
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

.marcador {
  cursor: pointer;
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

/* lector epub */
.lector {
  margin-top: 65px;
  width: 100%;
}

#area {
  width: 900px;
  height: 500px;
  padding: 10px 10px 0px 10px;
  margin: 5px auto;
}

/* Footer */
.extras {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #F7F7F7;
  height: 58px;
  padding: 5px 10%;
  z-index: 99;
}

.dark .extras {
  background: #2C2C20;
}

.botonesLector {
  background-color: transparent;
  border: transparent;
}

.letraMinuscula {
  font-size: 20px;
  font-weight: 600;
  color: #7A60A9;
  margin-right: 15px;
  cursor: pointer;
}

.letraMayuscula {
  font-size: 30px;
  font-weight: 600;
  color: #7A60A9;
  margin-left: 15px;
  cursor: pointer;
}


/* Responsive mode */
@media screen and (max-width: 760px) {
  #area {
    width: 450px;
    height: 750px;
  }

  #area iframe {
    pointer-events: none;
  }

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

  /* Footer */

  .extras {
    transition: .3s;
  }
  .dosPaginas {
    width: 35px;
    height: 44px;
  }

  .unaPagina {
    width: 37px;
    height: 30px;
  }

}

@media screen and (max-width: 525px) {
  #area {
    width: 450px;
    height: 760px;
  }

  #area iframe {
    pointer-events: none;
  }

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

  /* Footer */

  .extras {
    transition: .3s;
  }
  .dosPaginas {
    width: 32px;
    height: 41px;
  }

  .unaPagina {
    width: 34px;
    height: 26px;
  }

}

@media screen and (max-width: 480px) {
  #area {
    width: 400px;
    height: 820px;
  }

  #area iframe {
    pointer-events: none;
  }


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

  .extras {
    transition: .3s;
  }

  .dosPaginas {
    width: 32px;
    height: 41px;
  }

  .unaPagina {
    width: 34px;
    height: 26px;
  }

}
</style>