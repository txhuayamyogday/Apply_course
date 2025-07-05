import type { Router } from "vue-router";

export function authGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    console.log(from);
    const accessToken = localStorage.getItem("token"); // ດຶງ token ຈາກ localStorage

    // ກວດສອບວ່າໜ້າໃດບໍ່ຕ້ອງການຢືນຢັນຕົວຕົນ (public pages)
    if (to.meta.skipAuthCheck) {
      // ຖ້າເປັນໜ້າ login ແລະມີ token ແລ້ວ ໃຫ້ redirect ໄປໜ້າ customer
      if (to.name === "login" && accessToken) {
        next({ name: "customer" });
        return;
      }

      next(); // ໃຫ້ໄປຕໍ່ສຳລັບ public pages ອື່ນໆ
      return;
    }

    // ສຳລັບໜ້າທີ່ຕ້ອງການ authentication
    if (!accessToken) {
      next({
        name: "login",
      });
    }

    next();
  });
}
