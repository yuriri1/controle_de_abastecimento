import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Modelo from "../views/Modelo.vue";
import Veiculo from "../views/Veiculo.vue";
import Abastecimento from "../views/Abastecimento.vue";
import Consulta from "../views/Consulta.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/modelo",
    name: "Modelo",
    component: Modelo,
  },
  {
    path: "/veiculo",
    name: "Veiculo",
    component: Veiculo,
  },
  {
    path: "/abastecimento",
    name: "Abastecimento",
    component: Abastecimento,
  },
  {
    path: "/consulta",
    name: "Consulta",
    component: Consulta,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
