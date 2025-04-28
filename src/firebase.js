// src/apis/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyBG3-FSNeiXYuCJlpal0hjN0oy5F27i1AY",
  authDomain: "side-project-aa33a.firebaseapp.com",
  projectId: "side-project-aa33a",
  storageBucket: "side-project-aa33a.firebasestorage.app",
  messagingSenderId: "818644670887",
  appId: "1:818644670887:web:809ee8807a1938e3cebe82",
  measurementId: "G-7MT3TGMZWV"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// Firebase 認證
const auth = getAuth(app);

// Firestore 數據庫
const db = getFirestore(app);

export { auth, db };
