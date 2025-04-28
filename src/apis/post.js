// 引入 getJwtToken 和 getUser 函式，分別用來取得 JWT Token 和當前使用者資料
import { getJwtToken, getUser } from "./auth";
// 引入自定義的 request 函式，用來發送 API 請求
import { request } from "../utils/request";

// 建立新文章功能
export async function createPost(image, description) {
  const formData = new FormData(); // 建立 FormData 物件來處理檔案上傳
  formData.append("files.image", image); // 將圖片檔案加入 FormData 中，鍵名為 "files.image"
  formData.append("data", JSON.stringify({ description })); // 將文章描述加入 FormData 中

  await fetch("/api/posts", {
    // 發送 POST 請求建立文章
    method: "POST", // 請求方法為 POST
    body: formData, // 傳送的資料為 FormData 物件，包含圖片和描述
    headers: {
      Authorization: `Bearer ${getJwtToken()}`, // 加入 Bearer Token 驗證標頭，使用 JWT Token
    },
  });
}

/**
 * 讀取文章列表
 * @param {string} filters 过滤條件，篩選指定條件的文章，預設為空字串（表示不篩選）
 * @returns 文章資料陣列
 */
export async function loadPosts(filters = "") {
  const response = await request(
    "/api/posts?populate=*" + (filters && `&${filters}`) // 根據篩選條件請求文章資料
  );

  // 解析並回傳文章資料，整理圖片和使用者資訊
  return response.data.map((post) => ({
    id: post?.id, // 文章 ID
    ...post?.attributes, // 文章的其他屬性
    image: post?.attributes?.image?.data?.[0]?.attributes?.url, // 文章的圖片 URL
    user: {
      id: post?.attributes?.user?.data?.id, // 使用者 ID
      ...post?.attributes?.user?.data?.attributes, // 使用者的其他屬性
    },
  }));
}

// 讀取當前使用者發布的文章
export async function loadPostsByMe() {
  return loadPosts(`filters[user][id][$eq]=${getUser().id}`); // 篩選出當前使用者的文章
}

/**
 * 讀取當前使用者喜歡或收藏的文章
 * @param {"likes" | "favors"} type 讀取的篩選類型，"likes" 為喜歡的文章，"favors" 為收藏的文章
 * @returns 文章資料陣列
 */
export async function loadPostsLikedOrFavoredByMe(type = "likes") {
  const response = await request(
    `/api/users/me?populate[${type}][populate][0]=image` // 請求當前使用者的喜歡或收藏文章
  );

  // 解析並回傳喜歡或收藏的文章，整理圖片 URL
  return response[type].map((post) => ({
    ...post,
    image: post?.image?.[0].url, // 文章圖片的 URL
  }));
}

// 按讚文章
export async function likePost(id) {
  const response = await request(`/api/posts/${id}/like`, {
    // 發送 PUT 請求按讚
    method: "PUT", // 請求方法為 PUT
  });
  return response.data; // 回傳按讚後的文章資料
}

// 收藏文章
export async function favorPost(id) {
  const response = await request(`/api/posts/${id}/favor`, {
    // 發送 PUT 請求收藏文章
    method: "PUT", // 請求方法為 PUT
  });
  return response.data; // 回傳收藏後的文章資料
}
