// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 這裡換成你自己的 Firebase 設定
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

// 初始化服務
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
