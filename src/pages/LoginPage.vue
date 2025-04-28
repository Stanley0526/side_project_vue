<template>
  <div class="loginPage">
    <img src="../assets/phone.png" alt="" class="phoneImage" />
    <div class="loginForm">
      <img src="../assets/logo.svg" alt="" />
      <form @submit.prevent>
        <input type="email" placeholder="email" v-model="email" />
        <input
          v-if="!isLogin"
          type="text"
          placeholder="用戶名"
          v-model="username"
        />
        <input type="password" placeholder="密碼" v-model="password" />
        <button
          type="submit"
          class="loginButton"
          @click="isLogin ? handleLogin() : handleRegister()"
        >
          {{ isLogin ? "登入" : "註冊" }}
        </button>
        <p @click="isLogin = !isLogin" class="info">
          {{ isLogin ? "還沒有帳號？點選註冊" : "已有帳號？點擊登入" }}
        </p>
        <div v-if="!isLogin" class="agreement">
          <input
            type="checkbox"
            v-model="agreementChecked"
          />勾選表示同意隱私協議和使用規範
        </div>
        <div v-if="error" class="error-message">
          <p>{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, register } from "@/apis/auth";

const isLogin = ref(true);

const email = ref("");
const username = ref("");
const password = ref("");
const agreementChecked = ref(false);

const router = useRouter();

const error = ref(null);

// 註冊處理
const handleRegister = async () => {
  if (!agreementChecked.value) {
    error.value = "請勾選同意隱私協議和使用規範";
    return;
  }
  try {
    // 呼叫註冊函數，傳入 email, username 和 password
    const user = await register(email.value, username.value, password.value);
    console.log("User registered:", user);
    router.replace("/"); // 註冊成功後，跳轉到首頁
  } catch (err) {
    error.value = err.message || "註冊失敗";
    console.error("Registration error:", err.message);
  }
}

// 登入處理
const handleLogin = async () => {
  try {
    const user = await login(email.value, password.value);
    console.log("User logged in:", user);
    router.replace("/"); // 登入成功後，跳轉到首頁
  } catch (err) {
    error.value = err.message || "登入失敗";
    console.error("Login error:", err.message);
  }
}

// return {
//   email,
//   username,
//   password,
//   handleLogin,
//   handleRegister,
//   error,
//   isLogin,
//   agreementChecked,
// }

</script>

<style scoped>
.loginPage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5vw;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  background: #f8f9fb;

  padding: 0 10vw;
}

.phoneImage {
  max-width: 400px;
  position: relative;
  top: 36px;
  justify-self: end;
}

.loginForm {
  justify-self: start;
  box-shadow: 0px 4px 48px rgba(0, 0, 0, 0.06);
  border-radius: 32px;
  background: white;
  padding: 74px 60px;

  display: grid;
  place-items: center;
  row-gap: 52px;
  width: 380px;
}
.loginForm > form {
  display: grid;
  row-gap: 24px;
  width: 100%;
  height: 100%;
}

input {
  background: #fafafa;
  border-radius: 4px;
  border: none;
}

input::placeholder {
  color: #9e9e9e;
}

.loginButton {
  background: linear-gradient(89.93deg, #00c2ff 0.06%, #0047ff 105.68%);
  padding: 12px 0;
  color: white;
  border: none;
}

.info {
  color: #1da0ff;
  text-align: center;
  cursor: pointer;
}

.agreement {
  color: #a1a1a1;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
