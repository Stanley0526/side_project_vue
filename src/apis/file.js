import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 上傳檔案，回傳下載連結
export async function uploadFile(file, folder = "uploads") {
  const fileRef = ref(storage, `${folder}/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}
