import { createRouter, createWebHistory } from "vue-router";
import CustomerPage from "./modules/customer/Customer.vue";
import LoginPage from "./modules/auth/Login.vue";
import { authGuard } from "./common/guards/auth.guard";
import RegisterPage from "./modules/customer/Register.vue";

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("./components/layouts/Layout.vue"),
    children: [
      {
        path: "/customer",
        name: "customer",
        component: CustomerPage,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      skipAuthCheck: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: {
      skipAuthCheck: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

authGuard(router);

export default router;
