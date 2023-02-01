import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarRegular,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(faBitcoin, faStarSolid, faStarRegular, faTrashCan);

createApp(App)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
