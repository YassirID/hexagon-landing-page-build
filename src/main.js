import "./assets/main.css";
import "flyonui/flyonui";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faArrowRight,
  faBars,
  faEllipsisVertical,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "./plugins/fontawesome";

library.add(faEllipsisVertical, faBars, faXmark, faArrowRight);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(VueSweetalert2);
app.use(router);

app.mount("#app");
