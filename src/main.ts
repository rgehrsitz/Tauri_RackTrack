import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import router from './router';
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const pinia = createPinia()

const vuetify = createVuetify({
    components,
    directives,
    
})

createApp(App).use(pinia).use(router).use(vuetify).mount('#app');
