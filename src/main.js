import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// Import global css
import './assets/global.css'
// Import icons
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)

// Set config defaults when creating the instance
axios.defaults.baseURL = 'http://127.0.0.1:8000/'
// Add axios to the app
app.config.globalProperties.$axios = axios;
// Add axios interceptor
axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// Add icons to the app
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
  })

app.use(router)
app.mount('#app')
