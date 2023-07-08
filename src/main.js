import './assets/main.css'

let { createApp } = Vue;
let { createPinia } = Pinia;

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

export default app;
