import { defineNuxtPlugin } from "#app"
import PrimeVue from "primevue/config"
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import TabMenu from "primevue/tabmenu"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {ripple: true})
  nuxtApp.vueApp.component('InputText', InputText)
  nuxtApp.vueApp.component('Checkbox', Checkbox)
  nuxtApp.vueApp.component('TabMenu', TabMenu)
  //other components that you need
})