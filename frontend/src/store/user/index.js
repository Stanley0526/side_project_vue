// 引入處理使用者相關的 API 函式
import { changeUser } from "../../apis/user";
import { getUser, login, logout, register } from "../../apis/auth";

export const user = {
  // 設定 state，儲存當前使用者的資料
  state() {
    return {
      user: getUser() || {},  // 取得當前使用者資料，若無則為空物件
    };
  },
  mutations: {
    // 設定使用者資料
    setUser(state, user) {
      state.user = user;  // 將使用者資料儲存到 state 中
    },
  },
  actions: {
    // 註冊新使用者
    async registerUser({ commit }, { email, username, password }) {
      const user = await register(email, username, password);  // 呼叫註冊 API
      commit("setUser", user);  // 設定註冊成功後的使用者資料
    },
    // 使用者登入
    async loginUser({ commit }, { email, password }) {
      // try {
      const user = await login(email, password);  // 呼叫登入 API
      commit("setUser", user);  // 設定登入成功後的使用者資料
      // } catch (error) {
      //   console.log(error);  // 可以處理登入錯誤的邏輯
      // }
    },
    // 更新使用者資料
    async updateUser({ commit }, user) {
      const updatedUser = await changeUser(user);  // 呼叫 API 更新使用者資料
      commit("setUser", updatedUser);  // 設定更新後的使用者資料
    },
    // 使用者登出
    async logoutUser({ commit }) {
      logout();  // 呼叫登出 API
      commit("setUser", {});  // 清空使用者資料
    },
  },
};
