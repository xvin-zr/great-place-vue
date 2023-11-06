<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
  document.title = "好去处｜登录";
});

const router = useRouter();
const BASE_URL = import.meta.env.VITE_BASE_URL;

const username = ref("");
const password = ref("");

function toUrl(to) {
  router.push(to);
}

async function onLogin() {
  console.log(username.value, password.value);
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username.value,
        passWord: password.value
      }),
      redirect: "follow",
    });

    if (!res.ok) {
      alert("登录失败");
      throw new Error("登录失败");
    }
    console.log(res);

    const data = await res.json();
    // const text = await res.text();
    // console.log(text);
    console.log("login", data);
    if (data.code === 1) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("username", username.value);
      alert("登录成功");
      toUrl("/find-place");
    } else {
      // alert("登录失败");
    }
  } catch (error) {
    console.log(error);
  }
}


// onPublishPlace();
</script>

<template>
  <body>
    <section class="section-cta">
      <div class="container">
        <div class="cta">
          <div class="cta-text-box">
            <h2 class="heading-secondary">
              探索您心中的<span>「好去处」</span>
            </h2>
            <p class="cta-text">
              欢迎登录或注册，让我们帮助您发现全新的目的地和精彩体验！
            </p>

            <form class="cta-form" action="#">
              <div>
                <label for="username">用户名</label>
                <input
                  v-model="username"
                  id="username"
                  type="text"
                  placeholder="Great Places"
                  required
                />
              </div>

              <div>
                <label for="password">密码</label>
                <input
                  v-model="password"
                  id="password"
                  type="password"
                  placeholder="**********"
                  required
                />
              </div>

              
              <button @click.prevent="toUrl('/signup')" class="btn btn--form">
                注册
              </button>
              

              <button @click.prevent="onLogin" class="btn btn--form">
                登录
              </button>

              <!-- <input type="checkbox" />
                <input type="number" /> -->
            </form>
          </div>
          <div class="cta-img-box" role="img" aria-label="forbidden city"></div>
        </div>
      </div>
    </section>
  </body>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  max-width: 95%;
  margin: 0 auto;
  /* margin-top: 20vh; */
  padding: 0 3.2rem;

  /* border: 1px solid red; */
}

.heading {
  margin-bottom: 2.4rem;
}

.login-header {
  text-align: center;
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.login-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-form {
}

.login-form label {
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 4px;
}

/* --------------------------------------------- */
.section-cta {
  /* top / right / bottom / left */
  /* padding: 9.6rem 0 12.8rem 0; */

  /* top / horizontal / left */
  padding: 4.8rem 0 12.8rem;
}

h2 span {
  font-size: 5.2rem;
}

.cta {
  display: grid;
  grid-template-columns: 2fr 1fr;
  /* background-color: #e67e22; */
  box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.15);
  border-radius: 11px;

  background-image: linear-gradient(to right bottom, #eb984e, #e67e22);
  overflow: hidden;
}

.cta-text-box {
  padding: 4.8rem 6.4rem 6.4rem 6.4rem;
  color: #45260a;
}

.cta .heading-secondary {
  /* color: #45260a; */
  color: inherit;
  margin-bottom: 3.2rem;
}

.cta-text {
  font-size: 1.8rem;
  line-height: 1.8;
  margin-bottom: 4.8rem;
}

.cta-img-box {
  background-image: linear-gradient(
      to right bottom,
      rgba(235, 151, 78, 0.078),
      rgba(230, 125, 34, 0.035)
    ),
    url("../forbidden-city.jpg");
  background-size: cover;
  background-position: center;
}

.cta-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3.2rem;
  row-gap: 2.4rem;
}

.cta-form label {
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
}

.cta-form input,
.cta-form select {
  width: 100%;
  padding: 1.2rem;
  font-size: 1.8rem;
  font-family: inherit;
  color: inherit;
  border: none;
  background-color: #fdf2e9;
  border-radius: 9px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.cta-form input::placeholder {
  color: #aaa;
}

.cta-form a {
  display: block;
  width: 100%;
}

.cta *:focus {
  outline: none;
  box-shadow: 0 0 0 0.8rem rgba(253, 242, 233, 0.5);
}
</style>
