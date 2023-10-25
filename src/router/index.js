import HelloWorld from "../components/HelloWorld.vue";
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
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
      }
    ]
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
