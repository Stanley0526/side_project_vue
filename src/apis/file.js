// src/apis/file.js
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadFile(file, path) {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}
