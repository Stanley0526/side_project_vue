// src/apis/auth.js
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUserProfile } from "./user";

export async function register(email, username, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: username });

  // 也在 Firestore 建立一份 user profile
  await createUserProfile(user.uid, {
    email: user.email,
    username,
    avatar: "",
    intro: "",
    website: "",
    createdAt: new Date(),
  });

  return user;
}

export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}
