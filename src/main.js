import './assets/main.css'
import "flyonui/flyonui";
import axios from "./axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight, faBars, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons'

axios.get("/sanctum/csrf-cookie").then(() => {
}).catch(error => {
    console.error("Failed to initialize CSRF cookie:", error);
});

library.add(faEllipsisVertical, faBars, faXmark, faArrowRight)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(VueSweetalert2)
app.use(router)

app.mount('#app')
