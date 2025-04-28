import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

// 註冊
export async function register({ email, password, username }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: username,
  });

  return user;
}

// 登入
export async function login({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// 登出
export async function logout() {
  await signOut(auth);
}
