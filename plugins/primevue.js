import { defineNuxtPlugin } from "#app"
import PrimeVue from "primevue/config/config.esm.js"
import InputText from 'primevue/inputtext/InputText.vue'
import Checkbox from 'primevue/checkbox/Checkbox.vue'
import TabMenu from "primevue/tabmenu/TabMenu.vue"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {ripple: true})
  nuxtApp.vueApp.component('InputText', InputText)
  nuxtApp.vueApp.component('Checkbox', Checkbox)
  nuxtApp.vueApp.component('TabMenu', TabMenu)
  //other components that you need
})