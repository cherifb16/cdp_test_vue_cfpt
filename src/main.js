import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Importez les fichiers ElementUI et CSS
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// Utilisation de l'ElementUI
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
