import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

// 取得使用者資料
export async function getUser(uid) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
}

// 更新使用者資料
export async function updateUser(uid, data) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, data);
}

// 註冊時，新增使用者資料（可選）
export async function createUserProfile(uid, profileData) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, profileData);
}
