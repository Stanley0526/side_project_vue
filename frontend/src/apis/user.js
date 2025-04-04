// 引入自定義的 request 函式，用來發送 API 請求
import { request } from "../utils/request";
// 引入 getUser 和 saveUser 函式，分別用來取得當前使用者資料和儲存使用者資料
import { getUser, saveUser } from "./auth";

// 更改使用者資料功能
export async function changeUser(user) {
  const response = await request(`/api/users/${getUser().id}`, {  // 發送 PUT 請求更新使用者資料
    method: "PUT",  // 請求方法為 PUT
    body: user,  // 傳送的資料為更新後的使用者資料
  });
  saveUser(response);  // 更新使用者資料並儲存
  return response;  // 回傳更新後的使用者資料
}
