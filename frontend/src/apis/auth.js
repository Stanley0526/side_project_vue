// 引入自定義的 request 函式，用來發送 API 請求
import { request } from "../utils/request";

// 取得 JWT Token
export function getJwtToken() {
  return localStorage.getItem("jwtToken"); // 從 localStorage 取得 "jwtToken"
}

// 儲存 JWT Token
export function setJwtToken(jwt) {
  localStorage.setItem("jwtToken", jwt); // 把 JWT Token 儲存到 localStorage
}

// 儲存使用者資訊
export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user)); // 把使用者資訊轉成 JSON 字串並儲存到 localStorage
}

// 取得使用者資訊
export function getUser() {
  const userData = localStorage.getItem("user"); // 從 localStorage 取得 "user"
  
  if (!userData) return null; // 如果沒有找到使用者資料，回傳 null
  try {
    return JSON.parse(userData); // 將取得的 JSON 字串轉換為物件並回傳
  } catch (error) {
    console.error("Error parsing user data", error); // 解析 JSON 字串時出錯，顯示錯誤訊息
    return null;
  }
}

// 註冊功能
export async function register(email, username, password) {
  try {
    const result = await request("/api/auth/local/register", {
      // 發送註冊請求到 API
      method: "POST", // 請求方法為 POST
      auth: false, // 不需要授權驗證
      body: {
        email, // 使用者的電子郵件
        username, // 使用者的使用者名稱
        password, // 使用者的密碼
        name: username, // 設定名稱為使用者名稱
      },
    });

    setJwtToken(result.jwt); // 設定 JWT Token
    saveUser(result.user); // 儲存使用者資料
    return result.user; // 回傳註冊後的使用者資料
  } catch (error) {
    console.error("Registration error:", error); // 註冊過程發生錯誤，顯示錯誤訊息
    throw error; // 拋出錯誤以供上層處理
  }
}

// 登入功能
export async function login(email, password) {
  try {
    const result = await request("/api/auth/local", {
      // 發送登入請求到 API
      method: "POST", // 請求方法為 POST
      auth: false, // 不需要授權驗證
      body: {
        identifier: email, // 使用者的電子郵件作為識別碼
        password, // 使用者的密碼
      },
    });

    setJwtToken(result.jwt); // 設定 JWT Token
    saveUser(result.user); // 儲存使用者資料
    return result.user; // 回傳登入後的使用者資料
  } catch (error) {
    console.error("Login error:", error); // 登入過程發生錯誤，顯示錯誤訊息
    throw error; // 拋出錯誤以供上層處理
  }
}

// 登出功能
export function logout() {
  localStorage.removeItem("jwtToken"); // 移除 JWT Token
  localStorage.removeItem("user"); // 移除使用者資料
}
