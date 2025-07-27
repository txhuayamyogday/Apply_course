import { createRouter, createWebHistory } from "vue-router";
import CustomerPage from "./modules/customer/Customer.vue";
import LoginPage from "./modules/auth/Login.vue";
import { authGuard } from "./common/guards/auth.guard";
import RegisterPage from "./modules/customer/Register.vue";
import CourseCategory from "./modules/course-category/interface/CourseCategory.vue";
import CoursePage from "./modules/course/Course.vue";

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
      {
        path: "/course-categories",
        name: "course.categories",
        component: CourseCategory,
      },
      {
        path: "/course",
        name: "course",
        component: CoursePage,
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
