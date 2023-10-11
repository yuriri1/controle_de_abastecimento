import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/router.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const app = createApp(App);

app.component("pulse-loader", PulseLoader);

app.use(Toast, {
  transition: "Vue-Toastification__fade",
  timeout: 2500,
  newestOnTop: true,
});
app.use(router);
app.mount("#app");
