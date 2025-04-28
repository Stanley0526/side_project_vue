import { db, storage } from "../firebase";
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";

// 發文（上傳圖片＋新增 Firestore 資料）
export async function createPost({ file, caption }) {
  const user = auth.currentUser;
  if (!user) throw new Error("尚未登入");

  // 上傳圖片到 Storage
  const storageRef = ref(storage, `posts/${file.name}`);
  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);

  // 寫入 Firestore
  const postsRef = collection(db, "posts");
  await addDoc(postsRef, {
    image: imageUrl,
    caption,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });
}

// 撈自己的文章
export async function loadPostsByMe() {
  const user = auth.currentUser;
  if (!user) throw new Error("尚未登入");

  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("userId", "==", user.uid), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 撈自己讚過/收藏過的（如果有另外設 like/favorite 資料表）
export async function loadPostsLikedOrFavoredByMe(type = "likes") {
  const user = auth.currentUser;
  if (!user) throw new Error("尚未登入");

  const refCollection = collection(db, type); // likes 或 favors
  const q = query(refCollection, where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
