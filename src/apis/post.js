// // 引入 getJwtToken 和 getUser 函式，分別用來取得 JWT Token 和當前使用者資料
// import { getJwtToken, getUser } from "./auth";
// // 引入自定義的 request 函式，用來發送 API 請求
// import { request } from "../utils/request";

// // 建立新文章功能
// export async function createPost(image, description) {
//   const formData = new FormData(); // 建立 FormData 物件來處理檔案上傳
//   formData.append("files.image", image); // 將圖片檔案加入 FormData 中，鍵名為 "files.image"
//   formData.append("data", JSON.stringify({ description })); // 將文章描述加入 FormData 中

//   await fetch("/api/posts", {
//     // 發送 POST 請求建立文章
//     method: "POST", // 請求方法為 POST
//     body: formData, // 傳送的資料為 FormData 物件，包含圖片和描述
//     headers: {
//       Authorization: `Bearer ${getJwtToken()}`, // 加入 Bearer Token 驗證標頭，使用 JWT Token
//     },
//   });
// }

// /**
//  * 讀取文章列表
//  * @param {string} filters 过滤條件，篩選指定條件的文章，預設為空字串（表示不篩選）
//  * @returns 文章資料陣列
//  */
// export async function loadPosts(filters = "") {
//   const response = await request(
//     "/api/posts?populate=*" + (filters && `&${filters}`) // 根據篩選條件請求文章資料
//   );

//   // 解析並回傳文章資料，整理圖片和使用者資訊
//   return response.data.map((post) => ({
//     id: post?.id, // 文章 ID
//     ...post?.attributes, // 文章的其他屬性
//     image: post?.attributes?.image?.data?.[0]?.attributes?.url, // 文章的圖片 URL
//     user: {
//       id: post?.attributes?.user?.data?.id, // 使用者 ID
//       ...post?.attributes?.user?.data?.attributes, // 使用者的其他屬性
//     },
//   }));
// }

// // 讀取當前使用者發布的文章
// export async function loadPostsByMe() {
//   return loadPosts(`filters[user][id][$eq]=${getUser().id}`); // 篩選出當前使用者的文章
// }

// /**
//  * 讀取當前使用者喜歡或收藏的文章
//  * @param {"likes" | "favors"} type 讀取的篩選類型，"likes" 為喜歡的文章，"favors" 為收藏的文章
//  * @returns 文章資料陣列
//  */
// export async function loadPostsLikedOrFavoredByMe(type = "likes") {
//   const response = await request(
//     `/api/users/me?populate[${type}][populate][0]=image` // 請求當前使用者的喜歡或收藏文章
//   );

//   // 解析並回傳喜歡或收藏的文章，整理圖片 URL
//   return response[type].map((post) => ({
//     ...post,
//     image: post?.image?.[0].url, // 文章圖片的 URL
//   }));
// }

// // 按讚文章
// export async function likePost(id) {
//   const response = await request(`/api/posts/${id}/like`, {
//     // 發送 PUT 請求按讚
//     method: "PUT", // 請求方法為 PUT
//   });
//   return response.data; // 回傳按讚後的文章資料
// }

// // 收藏文章
// export async function favorPost(id) {
//   const response = await request(`/api/posts/${id}/favor`, {
//     // 發送 PUT 請求收藏文章
//     method: "PUT", // 請求方法為 PUT
//   });
//   return response.data; // 回傳收藏後的文章資料
// }


import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 获取 Firestore 和 Storage 实例
const db = getFirestore(app);
const storage = getStorage(app);

// 创建文章
export async function createPost(image, description) {
  try {
    // 将图片上传到 Firebase Storage
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);  // 获取图片的下载 URL

    // 获取当前用户
    const auth = getAuth();
    const user = auth.currentUser;
    
    // 创建文章数据
    const postRef = collection(db, "posts");
    await addDoc(postRef, {
      description,
      image: imageUrl,
      userId: user.uid, // 将当前用户的 UID 存储在文章数据中
      createdAt: new Date(),
    });

    console.log("Post created successfully");
  } catch (error) {
    console.error("Error creating post: ", error);
  }
}



export async function loadPosts(filters = "") {
  try {
    // 获取所有文章
    const postsRef = collection(db, "posts");
    const q = query(postsRef); // 如果有过滤条件，可以在这里添加

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => {
      const post = doc.data();
      return {
        id: doc.id,
        description: post.description,
        image: post.image, // Firestore 中存储的图片 URL
        userId: post.userId,
        createdAt: post.createdAt,
      };
    });

    return posts;
  } catch (error) {
    console.error("Error loading posts: ", error);
  }
}



export async function loadPostsByMe() {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("userId", "==", user.uid)); // 按用户 ID 过滤

      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => doc.data());

      return posts;
    } else {
      console.error("No user logged in.");
    }
  } catch (error) {
    console.error("Error loading user posts: ", error);
  }
}



export async function likePost(postId) {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: increment(1), // 增加点赞数
    });

    console.log("Post liked successfully");
  } catch (error) {
    console.error("Error liking post: ", error);
  }
}

export async function favorPost(postId) {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      favors: increment(1), // 增加收藏数
    });

    console.log("Post favorited successfully");
  } catch (error) {
    console.error("Error favoring post: ", error);
  }
}
