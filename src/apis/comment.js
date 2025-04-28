// 引入自定義的 request 函式，用來發送 API 請求
import { request } from "../utils/request";

// 建立留言功能
export async function createComment(content, postId) {
  await request("/api/comments", {  // 發送 POST 請求建立留言
    method: "POST",  // 請求方法為 POST
    body: {
      data: {
        content,  // 留言內容
        post: postId,  // 相關文章的 ID
      },
    },
  });
}

// 讀取留言功能
export async function loadComments(postId) {
  if (!postId) return [];  // 如果沒有提供文章 ID，回傳空陣列
  const response = await request(
    "/api/comments?populate=*&filters[post][id][$eq]=" + postId  // 發送請求讀取特定文章的留言
  );

  // 解析留言資料並回傳
  return response.data.map((comment) => {
    const result = comment?.attributes;  // 取得留言的屬性資料
    return {
      id: comment?.id,  // 留言 ID
      content: result?.content,  // 留言內容
      pubDate: result?.publishedAt,  // 留言發佈日期
      user: {
        id: result?.user?.data?.id,  // 使用者 ID
        ...result?.user?.data?.attributes,  // 使用者的其他資料
      },
    };
  });
}
