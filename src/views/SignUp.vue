<script setup>
import { computed, onMounted, ref ,watchEffect} from "vue";
import   {cities}   from "../data/area-city.js";

onMounted(() => {
  document.title = "好去处｜注册";
});

const username = ref("");
const password = ref("");
const phoneNumber = ref(null);
const province = ref("");
const userType = ref("");
const cityList = computed(() => {
  return cities.find(item => item.name === province.value)?.districts;
});
const registeredCityName = ref("");
const name=ref("")
const idCardType=ref("")
const idCard=ref("")
const userLevel=ref("")
const registeredCityCode=computed(() => {
  return cityList.find( item => item.name === registeredCityName.value)?.adcode;
})
watchEffect(() => {
  console.log(username.value)
})
async function sign(){
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        userType: userType.value,
        name: name.value,
        idCardType: idCardType.value,
        idCard: idCard.value,
        phoneNumber: phoneNumber.value,
        userLevel: userLevel.value,
        userBriefly: "",
        registeredCityCode: registeredCityCode,
        registeredCityName: registeredCityName.value,
      }),
      redirect: "follow",
    });

    if (!res.ok) {
      throw new Error("注册失败");
    }

    const res_data = await res.json();
    console.log(res_data);
    
  } catch (error) {
    console.log(error);
  }
}


</script>

<template>
  <body>
    <main>
      <section class="section-cta">
        <div class="container">
          <div class="cta">
            <div class="cta-text-box">
              <h2 class="heading-secondary">
                探索您心中的<span>「好去处」</span>
              </h2>
              <p class="cta-text">
                欢迎注册，让我们帮助您发现全新的目的地和精彩体验！
              </p>

              <form class="cta-form" action="#">
                <div>
                  <label for="username">用户名*</label>
                  <input
                    v-model="username"
                    id="username"
                    type="text"
                    placeholder="Great Places"
                    required
                  />
                </div>

                <div>
                  <label for="password">密码*</label>
                  <input
                    v-model="password"
                    id="password"
                    type="password"
                    placeholder="Keep it secret"
                    pattern="(?=.*\d.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    title="密码不少于 6 位，必须含有两个数字，不能都为大写或小写"
                    required
                  />
                </div>

                <div>
                  <label for="province">省*</label>
                  <select v-model="province" id="province" required>
                    <option value="" disabled>请选择</option>
                    <option
                      v-for="item in cities"
                      :value="item.name"
                      :key="item.name"
                    >
                      {{ item.name }}
                    </option>
            
                  </select>
                </div>

                <div>
                  <label for="city">市*</label>
                  <select v-model="registeredCityName" id="city" required>
                    <option value="" disabled>请选择</option>
                    <option
                      v-if="cityList"
                      v-for="item in cityList"
                      :value="item.name"
                      :key="item.name"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label for="license-type">证件类型*</label>
                  <select v-model="idCardType" id="license-type" required>
                    <option value="id">身份证</option>
                    <option value="passport">护照</option>
                  </select>
                </div>

                <div>
                  <label for="license-number">证件号*</label>
                  <input v-model="idCard" type="text" id="license-number" required />
                </div>

                <div>
                  <label for="user-type">用户类型*</label>
                  <select v-model="userType" id="user-type" required>
                    <option value="" disabled>请选择</option>
                    <option value="user">普通用户</option>
                    <option value="admin">管理员</option>
                  </select>
                </div>

                <div>
                  <label for="admin-key">管理员秘钥</label>
                  <input
                    type="text"
                    id="admin-key"
                    :disabled="userType !== 'admin'"
                  />
                </div>

                <div>
                  <label for="name">姓名*</label>
                  <input v-model="name" type="text" id="name" placeholder="xxx" required />
                </div>

                <div>
                  <label for="phone">联系电话*</label>
                  <input
                    v-model="phoneNumber"
                    id="phone"
                    type="number"
                    placeholder="+86"
                    required
                  />
                </div>

                <div>
                  <label for="user-level">用户级别</label>
                  <select
                    v-model="userLevel"
                    name=""
                    id="user-level"
                    :disabled="userType !== 'user'"
                    required
                  >
                    <option value="normal">一般用户</option>
                    <option value="vip">VIP 用户</option>
                  </select>
                </div>

                <button @click="sign()" class="btn btn--form">注册</button>

              </form>
            </div>
            <div
              class="cta-img-box"
              role="img"
              aria-label="forbidden city"
            ></div>
          </div>
        </div>
      </section>
    </main>
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

.cta-form input:disabled,
.cta-form select:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cta *:focus {
  outline: none;
  box-shadow: 0 0 0 0.8rem rgba(253, 242, 233, 0.5);
}
</style>
