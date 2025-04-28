// src/apis/comment.js
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";

export async function addComment(postId, commentData) {
  const commentsRef = collection(db, "comments");
  await addDoc(commentsRef, {
    ...commentData,
    postId,
    createdAt: new Date(),
  });
}

export async function getComments(postId) {
  const commentsRef = collection(db, "comments");
  const q = query(commentsRef, where("postId", "==", postId), orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
