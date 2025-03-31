// 引入 getJwtToken 函式，用來取得 JWT Token
import { getJwtToken } from "./auth";

// 上傳檔案功能
export async function uploadFile(file) {
  const formData = new FormData();  // 建立 FormData 物件，用來處理檔案上傳
  formData.append("files", file);   // 將檔案加入 FormData 中，鍵名為 "files"

  const response = await fetch("/api/upload", {  // 發送 POST 請求到 API 進行檔案上傳
    method: "POST",  // 請求方法為 POST
    body: formData,  // 傳送的資料為 FormData 物件，包含檔案
    headers: {
      authorization: `Bearer ${getJwtToken()}`,  // 加入 Bearer Token 驗證頭部，使用 JWT Token
    },
  });

  const result = await response.json();  // 解析回傳的 JSON 資料
  return result[0].url;  // 回傳上傳後檔案的 URL
}
