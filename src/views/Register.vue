<script setup>
import Text from '../components/Text.vue';
import Flecha from '../components/icons/Flecha.vue';
import IconGoo from '../components/icons/IconGoo.vue';


import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore, collection, addDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter()

const db = getFirestore();



const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {

            CreateUser(data.user.uid);

            router.push('/Discover')
        })
        .catch((error) => {
            //console.log(error.code);
            alert(error.message);
        })

};
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            CreateUser(result.user.uid);
            router.push("/Discover")

        })
        .catch((error) => {
            //console.log(error.code);
            alert(error.message);
        })

};
const CreateUser = (User) => {

    const q = query(collection(db, "Librero"), where("User", "==", User));

    getDocs(q).then((querySnapshot) => {

        if (querySnapshot.empty) {
            
            addDoc(collection(db, 'Librero'), {
                Libros: [],
                User: User,
            });


        }
    });

}



</script>

<template>
    <Text />

    <div class="d-flex d-flex justify-content-center vh-100">
        <div class="d-flex d-flex justify-content-center align-items-center">
            <div>

                <router-link to="/">
                    <Flecha />
                </router-link>

                <div class="mb-3 mt-3">
                    <h1 class="text">Register</h1>
                </div>

                <div class="mb-3">
                    <input type="email" class="form-control general" required placeholder="email" v-model="email">
                </div>

                <div class="mb-3">
                    <input type="password" class="form-control general" required placeholder="password" v-model="password">
                </div>


                <button type="submit" class="btn boton1" @click="register">
                    LOG IN
                </button>

                <button type="submit" class="btn boton2" @click="signInWithGoogle">
                    <IconGoo />
                </button>

            </div>
        </div>
    </div>
</template>

<style scoped>
.text {
    color: #7A60A9;
    font-family: 'Comfortaa', cursive;
    font-size: 36px;
    font-weight: 500;
    letter-spacing: -0.54px;
}

.general {
    width: 343px;
    height: 52px;
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

/** Para evitar el sombreado cuando el input tiene el foco **/
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

.boton1 {
    border: 3px solid #7A60A9;
    color: #7A60A9;
    background-color: #D6C8E1;
    width: 167px;
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

.boton2 {
    width: 167px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 6px;
    background: #7A60A9;
    border: 3px solid #7A60A9;

}

.btn:focus {
    border-color: rgb(122, 96, 169);
    box-shadow: 0 1px 1px rgba(122, 96, 169, 0.075)inset, 0 0 8px rgba(122, 96, 169, 0.6);
    outline: 0 none;
}
</style>