// @ts-ignore
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import './assets/main.css'
import App from './App.vue'
import router from './router';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createI18n } from 'vue-i18n';
import en from './i18n/en.json';

const i18n = createI18n({
  locale: 'en', // Set locale to English
  messages: { en } // Add English messages
});


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
