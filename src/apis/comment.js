import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where, serverTimestamp, orderBy } from "firebase/firestore";
import { auth } from "../firebase";

// 發表留言
export async function createComment(postId, text) {
  const user = auth.currentUser;
  if (!user) throw new Error("尚未登入");

  const commentsRef = collection(db, "comments");
  await addDoc(commentsRef, {
    postId,
    text,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });
}

// 撈一篇貼文底下的留言
export async function loadComments(postId) {
  const commentsRef = collection(db, "comments");
  const q = query(commentsRef, where("postId", "==", postId), orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
