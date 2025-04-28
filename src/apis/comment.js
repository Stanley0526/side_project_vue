// // 引入自定義的 request 函式，用來發送 API 請求
// import { request } from "../utils/request";

// // 建立留言功能
// export async function createComment(content, postId) {
//   await request("/api/comments", {  // 發送 POST 請求建立留言
//     method: "POST",  // 請求方法為 POST
//     body: {
//       data: {
//         content,  // 留言內容
//         post: postId,  // 相關文章的 ID
//       },
//     },
//   });
// }

// // 讀取留言功能
// export async function loadComments(postId) {
//   if (!postId) return [];  // 如果沒有提供文章 ID，回傳空陣列
//   const response = await request(
//     "/api/comments?populate=*&filters[post][id][$eq]=" + postId  // 發送請求讀取特定文章的留言
//   );

//   // 解析留言資料並回傳
//   return response.data.map((comment) => {
//     const result = comment?.attributes;  // 取得留言的屬性資料
//     return {
//       id: comment?.id,  // 留言 ID
//       content: result?.content,  // 留言內容
//       pubDate: result?.publishedAt,  // 留言發佈日期
//       user: {
//         id: result?.user?.data?.id,  // 使用者 ID
//         ...result?.user?.data?.attributes,  // 使用者的其他資料
//       },
//     };
//   });
// }


const db = getFirestore(app);

// 创建留言
export async function createComment(content, postId) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // 创建评论数据
      const commentsRef = collection(db, "comments");
      await addDoc(commentsRef, {
        content,  // 留言内容
        postId,   // 相关文章 ID
        userId: user.uid,  // 当前用户 ID
        createdAt: new Date(),  // 留言时间
      });

      console.log("Comment created successfully");
    } else {
      console.error("No user logged in.");
    }
  } catch (error) {
    console.error("Error creating comment: ", error);
  }
}


// 读取留言
export async function loadComments(postId) {
  try {
    if (!postId) return [];  // 如果没有提供文章 ID，返回空数组

    // 查询与指定文章 ID 相关的所有留言
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("postId", "==", postId));

    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map(doc => {
      const comment = doc.data();
      return {
        id: doc.id,  // 留言 ID
        content: comment.content,  // 留言内容
        pubDate: comment.createdAt.toDate(),  // 留言发布日期
        user: {
          id: comment.userId,  // 用户 ID
          // 假设你有额外的用户信息（如头像、名字等）可以加入
        },
      };
    });

    return comments;
  } catch (error) {
    console.error("Error loading comments: ", error);
  }
}
