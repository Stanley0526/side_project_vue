// src/apis/user.js
import { db } from "../firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

export async function getUser(uid) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
}

export async function updateUser(uid, data) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, data);
}

export async function createUserProfile(uid, profileData) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, profileData);
}
