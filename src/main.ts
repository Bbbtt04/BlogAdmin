import { createApp } from 'vue'
import './assets/scss/index.scss'
import { setupMarkDown } from '../src/config/markdown'
import { setupRouter } from './router'
import { setupStore } from './store'

import App from './App.vue'

// eslint-disable-next-line import/order
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'uno.css'

const app = createApp(App)

setupRouter(app)
setupStore(app)
setupMarkDown(app)

for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.mount('#app')
