import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css';
import Dialog from 'primevue/dialog';
import Editor from 'primevue/editor';
import Tooltip from 'primevue/tooltip';

import router from '@/router';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faUserSecret,
  faHouse,
  faUser,
  faThumbsUp,
  faImage,
  faQuestion,
  faPowerOff,
  faGear,
  faHammer,
} from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
const app = createApp(App);
library.add(
  faUserSecret,
  faHouse,
  faUser,
  faThumbsUp,
  faMessage,
  faImage,
  faQuestion,
  faPowerOff,
  faGear,
  faHammer
);
app.directive('tooltip', Tooltip);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('Dialog', Dialog);
app.component('Editor', Editor);
app.use(PrimeVue);
app.use(router).mount('#app');
