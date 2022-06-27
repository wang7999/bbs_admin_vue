import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.scss'

import './permission'

createApp(App).use(router).use(store).mount('#app')
