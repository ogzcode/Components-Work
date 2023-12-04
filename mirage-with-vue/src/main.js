import './assets/main.css'
import "primeflex/primeflex.css"
import "primevue/resources/themes/lara-dark-blue/theme.css"
import 'primeicons/primeicons.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

import { makeServer } from './server'
import Ripple from 'primevue/ripple';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' })
}

const app = createApp(App)

app.directive('ripple', Ripple);

app.use(PrimeVue, { ripple: true })
app.use(createPinia())
app.use(router)
app.mount('#app')
