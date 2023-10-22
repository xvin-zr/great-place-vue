import HelloWorld from "../components/HelloWorld.vue";
import { createRouter, createWebHistory } from "vue-router";
import hello from "../views/hello.vue";
import Login from "../views/Login.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
