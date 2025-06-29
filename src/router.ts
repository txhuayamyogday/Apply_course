import { createRouter, createWebHistory } from "vue-router";
import CustomerPage from "./modules/customer/Customer.vue";
import LayoutPage from "./components/layouts/Layout.vue";

const routes = [
  {
    path: "/",
    name: "layout",
    component: LayoutPage,
    children: [
      {
        path: "customer",
        name: "customer",
        component: CustomerPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
