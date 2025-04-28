// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // 這個是重點，載入 Auth！

const firebaseConfig = {
  apiKey: "AIzaSyBG3-FSNeiXYuCJlpal0hjN0oy5F27i1AY",
  authDomain: "side-project-aa33a.firebaseapp.com",
  projectId: "side-project-aa33a",
  storageBucket: "side-project-aa33a.appspot.com",
  messagingSenderId: "818644670887",
  appId: "1:818644670887:web:809ee8807a1938e3cebe82",
  measurementId: "G-7MT3TGMZWV"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 初始化 Firebase Auth（用來做登入、註冊）
export const auth = getAuth(app);

export default app;
