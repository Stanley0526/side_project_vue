import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { app } from "../firebase"; // 假设 firebase 配置在此文件

// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyBG3-FSNeiXYuCJlpal0hjN0oy5F27i1AY",
  authDomain: "side-project-aa33a.firebaseapp.com",
  projectId: "side-project-aa33a",
  storageBucket: "side-project-aa33a.firebasestorage.app",
  messagingSenderId: "818644670887",
  appId: "1:818644670887:web:809ee8807a1938e3cebe82",
  measurementId: "G-7MT3TGMZWV",
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// Firebase 認證
const auth = getAuth(app);

const storage = getStorage(app);

// Firestore 數據庫
const db = getFirestore(app);

export { auth, db, storage };
