import ToastPlugin from 'vue-toast-notification';

export default defineNuxtPlugin((app) => {
    app.vueApp.use(ToastPlugin)
})