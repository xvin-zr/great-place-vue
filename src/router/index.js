// import HelloWorld from "../components/HelloWorld.vue";
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  { path: "/", name: "Login", component: () => import("../views/Login.vue") },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/find-place",
    component: () => import("../components/MainApp.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/Find.vue"),
      },
      {
        path: "welcome",
        component: () => import("../views/Welcome.vue"),
      },
      {
        path: "profile",
        component: () => import("../views/Profile.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("../views/Admin.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/Statistics.vue"),
      },
      {
        path: "statistics",
        component: () => import("../views/Statistics.vue"),
      },
      {
        path: "userinfo",
        component: () => import("../views/UserInfo.vue"),
      }
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
